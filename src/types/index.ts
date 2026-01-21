// User & Authentication Types
export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: "product_owner" | "team_member";
  isOnline: boolean;
}

// Story & Planning Types
export interface Story {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  estimatedPoints?: number;
  assignedTo?: string;
  status: "backlog" | "in-planning" | "planned" | "in-progress" | "done";
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  userId: string;
  storyId: string;
  points: number;
  timestamp: Date;
}

export interface PlanningSession {
  id: string;
  sprintGoal: string;
  currentStoryId?: string;
  status: "lobby" | "planning" | "completed";
  participants: User[];
  votes: Vote[];
  createdBy: string;
  createdAt: Date;
}

export interface FibonacciPoint {
  value: number;
  label: string;
}

// Room & Session Types
export interface Room {
  id: string;
  name: string;
  inviteCode: string;
  ownerId: string;
  planningSession: PlanningSession;
  backlog: Story[];
  participants: User[];
  createdAt: Date;
  updatedAt: Date;
}

// Real-time Event Types
export interface RealtimeEvent {
  type:
    | "user_joined"
    | "user_left"
    | "vote_submitted"
    | "votes_revealed"
    | "story_started"
    | "story_completed"
    | "backlog_updated";
  payload: any;
  timestamp: Date;
}
