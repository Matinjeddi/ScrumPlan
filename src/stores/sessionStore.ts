import { create } from "zustand";
import { User, Story, PlanningSession, Vote } from "@/types";

interface SessionState {
  // Current Session Data
  currentUser: User | null;
  currentSession: PlanningSession | null;
  backlog: Story[];
  votes: Map<string, number>; // storyId -> points
  votesRevealed: boolean;

  // UI State
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentUser: (user: User) => void;
  setCurrentSession: (session: PlanningSession) => void;
  setBacklog: (stories: Story[]) => void;
  addVote: (userId: string, storyId: string, points: number) => void;
  revealVotes: (storyId: string) => void;
  setVotesRevealed: (revealed: boolean) => void;
  clearVotes: (storyId: string) => void;
  moveToNextStory: (storyId: string) => void;
  updateStory: (story: Story) => void;
  addStory: (story: Story) => void;
  deleteStory: (storyId: string) => void;
  reorderBacklog: (stories: Story[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentUser: null,
  currentSession: null,
  backlog: [],
  votes: new Map(),
  votesRevealed: false,
  isLoading: false,
  error: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  setCurrentSession: (session) => set({ currentSession: session }),

  setBacklog: (stories) => set({ backlog: stories }),

  addVote: (userId, storyId, points) =>
    set((state) => {
      const newVotes = new Map(state.votes);
      newVotes.set(`${userId}-${storyId}`, points);
      return { votes: newVotes };
    }),

  revealVotes: (storyId) => set({ votesRevealed: true }),

  setVotesRevealed: (revealed) => set({ votesRevealed: revealed }),

  clearVotes: (storyId) =>
    set((state) => {
      const newVotes = new Map(state.votes);
      // Clear all votes for this story
      Array.from(newVotes.keys())
        .filter((key) => key.endsWith(`-${storyId}`))
        .forEach((key) => newVotes.delete(key));
      return { votes: newVotes, votesRevealed: false };
    }),

  moveToNextStory: (storyId) =>
    set((state) => {
      const currentIndex = state.backlog.findIndex((s) => s.id === storyId);
      const nextStory =
        currentIndex !== -1 && currentIndex < state.backlog.length - 1
          ? state.backlog[currentIndex + 1]
          : null;

      return {
        currentSession: state.currentSession
          ? {
              ...state.currentSession,
              currentStoryId: nextStory?.id,
            }
          : null,
        votes: new Map(),
      };
    }),

  updateStory: (story) =>
    set((state) => {
      const updatedBacklog = state.backlog.map((s) => (s.id === story.id ? story : s));
      return { backlog: updatedBacklog };
    }),

  addStory: (story) =>
    set((state) => ({
      backlog: [...state.backlog, story],
    })),

  deleteStory: (storyId) =>
    set((state) => ({
      backlog: state.backlog.filter((s) => s.id !== storyId),
    })),

  reorderBacklog: (stories) => set({ backlog: stories }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  reset: () =>
    set({
      currentUser: null,
      currentSession: null,
      backlog: [],
      votes: new Map(),
      isLoading: false,
      error: null,
    }),
}));
