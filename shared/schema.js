import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  course: text("course").notNull(),
  joinHackathon: boolean("join_hackathon").default(false),
  joinDataViz: boolean("join_data_viz").default(false),
  teamStatus: text("team_status").notNull(), // "individual" or "team"
  teamName: text("team_name"),
  teamMembers: text("team_members"),
  experience: text("experience"),
  expectations: text("expectations"),
  termsAccepted: boolean("terms_accepted").notNull(),
  registrationDate: timestamp("registration_date").defaultNow(),
});

export const insertParticipantSchema = createInsertSchema(participants).omit({
  id: true,
  registrationDate: true,
});

export const participantSchema = insertParticipantSchema.extend({
  teamName: z.string().optional().nullable(),
  teamMembers: z.string().optional().nullable(),
  experience: z.string().optional().nullable(),
  expectations: z.string().optional().nullable(),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  leaderId: integer("leader_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull(),
  participantId: integer("participant_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  joinedAt: true,
});