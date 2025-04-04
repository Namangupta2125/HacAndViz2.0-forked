import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, ChevronRight, ChevronDown } from "lucide-react";

const supabase = createClient(
  "https://bblzcyijscfszivrlyih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibHpjeWlqc2Nmc3ppdnJseWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODExMTEsImV4cCI6MjA1OTE1NzExMX0.RqmAtrdhLPuZ3mgsBECNlOIERBz6AI5A9szSdvRvNoI"
);

export default function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({});
  const [teamMembers, setTeamMembers] = useState({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Check authentication on initial load
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Check if user is authenticated
  const checkAuthentication = async () => {
    setAuthChecking(true);

    try {
      // Check for existing session with Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Also check sessionStorage as fallback
      const isLoggedIn =
        session || sessionStorage.getItem("adminAuthenticated") === "true";

      setIsAuthenticated(!!isLoggedIn);

      // If authenticated, fetch teams
      if (isLoggedIn) {
        fetchTeams();
      } else {
        // Redirect to login page if not authenticated
        window.location.href = "/signup";
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      window.location.href = "/";
    } finally {
      setAuthChecking(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear session storage
      sessionStorage.removeItem("adminAuthenticated");

      // Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error during logout. Please try again.");
    }
  };

  // Fetch all teams from Supabase
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      alert("Error fetching registration data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch team members for a specific team
  const fetchTeamMembers = async (teamId) => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", teamId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Update team members state
      setTeamMembers((prev) => ({
        ...prev,
        [teamId]: data,
      }));
    } catch (error) {
      console.error(`Error fetching members for team ${teamId}:`, error);
    }
  };

  // Toggle team expansion to show members
  const toggleTeamExpansion = (teamId) => {
    if (!expandedTeams[teamId]) {
      // Fetch team members if not already loaded
      if (!teamMembers[teamId]) {
        fetchTeamMembers(teamId);
      }
    }

    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  // View payment proof in modal
  const viewPaymentProof = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  // Download CSV of all registrations
  const downloadCSV = async () => {
    try {
      // Fetch all teams with their members
      const { data: teamsData, error: teamsError } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });

      if (teamsError) throw teamsError;

      const { data: membersData, error: membersError } = await supabase
        .from("team_members")
        .select("*");

      if (membersError) throw membersError;

      // Group members by team
      const teamMembersMap = {};
      membersData.forEach((member) => {
        if (!teamMembersMap[member.team_id]) {
          teamMembersMap[member.team_id] = [];
        }
        teamMembersMap[member.team_id].push(member);
      });

      // Create CSV rows with improved formatting
      let csvContent =
        "Team ID,Team Name,Team Size,Registration Date,Member Name,University Roll Number,Mobile No,Email,Course,Year,Section,Accommodation,Hostel Name\n";

      teamsData.forEach((team, index) => {
        const members = teamMembersMap[team.id] || [];

        // Add a separator line before each team (except the first one)
        if (index > 0) {
          csvContent += "\n";
        }

        // Add team header with highlighted formatting
        csvContent += `${team.id},${team.team_name},${
          team.team_size
        },${new Date(team.created_at).toLocaleDateString()},,,,,,,,,\n`;

        if (members.length === 0) {
          csvContent += ",NO MEMBERS FOUND,,,,,,,,,,\n";
        } else {
          // Add members with indentation for visual grouping
          members.forEach((member) => {
            csvContent += `,→,→,→,${member.name},${
              member.university_roll_number
            },${member.mobile_no},${member.email},${member.course},${
              member.year_of_study
            },${member.class_section},${member.accommodation_type},${
              member.hostel_name || ""
            }\n`;
          });
        }
      });

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `hack_and_viz_registrations_${
          new Date().toISOString().split("T")[0]
        }.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV:", error);
      alert("Failed to download CSV. Please try again.");
    }
  };

  // Filter teams based on search term
  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If still checking auth status, show loading
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="py-6">
            <div className="text-center">Verifying authentication...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, this component shouldn't render (redirect handled in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-20">
        <Card className="mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Hack and Viz 2.0 - Registration Dashboard
              </CardTitle>
              <CardDescription className="mt-1">
                View and manage all team registrations
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <Button onClick={downloadCSV} className="flex items-center gap-2">
                <Download size={16} />
                Download CSV
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search and filters */}
            <div className="mb-6 flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by team name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Teams list */}
            {loading ? (
              <div className="text-center py-8">Loading registrations...</div>
            ) : filteredTeams.length === 0 ? (
              <div className="text-center py-8">No teams found</div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Team Size</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Payment Proof</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeams.map((team) => (
                        <React.Fragment key={team.id}>
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleTeamExpansion(team.id)}
                              >
                                {expandedTeams[team.id] ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </Button>
                            </TableCell>
                            <TableCell className="font-medium">
                              {team.team_name}
                            </TableCell>
                            <TableCell>{team.team_size}</TableCell>
                            <TableCell>
                              {new Date(team.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  viewPaymentProof(team.payment_proof_url)
                                }
                              >
                                <Eye size={16} className="mr-2" /> View
                              </Button>
                            </TableCell>
                          </TableRow>

                          {/* Expanded team members */}
                          {expandedTeams[team.id] && (
                            <TableRow className="bg-muted/50">
                              <TableCell colSpan={5} className="px-4 py-3">
                                <div className="rounded-md border bg-background">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Roll Number</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Mobile</TableHead>
                                        <TableHead>Course / Year</TableHead>
                                        <TableHead>Section</TableHead>
                                        <TableHead>Accommodation</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {teamMembers[team.id] ? (
                                        teamMembers[team.id].map((member) => (
                                          <TableRow key={member.id}>
                                            <TableCell className="font-medium">
                                              {member.name}
                                            </TableCell>
                                            <TableCell>
                                              {member.university_roll_number}
                                            </TableCell>
                                            <TableCell>
                                              {member.email}
                                            </TableCell>
                                            <TableCell>
                                              {member.mobile_no}
                                            </TableCell>
                                            <TableCell>
                                              {member.course},{" "}
                                              {member.year_of_study}Y
                                            </TableCell>
                                            <TableCell>
                                              {member.class_section}
                                            </TableCell>
                                            <TableCell>
                                              {member.accommodation_type}
                                              {member.hostel_name &&
                                                ` (${member.hostel_name})`}
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      ) : (
                                        <TableRow>
                                          <TableCell
                                            colSpan={7}
                                            className="text-center py-4"
                                          >
                                            Loading team members...
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment proof image modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>
              Screenshot of payment submitted by the team
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-2 bg-muted rounded-md">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Payment proof"
                className="max-h-[70vh] max-w-full object-contain"
              />
            )}
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => window.open(selectedImage, "_blank")}
            >
              Open Original
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
