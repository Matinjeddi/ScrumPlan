"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header, Sidebar, MobileBottomSheet } from "@/components/layout";
import { PlanningArea } from "@/components/planning";
import { RoleToggle } from "@/components/auth";
import { Button, Card } from "@/components/common";
import { StoryModal } from "@/components/backlog";
import { InviteModal } from "@/components/room";
import { useRoomStore } from "@/stores/roomStore";
import { useSessionStore } from "@/stores/sessionStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Story, User } from "@/types";
import { Settings, Share2, Copy, Check } from "lucide-react";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const { getRoomById, updateBacklog, updateSession } = useRoomStore();
  const { setVotesRevealed, votesRevealed, setCurrentUser: setSessionUser } = useSessionStore();

  const [room, setRoom] = useState(() => getRoomById(roomId));
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    const foundRoom = getRoomById(roomId);
    if (!foundRoom) {
      router.push("/");
      return;
    }
    setRoom(foundRoom);
    if (foundRoom.participants.length > 0) {
      const user = foundRoom.participants[foundRoom.participants.length - 1];
      setCurrentUser(user);
      setSessionUser(user);
    }
  }, [roomId, getRoomById, router, setSessionUser]);

  if (!room || !currentUser) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">Loading room...</p>
        </div>
      </div>
    );
  }

  const isOwner = room.ownerId === currentUser.id;
  const userRole = isOwner ? "product_owner" : currentUser.role;
  const backlog = room.backlog;
  const session = room.planningSession;
  const currentStory = backlog.find((s) => s.id === session.currentStoryId);

  const handleRoleChange = (role: "product_owner" | "team_member") => {
    setCurrentUser({ ...currentUser, role });
  };

  const handleRevealVotes = () => {
    setVotesRevealed(true);
  };

  const handleAddStory = () => {
    setEditingStory(null);
    setIsModalOpen(true);
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const handleDeleteStory = (storyId: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      const newBacklog = backlog.filter((s) => s.id !== storyId);
      updateBacklog(room.id, newBacklog);
      setRoom({ ...room, backlog: newBacklog });
    }
  };

  const handleSaveStory = (storyData: Partial<Story>) => {
    let newBacklog: Story[];
    if (storyData.id) {
      newBacklog = backlog.map((s) => (s.id === storyData.id ? { ...s, ...storyData } as Story : s));
    } else {
      const newStory: Story = {
        ...storyData,
        id: `story-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Story;
      newBacklog = [...backlog, newStory];
    }
    updateBacklog(room.id, newBacklog);
    setRoom({ ...room, backlog: newBacklog });
  };

  const handleStorySelect = (story: Story) => {
    const newSession = { ...session, currentStoryId: story.id };
    updateSession(room.id, newSession);
    setRoom({ ...room, planningSession: newSession });
    setVotesRevealed(false);
  };

  const handleReorderStories = (stories: Story[]) => {
    updateBacklog(room.id, stories);
    setRoom({ ...room, backlog: stories });
  };

  const handleMoveToNextStory = () => {
    if (currentStory) {
      const currentIndex = backlog.findIndex((s) => s.id === currentStory.id);
      if (currentIndex < backlog.length - 1) {
        const nextStory = backlog[currentIndex + 1];
        handleStorySelect(nextStory);
      }
    }
  };

  const handleExitSprint = () => {
    if (confirm("Are you sure you want to exit the sprint and start over? All progress will be lost.")) {
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header
        sprintGoal={session.sprintGoal || room.name}
        participants={room.participants}
        currentUser={currentUser}
        roomCode={room.inviteCode}
        onInviteClick={() => setIsInviteModalOpen(true)}
        onExitSprint={handleExitSprint}
      />

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar
            stories={backlog}
            currentStoryId={session.currentStoryId}
            userRole={userRole}
            onStorySelect={handleStorySelect}
            onAddStory={handleAddStory}
            onEditStory={handleEditStory}
            onDeleteStory={handleDeleteStory}
            onReorderStories={handleReorderStories}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                key={currentStory?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {backlog.length === 0 ? (
                  <Card className="p-8 text-center">
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No stories yet</h3>
                    <p className="text-slate-500 mb-4">
                      {isOwner
                        ? "Add your first story to start planning."
                        : "Waiting for the Product Owner to add stories."}
                    </p>
                    {isOwner && (
                      <Button onClick={handleAddStory}>Add First Story</Button>
                    )}
                  </Card>
                ) : (
                  <>
                    <PlanningArea
                      story={currentStory || null}
                      participants={room.participants}
                      onRevealVotes={handleRevealVotes}
                    />

                    {currentStory && (
                      <div className="flex gap-3">
                        <Button variant="primary" onClick={handleMoveToNextStory} size="md">
                          Next Story
                        </Button>
                        {userRole === "product_owner" && (
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => handleEditStory(currentStory)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                )}

                {isOwner && <RoleToggle currentRole={currentUser.role} onRoleChange={handleRoleChange} />}
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {isMobile && (
        <MobileBottomSheet
          stories={backlog}
          currentStoryId={session.currentStoryId}
          userRole={userRole}
          onStorySelect={handleStorySelect}
          onAddStory={handleAddStory}
          onEditStory={handleEditStory}
          onDeleteStory={handleDeleteStory}
        />
      )}

      <StoryModal
        isOpen={isModalOpen}
        story={editingStory}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStory}
      />

      <InviteModal
        isOpen={isInviteModalOpen}
        inviteCode={room.inviteCode}
        roomName={room.name}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
