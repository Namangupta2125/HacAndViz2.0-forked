import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Lock, Unlock, LogOut, Download } from "lucide-react";

// Initialize Supabase client
const supabase = createClient(
  "https://bblzcyijscfszivrlyih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibHpjeWlqc2Nmc3ppdnJseWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODExMTEsImV4cCI6MjA1OTE1NzExMX0.RqmAtrdhLPuZ3mgsBECNlOIERBz6AI5A9szSdvRvNoI"
);

export default function JudgeDashboard() {
  const [roundLocks, setRoundLocks] = useState({ 1: true, 2: true, 3: true });
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [judgeInfo, setJudgeInfo] = useState(null);

  useEffect(() => {
    // Check authentication and load judge info
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // Redirect to login if not authenticated
          window.location.href = "/judge-login";
          return;
        }

        // Get judge info from session storage
        const judgeId = sessionStorage.getItem("judgeId");
        const judgeName = sessionStorage.getItem("judgeName");
        const judgeEmail = sessionStorage.getItem("judgeEmail");

        if (!judgeId || !judgeName || !judgeEmail) {
          // If judge info not found, redirect to login
          window.location.href = "/judge-login";
          return;
        }

        setJudgeInfo({
          id: judgeId,
          name: judgeName,
          email: judgeEmail,
        });

        // Fetch round lock status
        fetchRoundLockStatus();
      } catch (error) {
        console.error("Auth check error:", error);
        window.location.href = "/judge-login";
      }
    };

    checkAuth();
  }, []);

  const fetchRoundLockStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("round_locks")
        .select("round_number, is_locked");

      if (error) throw error;

      // Convert array to object for easier access
      const lockStatus = {};
      data.forEach((item) => {
        lockStatus[item.round_number] = item.is_locked;
      });

      setRoundLocks(lockStatus);
    } catch (error) {
      console.error("Error fetching round lock status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoundSelection = (roundNumber) => {
    if (roundLocks[roundNumber]) {
      // Round is locked, show message
      alert(
        `Round ${roundNumber} is currently locked. Please wait until it's unlocked.`
      );
      return;
    }

    // Navigate to scoring page for selected round
    window.location.href = `/judge/score?round=${roundNumber}`;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Clear session storage
      sessionStorage.removeItem("judgeId");
      sessionStorage.removeItem("judgeName");
      sessionStorage.removeItem("judgeEmail");
      // Redirect to login page
      window.location.href = "/judge-login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to convert array of objects to CSV
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    // Get headers from first object
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(","));

    // Add data rows
    for (const row of data) {
      const values = headers.map((header) => {
        const value = row[header];
        // Handle values with commas by wrapping in quotes
        return `"${
          value !== null && value !== undefined
            ? value.toString().replace(/"/g, '""')
            : ""
        }"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  // Function to download CSV
  const downloadCSV = (csvString, fileName) => {
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);

    // Append to document, click to download, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to fetch and download round scores
  const handleDownloadRoundScores = async (roundNumber) => {
    setDownloadLoading(true);
    try {
      let query;
      let fileName;

      // Select appropriate table based on round number
      if (roundNumber === 1) {
        query = supabase.from("round1_scores").select(`
          *,
          judges:judge_id(name),
          teams:team_id(team_name)
        `);
        fileName = "round1_scores.csv";
      } else if (roundNumber === 2) {
        query = supabase.from("round2_scores").select(`
          *,
          judges:judge_id(name),
          teams:team_id(team_name)
        `);
        fileName = "round2_scores.csv";
      } else if (roundNumber === 3) {
        query = supabase.from("round3_scores").select(`
          *,
          judges:judge_id(name),
          teams:team_id(team_name)
        `);
        fileName = "round3_scores.csv";
      } else if (roundNumber === 0) {
        // Total scores (leaderboard)
        query = supabase.from("team_leaderboard").select("*");
        fileName = "total_scores.csv";
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Process data to replace IDs with names
      const processedData = data.map((item) => {
        const newItem = { ...item };

        // For round-specific scores, replace IDs with names
        if (roundNumber !== 0) {
          newItem.judge_name = item.judges?.name || "Unknown Judge";
          newItem.team_name = item.teams?.team_name || "Unknown Team";

          // Remove the nested objects and IDs
          delete newItem.judges;
          delete newItem.teams;
          delete newItem.judge_id;
          delete newItem.team_id;
        }

        return newItem;
      });

      // Convert to CSV and download
      const csvData = convertToCSV(processedData);
      downloadCSV(csvData, fileName);
    } catch (error) {
      console.error(`Error downloading round ${roundNumber} scores:`, error);
      alert(`Error downloading scores: ${error.message}`);
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Judge Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{judgeInfo?.name}</span>
              <p className="text-xs text-gray-500">{judgeInfo?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Round Selection Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">
              Select Round to Judge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Round 1 Button */}
              <button
                onClick={() => handleRoundSelection(1)}
                disabled={roundLocks[1]}
                className={`flex flex-col items-center justify-center p-8 rounded-lg shadow-sm border ${
                  roundLocks[1]
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                }`}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-indigo-100">
                  {roundLocks[1] ? (
                    <Lock size={24} className="text-gray-500" />
                  ) : (
                    <Unlock size={24} className="text-indigo-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">Round 1</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {roundLocks[1] ? "Currently locked" : "Available for scoring"}
                </p>
              </button>

              {/* Round 2 Button */}
              <button
                onClick={() => handleRoundSelection(2)}
                disabled={roundLocks[2]}
                className={`flex flex-col items-center justify-center p-8 rounded-lg shadow-sm border ${
                  roundLocks[2]
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                }`}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-indigo-100">
                  {roundLocks[2] ? (
                    <Lock size={24} className="text-gray-500" />
                  ) : (
                    <Unlock size={24} className="text-indigo-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">Round 2</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {roundLocks[2] ? "Currently locked" : "Available for scoring"}
                </p>
              </button>

              {/* Round 3 Button */}
              <button
                onClick={() => handleRoundSelection(3)}
                disabled={roundLocks[3]}
                className={`flex flex-col items-center justify-center p-8 rounded-lg shadow-sm border ${
                  roundLocks[3]
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                }`}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-indigo-100">
                  {roundLocks[3] ? (
                    <Lock size={24} className="text-gray-500" />
                  ) : (
                    <Unlock size={24} className="text-indigo-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">Round 3</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {roundLocks[3] ? "Currently locked" : "Available for scoring"}
                </p>
              </button>
            </div>
          </div>

          {/* Score Downloads Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              Download Score Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Round 1 Scores Download */}
              <button
                onClick={() => handleDownloadRoundScores(1)}
                disabled={downloadLoading}
                className="flex items-center justify-center p-4 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
              >
                <Download size={20} className="mr-2" />
                <span>Download Round 1 Scores</span>
              </button>

              {/* Round 2 Scores Download */}
              <button
                onClick={() => handleDownloadRoundScores(2)}
                disabled={downloadLoading}
                className="flex items-center justify-center p-4 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
              >
                <Download size={20} className="mr-2" />
                <span>Download Round 2 Scores</span>
              </button>

              {/* Round 3 Scores Download */}
              <button
                onClick={() => handleDownloadRoundScores(3)}
                disabled={downloadLoading}
                className="flex items-center justify-center p-4 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
              >
                <Download size={20} className="mr-2" />
                <span>Download Round 3 Scores</span>
              </button>

              {/* Total Scores Download */}
              <button
                onClick={() => handleDownloadRoundScores(0)}
                disabled={downloadLoading}
                className="flex items-center justify-center p-4 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium"
              >
                <Download size={20} className="mr-2" />
                <span>Download Total Scores</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
          Hack and Viz 2.0 - Judging Portal
        </div>
      </footer>
    </div>
  );
}
