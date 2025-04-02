import { createServer } from "http";
import { storage } from "./storage.js";
import { participantSchema } from "@shared/schema.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app) {
  // API routes
  
  // Get all participants
  app.get("/api/participants", async (req, res) => {
    try {
      const participants = await storage.getAllParticipants();
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participants" });
    }
  });

  // Register a new participant
  app.post("/api/participants", async (req, res) => {
    try {
      const validatedData = participantSchema.parse(req.body);
      const participant = await storage.createParticipant(validatedData);
      
      // If registering as a team, create the team
      if (validatedData.teamStatus === "team" && validatedData.teamName) {
        const team = await storage.createTeam({
          name: validatedData.teamName,
          leaderId: participant.id
        });
        
        // Add the leader to the team
        await storage.addTeamMember({
          teamId: team.id,
          participantId: participant.id
        });
        
        // Process team members if provided
        if (validatedData.teamMembers) {
          // This is just storing the emails, not creating actual accounts
          // In a real app, we would send invites to these emails
        }
      }
      
      res.status(201).json(participant);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to register participant" });
      }
    }
  });

  // Get teams
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  // Get team by ID
  app.get("/api/teams/:id", async (req, res) => {
    try {
      const teamId = parseInt(req.params.id);
      const team = await storage.getTeam(teamId);
      
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      
      // Get team members
      const teamMembers = await storage.getTeamMembers(teamId);
      
      res.json({ team, members: teamMembers });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}