export class MemStorage {
  constructor() {
    this.users = new Map();
    this.participants = new Map();
    this.teams = new Map();
    this.teamMembers = new Map();
    
    this.currentUserId = 1;
    this.currentParticipantId = 1;
    this.currentTeamId = 1;
    this.currentTeamMemberId = 1;
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Participant methods
  async getParticipant(id) {
    return this.participants.get(id);
  }
  
  async getParticipantByEmail(email) {
    return Array.from(this.participants.values()).find(
      (participant) => participant.email === email,
    );
  }
  
  async getAllParticipants() {
    return Array.from(this.participants.values());
  }
  
  async createParticipant(insertParticipant) {
    const id = this.currentParticipantId++;
    const registrationDate = new Date();
    const participant = { ...insertParticipant, id, registrationDate };
    this.participants.set(id, participant);
    return participant;
  }
  
  // Team methods
  async getTeam(id) {
    return this.teams.get(id);
  }
  
  async getTeamByName(name) {
    return Array.from(this.teams.values()).find(
      (team) => team.name === name,
    );
  }
  
  async getAllTeams() {
    return Array.from(this.teams.values());
  }
  
  async createTeam(insertTeam) {
    const id = this.currentTeamId++;
    const createdAt = new Date();
    const team = { ...insertTeam, id, createdAt };
    this.teams.set(id, team);
    return team;
  }
  
  // Team member methods
  async getTeamMembers(teamId) {
    const memberIds = Array.from(this.teamMembers.values())
      .filter(tm => tm.teamId === teamId)
      .map(tm => tm.participantId);
      
    return memberIds.map(id => this.participants.get(id)).filter(Boolean);
  }
  
  async addTeamMember(insertTeamMember) {
    const id = this.currentTeamMemberId++;
    const joinedAt = new Date();
    const teamMember = { ...insertTeamMember, id, joinedAt };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }
}

export const storage = new MemStorage();