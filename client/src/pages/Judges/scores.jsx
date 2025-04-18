import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ChevronLeft, Save, AlertCircle, Lock, Home } from "lucide-react";

// Initialize Supabase client
const supabase = createClient(
  "https://bblzcyijscfszivrlyih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibHpjeWlqc2Nmc3ppdnJseWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODExMTEsImV4cCI6MjA1OTE1NzExMX0.RqmAtrdhLPuZ3mgsBECNlOIERBz6AI5A9szSdvRvNoI"
);

// Define scoring criteria for each round
const roundCriteria = {
  1: [
    {
      id: "problem_understanding",
      label: "Problem Understanding",
      maxScore: 10,
    },
    { id: "approach", label: "Approach", maxScore: 5 },
    { id: "solution", label: "Solution", maxScore: 5 },
  ],
  2: [
    { id: "technical_approach", label: "Technical Approach", maxScore: 10 },
    {
      id: "creativity_innovation",
      label: "Creativity & Innovation",
      maxScore: 15,
    },
    { id: "optimization", label: "Optimization", maxScore: 10 },
    { id: "theme_relevance", label: "Relevance to Theme", maxScore: 5 },
  ],
  3: [
    { id: "data_dashboard", label: "Data Dashboard", maxScore: 10 },
    {
      id: "presentation_documentation",
      label: "Presentation and Documentation",
      maxScore: 10,
    },
  ],
};

