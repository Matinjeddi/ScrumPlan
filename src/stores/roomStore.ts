import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Room, User, Story, PlanningSession } from "@/types";
import { generateId, generateInviteCode } from "@/utils/generateId";

interface RoomState {
  rooms: Room[];
  currentRoomId: string | null;

  createRoom: (name: string, owner: User) => Room;
  joinRoom: (inviteCode: string, user: User) => Room | null;
  getRoomById: (id: string) => Room | undefined;
  getRoomByInviteCode: (code: string) => Room | undefined;
  setCurrentRoom: (roomId: string | null) => void;
  addParticipant: (roomId: string, user: User) => void;
  removeParticipant: (roomId: string, userId: string) => void;
  updateRoom: (roomId: string, updates: Partial<Room>) => void;
  updateBacklog: (roomId: string, backlog: Story[]) => void;
  updateSession: (roomId: string, session: PlanningSession) => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set, get) => ({
      rooms: [],
      currentRoomId: null,

      createRoom: (name, owner) => {
        const roomId = generateId();
        const inviteCode = generateInviteCode();
        
        const session: PlanningSession = {
          id: generateId(),
          sprintGoal: "",
          status: "lobby",
          participants: [owner],
          votes: [],
          createdBy: owner.id,
          createdAt: new Date(),
        };

        const newRoom: Room = {
          id: roomId,
          name,
          inviteCode,
          ownerId: owner.id,
          planningSession: session,
          backlog: [],
          participants: [owner],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          rooms: [...state.rooms, newRoom],
          currentRoomId: roomId,
        }));

        return newRoom;
      },

      joinRoom: (inviteCode, user) => {
        const room = get().getRoomByInviteCode(inviteCode.toUpperCase());
        if (!room) return null;

        const isAlreadyParticipant = room.participants.some((p) => p.id === user.id);
        if (!isAlreadyParticipant) {
          get().addParticipant(room.id, user);
        }

        set({ currentRoomId: room.id });
        return get().getRoomById(room.id) || room;
      },

      getRoomById: (id) => {
        return get().rooms.find((r) => r.id === id);
      },

      getRoomByInviteCode: (code) => {
        return get().rooms.find((r) => r.inviteCode === code.toUpperCase());
      },

      setCurrentRoom: (roomId) => {
        set({ currentRoomId: roomId });
      },

      addParticipant: (roomId, user) => {
        set((state) => ({
          rooms: state.rooms.map((room) => {
            if (room.id !== roomId) return room;
            const exists = room.participants.some((p) => p.id === user.id);
            if (exists) return room;
            return {
              ...room,
              participants: [...room.participants, user],
              planningSession: {
                ...room.planningSession,
                participants: [...room.planningSession.participants, user],
              },
              updatedAt: new Date(),
            };
          }),
        }));
      },

      removeParticipant: (roomId, userId) => {
        set((state) => ({
          rooms: state.rooms.map((room) => {
            if (room.id !== roomId) return room;
            return {
              ...room,
              participants: room.participants.filter((p) => p.id !== userId),
              planningSession: {
                ...room.planningSession,
                participants: room.planningSession.participants.filter((p) => p.id !== userId),
              },
              updatedAt: new Date(),
            };
          }),
        }));
      },

      updateRoom: (roomId, updates) => {
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId ? { ...room, ...updates, updatedAt: new Date() } : room
          ),
        }));
      },

      updateBacklog: (roomId, backlog) => {
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId ? { ...room, backlog, updatedAt: new Date() } : room
          ),
        }));
      },

      updateSession: (roomId, session) => {
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? { ...room, planningSession: session, updatedAt: new Date() }
              : room
          ),
        }));
      },
    }),
    {
      name: "scrumplan-rooms",
    }
  )
);
