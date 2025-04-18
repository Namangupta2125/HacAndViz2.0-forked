import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, RefreshCw, Trophy, Medal, Award } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://bblzcyijscfszivrlyih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibHpjeWlqc2Nmc3ppdnJseWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODExMTEsImV4cCI6MjA1OTE1NzExMX0.RqmAtrdhLPuZ3mgsBECNlOIERBz6AI5A9szSdvRvNoI"
);

export default function LeaderboardPage() {
  const [activeRounds, setActiveRounds] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchActiveRounds();
  }, []);

  useEffect(() => {
    if (activeRounds.length > 0) {
      fetchTeams();
    } else {
      setLoading(false);
    }
  }, [activeRounds]);

  const fetchActiveRounds = async () => {
    try {
      const { data, error } = await supabase
        .from('round_access')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      
      // Get array of active round numbers
      const activeRoundNumbers = data.map(round => round.round);
      setActiveRounds(activeRoundNumbers);
    } catch (err) {
      console.error("Error fetching active rounds:", err);
      setError("Unable to load round information");
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    setLoading(true);
    try {
      // Determine the highest active round to use for ordering
      const highestActiveRound = Math.max(...activeRounds);
      let query = supabase.from('team_leaderboard').select('team_id, team_name, team_size');
      
      // Order by the appropriate score based on highest active round
      if (highestActiveRound === 1) {
        query = query.order('round1_total', { ascending: false });
      } else if (highestActiveRound === 2) {
        // For round 2, order by combined score of rounds 1+2
        query = query.order('round1_total', { ascending: false }).order('round2_total', { ascending: false });
      } else if (highestActiveRound === 3) {
        query = query.order('grand_total', { ascending: false });
      }
      
      // Limit to top 10 teams for rounds 1 and 2, top 3 for round 3
      const limit = highestActiveRound === 3 ? 3 : 10;
      query = query.limit(limit);
      
      const { data, error } = await query;
      
      if (error) throw error;
      setTeams(data || []);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError("Unable to load leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchActiveRounds();
    if (activeRounds.length > 0) {
      await fetchTeams();
    }
    setTimeout(() => setRefreshing(false), 500);
  };

  const renderRoundHeader = () => {
    if (activeRounds.length === 0) return "Results Yet To Be Declared";
    
    // Determine the highest active round to use for display
    const highestActiveRound = Math.max(...activeRounds);
    
    if (highestActiveRound === 1) {
      return "Round 1: Problem Understanding Phase";
    } else if (highestActiveRound === 2) {
      return "Round 2: Technical Implementation Phase";
    } else if (highestActiveRound === 3) {
      return "Final Results";
    }
  };

  // Function to get medal component based on position
  const getMedalComponent = (position) => {
    if (position === 0) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (position === 1) return <Medal className="h-8 w-8 text-gray-400" />;
    if (position === 2) return <Award className="h-8 w-8 text-amber-700" />;
    return null;
  };

  // Get gradient class for team cards based on position
  const getTeamCardClass = (index) => {
    const highestActiveRound = Math.max(...activeRounds);
    
    if (highestActiveRound === 3) {
      if (index === 0) return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300";
      if (index === 1) return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300";
      if (index === 2) return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300";
    }
    
    return "bg-white hover:bg-gray-50";
  };

  // Get ribbon style for top teams in final round
  const getRibbonStyle = (index) => {
    const highestActiveRound = Math.max(...activeRounds);
    
    if (highestActiveRound === 3 && index < 3) {
      if (index === 0) return "absolute -top-1 -right-1 w-12 h-12 bg-yellow-500 transform rotate-45 translate-x-4 -translate-y-2";
      if (index === 1) return "absolute -top-1 -right-1 w-12 h-12 bg-gray-400 transform rotate-45 translate-x-4 -translate-y-2";
      if (index === 2) return "absolute -top-1 -right-1 w-12 h-12 bg-amber-700 transform rotate-45 translate-x-4 -translate-y-2";
    }
    
    return "";
  };

  // Get position label
  const getPositionLabel = (index) => {
    const positions = ["1st", "2nd", "3rd"];
    return positions[index] || `${index + 1}th`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-16 pb-4 bg-gradient-to-r from-[#2B2D42] to-[#393B57] text-white">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Hack and Viz 2.0 Leaderboard
              </h1>
              <p className="text-blue-200 mb-4">
                <span className="inline-flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {renderRoundHeader()}
                </span>
              </p>
            </div>

            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 mt-4 md:mt-0"
              disabled={refreshing}
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Loading leaderboard data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : activeRounds.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Results Yet To Be Declared</h3>
            <p className="text-gray-500 mb-4">The competition is still in progress. Check back later for results!</p>
            <button 
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              Check Again
            </button>
          </div>
        ) : teams.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Teams Available</h3>
            <p className="text-gray-500">Teams will appear here once they've been evaluated.</p>
          </div>
        ) : (
          <div>
            {Math.max(...activeRounds) === 3 ? (
              // Special layout for Round 3 - Podium style for top 3
              <div>
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Congratulations to our Winners!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {teams.map((team, index) => (
                    <div key={team.team_id} className="relative">
                      <div className={`${getRibbonStyle(index)}`}></div>
                      <div className={`relative overflow-hidden rounded-lg shadow-md border-2 p-6 ${getTeamCardClass(index)}`}>
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-white p-3 rounded-full shadow-md mb-4">
                            {getMedalComponent(index)}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{getPositionLabel(index)} Place</h3>
                          <p className="text-2xl font-extrabold text-gray-800 mb-2">{team.team_name}</p>
                          <p className="text-sm text-gray-500">Team Size: {team.team_size}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Regular layout for Rounds 1 and 2 - List of top 10
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                    Top Teams
                  </h3>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {teams.map((team, index) => (
                    <li key={team.team_id} className="hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6 flex items-center">
                        <div className="min-w-12 text-center mr-4">
                          <span className="inline-flex items-center justify-center rounded-full bg-blue-100 w-8 h-8 text-lg font-medium text-blue-800">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-medium text-gray-900 truncate">
                            {team.team_name}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}