export default function JudgeScoring() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [scores, setScores] = useState({});
  const [roundNumber, setRoundNumber] = useState(1);
  const [judgeInfo, setJudgeInfo] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [isRoundLocked, setIsRoundLocked] = useState(false);
  const [assignedRooms, setAssignedRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    // Get round number from URL query params
    const params = new URLSearchParams(window.location.search);
    const round = params.get("round");
    if (round) {
      const roundNum = parseInt(round);
      setRoundNumber(roundNum);

      // Set criteria based on round number
      setCriteria(roundCriteria[roundNum] || []);

      // Initialize empty scores for all criteria
      const initialScores = {};
      roundCriteria[roundNum]?.forEach((criterion) => {
        initialScores[criterion.id] = 0;
      });
      initialScores.feedback = "";
      setScores(initialScores);
    }

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

        setAuthChecked(true);

        // Fetch rooms assigned to this judge for the current round
        if (round) {
          const roundNum = parseInt(round);
          await fetchAssignedRooms(judgeId, roundNum);
          checkRoundLockStatus(roundNum);
        } else {
          await fetchAssignedRooms(judgeId, 1);
          checkRoundLockStatus(1);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        window.location.href = "/judge-login";
      }
    };

    checkAuth();
  }, []);

  const fetchAssignedRooms = async (judgeId, round) => {
    try {
      setLoading(true);
      
      // Get rooms assigned to this judge for this round
      const { data: roomAssignments, error: roomsError } = await supabase
        .from("judge_room_assignments")
        .select(`
          id,
          room_id,
          rooms:room_id (
            id, 
            room_name, 
            room_location
          )
        `)
        .eq("judge_id", judgeId)
        .eq("round_number", round);

      if (roomsError) throw roomsError;

      if (roomAssignments && roomAssignments.length > 0) {
        // Extract room information from the nested structure
        const rooms = roomAssignments.map(assignment => assignment.rooms);
        setAssignedRooms(rooms);
        
        // If only one room is assigned, auto-select it
        if (rooms.length === 1) {
          setSelectedRoom(rooms[0]);
          await fetchTeamsForRoom(rooms[0].id, round);
        }
      } else {
        setAssignedRooms([]);
        setTeams([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assigned rooms:", error);
      setError("Failed to load assigned rooms. Please try again.");
      setLoading(false);
    }
  };

  const fetchTeamsForRoom = async (roomId, round) => {
    try {
      setLoading(true);
      setError(null);

      // Get judge ID from session storage
      const judgeId = sessionStorage.getItem("judgeId");

      if (!judgeId) {
        console.error("No judge ID found in session storage");
        setError("Authentication issue. Please login again.");
        setLoading(false);
        return;
      }

      // Get teams assigned to this room
      const { data: teamsData, error: teamsError } = await supabase
        .from("teams")
        .select("id, team_name")
        .eq("room_id", roomId);

      if (teamsError) throw teamsError;

      // Get scores for the SPECIFIC current round only
      let tableName = "";
      if (round === 1) tableName = "round1_scores";
      else if (round === 2) tableName = "round2_scores";
      else if (round === 3) tableName = "round3_scores";

      // Query the appropriate round scores table for this specific round
      const { data: scoresData, error: scoresError } = await supabase
        .from(tableName)
        .select("*")
        .eq("judge_id", judgeId);

      if (scoresError) throw scoresError;

      // Mark teams that already have scores FOR THIS SPECIFIC ROUND only
      const teamsWithScoringStatus = teamsData.map((team) => {
        const existingScore = (scoresData || []).find(
          (score) => score.team_id === team.id
        );
        return {
          ...team,
          scored: !!existingScore,
          scoreData: existingScore || null,
        };
      });

      setTeams(teamsWithScoringStatus);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError("Failed to load teams. Please try again.");
      setLoading(false);
    }
  };

  const checkRoundLockStatus = async (round) => {
    try {
      const { data, error } = await supabase
        .from("round_locks")
        .select("is_locked")
        .eq("round_number", round)
        .single();

      if (error) throw error;
      setIsRoundLocked(data.is_locked);
    } catch (err) {
      console.error("Error checking round lock status:", err);
      setIsRoundLocked(true); // Default to locked if there's an error
    }
  };

  // Force refetch when round changes, but ONLY if auth is already checked
  useEffect(() => {
    if (authChecked && judgeInfo) {
      // Reset selected team and room when round changes
      setSelectedTeam(null);
      setSelectedRoom(null);
      fetchAssignedRooms(judgeInfo.id, roundNumber);
      checkRoundLockStatus(roundNumber);
    }
  }, [roundNumber, authChecked]);

  const handleRoomSelect = async (room) => {
    setSelectedRoom(room);
    setSelectedTeam(null); // Clear selected team when room changes
    setError(null);
    setSuccessMessage(null);
    await fetchTeamsForRoom(room.id, roundNumber);
  };
  
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setError(null);
    setSuccessMessage(null);

    // If the team has already been scored, load those scores
    if (team.scored && team.scoreData) {
      const loadedScores = { feedback: team.scoreData.feedback || "" };

      // For each criterion in the current round, load the score
      criteria.forEach((criterion) => {
        loadedScores[criterion.id] = team.scoreData[criterion.id] || 0;
      });

      setScores(loadedScores);
    } else {
      // Reset scores for new team
      const initialScores = {};
      criteria.forEach((criterion) => {
        initialScores[criterion.id] = 0;
      });
      initialScores.feedback = "";
      setScores(initialScores);
    }
  };

  const handleScoreChange = (criterionId, value, maxScore) => {
    // Don't allow changes if team is already scored
    if (selectedTeam?.scored) return;
    
    // Ensure value is between 0 and maxScore
    const score = Math.max(0, Math.min(maxScore, value));
    setScores((prev) => ({
      ...prev,
      [criterionId]: score,
    }));
  };

  const handleFeedbackChange = (e) => {
    // Don't allow changes if team is already scored
    if (selectedTeam?.scored) return;
    
    setScores((prev) => ({
      ...prev,
      feedback: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedTeam) {
      setError("Please select a team to score.");
      return;
    }

    // Don't allow submitting if team is already scored
    if (selectedTeam.scored) {
      setError("This team has already been scored. Scores cannot be modified once submitted.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const judgeId = sessionStorage.getItem("judgeId");

      // Check if the round is locked
      const { data: roundLockData, error: roundLockError } = await supabase
        .from("round_locks")
        .select("is_locked")
        .eq("round_number", roundNumber)
        .single();

      if (roundLockError) throw roundLockError;

      if (roundLockData && roundLockData.is_locked) {
        throw new Error("Round is locked");
      }

      // Prepare score data based on the round
      const scoreData = {
        judge_id: judgeId,
        team_id: selectedTeam.id,
        feedback: scores.feedback,
      };

      // Add the specific criteria scores for this round
      criteria.forEach((criterion) => {
        scoreData[criterion.id] = scores[criterion.id] || 0;
      });

      // Determine which table to insert/update based on round number
      let tableName = "";
      if (roundNumber === 1) tableName = "round1_scores";
      else if (roundNumber === 2) tableName = "round2_scores";
      else if (roundNumber === 3) tableName = "round3_scores";

      // Only insert new scores, never update
      const { error } = await supabase.from(tableName).insert(scoreData);

      if (error) {
        if (error.message.includes("scores cannot be modified")) {
          throw new Error("Once submitted, scores cannot be modified.");
        } else {
          throw error;
        }
      }

      // Refresh teams data for the current room and round
      await fetchTeamsForRoom(selectedRoom.id, roundNumber);

      setSuccessMessage(
        `Scores for ${selectedTeam.team_name} saved successfully!`
      );

      // Clear selection after successful submission
      setSelectedTeam(null);
    } catch (error) {
      console.error("Error submitting scores:", error);
      if (error.message.includes("locked")) {
        setError("This round is currently locked. Scoring is not allowed.");
      } else if (error.message.includes("cannot be modified")) {
        setError("Once submitted, scores cannot be modified.");
      } else {
        setError("Failed to save scores. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    window.location.href = "/judge/dashboard";
  };

  const renderScoreInput = (criterion) => {
    return (
      <div key={criterion.id} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {criterion.label} (max: {criterion.maxScore})
        </label>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max={criterion.maxScore}
            value={scores[criterion.id] || 0}
            onChange={(e) =>
              handleScoreChange(
                criterion.id,
                parseInt(e.target.value),
                criterion.maxScore
              )
            }
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${
              selectedTeam?.scored ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={selectedTeam?.scored || isRoundLocked}
          />
          <span className="ml-4 text-lg font-medium">
            {scores[criterion.id] || 0}/{criterion.maxScore}
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Round {roundNumber} Scoring
            </h1>
            {isRoundLocked && (
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Lock size={12} className="mr-1" />
                Round Locked
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">{judgeInfo?.name}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Room selection when multiple rooms are assigned */}
        {assignedRooms.length > 1 && !selectedRoom && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Select Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleRoomSelect(room)}
                  className="flex items-center p-4 border rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  <Home size={20} className="mr-2 text-indigo-500" />
                  <div className="text-left">
                    <h3 className="font-medium">{room.room_name}</h3>
                    {room.room_location && (
                      <p className="text-sm text-gray-500">{room.room_location}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show selected room information */}
        {selectedRoom && (
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Home size={20} className="mr-2 text-indigo-500" />
                <div>
                  <h2 className="font-medium">{selectedRoom.room_name}</h2>
                  {selectedRoom.room_location && (
                    <p className="text-sm text-gray-500">{selectedRoom.room_location}</p>
                  )}
                </div>
              </div>
              {assignedRooms.length > 1 && (
                <button
                  onClick={() => {
                    setSelectedRoom(null);
                    setSelectedTeam(null);
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Change Room
                </button>
              )}
            </div>
          </div>
        )}

        {/* No rooms assigned message */}
        {assignedRooms.length === 0 && (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Rooms Assigned</h2>
            <p className="text-gray-600">
              You have not been assigned to any rooms for Round {roundNumber}. 
              Please contact the administrator if you believe this is an error.
            </p>
          </div>
        )}

        {/* Teams and Scoring UI - only show when a room is selected */}
        {selectedRoom && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team List */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Teams</h2>
              <div className="space-y-2">
                {teams.length === 0 ? (
                  <p className="text-gray-500">No teams available in this room.</p>
                ) : (
                  teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleTeamSelect(team)}
                      className={`w-full text-left px-4 py-3 rounded-lg border ${
                        selectedTeam?.id === team.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{team.team_name}</h3>
                        </div>
                        {team.scored && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Lock size={12} className="mr-1" />
                            Scored
                          </span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Scoring Form */}
            <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
              {selectedTeam ? (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Scoring: {selectedTeam.team_name}
                  </h2>

                  {/* Notice when team has already been scored */}
                  {selectedTeam.scored && (
                    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Lock className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            This team has already been scored. Scores cannot be modified once submitted. You can view the scores below.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notice when round is locked */}
                  {isRoundLocked && !selectedTeam.scored && (
                    <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Lock className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            This round is currently locked. Scoring is not allowed until the round is unlocked by an administrator.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Round-specific scoring criteria */}
                    {criteria.map((criterion) => renderScoreInput(criterion))}

                    {/* Show total score for the round */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Total Score</h3>
                      <div className="text-2xl font-bold text-indigo-600">
                        {criteria.reduce(
                          (total, criterion) =>
                            total + (scores[criterion.id] || 0),
                          0
                        )}{" "}
                        /
                        {criteria.reduce(
                          (total, criterion) => total + criterion.maxScore,
                          0
                        )}
                      </div>
                    </div>

                    {/* Feedback */}
                    <div>
                      <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Feedback (Optional)
                      </label>
                      <textarea
                        id="feedback"
                        rows={4}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          selectedTeam?.scored ? "bg-gray-50 opacity-75" : ""
                        }`}
                        placeholder="Provide feedback for the team..."
                        value={scores.feedback}
                        onChange={handleFeedbackChange}
                        disabled={selectedTeam?.scored || isRoundLocked}
                        readOnly={selectedTeam?.scored || isRoundLocked}
                      />
                    </div>

                    {/* Submit Button - only shown if team hasn't been scored and round isn't locked */}
                    {!selectedTeam.scored && !isRoundLocked && (
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                          {submitting ? (
                            "Saving..."
                          ) : (
                            <>
                              <Save size={18} className="mr-2" />
                              Save Scores
                            </>
                          )}
                        </button>
                        <p className="mt-2 text-xs text-gray-500 text-center">
                          Note: Once submitted, scores cannot be modified.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center">
                    <AlertCircle size={48} className="text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No team selected
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Please select a team from the list to begin scoring.
                  </p>
                </div>
              )}

              {/* Error or Success Message */}
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
          Hack and Viz 2.0 - Judging Portal
        </div>
      </footer>
    </div>
  );
}