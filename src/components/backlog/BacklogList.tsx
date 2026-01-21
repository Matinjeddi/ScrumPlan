"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/common";
import StoryCard from "./StoryCard";
import { Story, User } from "@/types";
import { useSessionStore } from "@/stores/sessionStore";
import { Plus, Search } from "lucide-react";

interface BacklogListProps {
  stories: Story[];
  currentStoryId?: string;
  userRole: "product_owner" | "team_member";
  onStorySelect: (story: Story) => void;
  onAddStory?: () => void;
  onEditStory?: (story: Story) => void;
  onDeleteStory?: (storyId: string) => void;
  onReorderStories?: (stories: Story[]) => void;
}

const BacklogList: React.FC<BacklogListProps> = ({
  stories,
  currentStoryId,
  userRole,
  onStorySelect,
  onAddStory,
  onEditStory,
  onDeleteStory,
  onReorderStories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = (e: any) => {
    // Implement drag-and-drop reordering
    const reorderedStories = [...stories];
    if (onReorderStories) {
      onReorderStories(reorderedStories);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Product Backlog</h2>
          <p className="text-sm text-slate-500">{stories.length} stories</p>
        </div>
        {userRole === "product_owner" && onAddStory && (
          <button
            onClick={onAddStory}
            className="flex items-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Story
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
        />
      </div>

      {/* Stories List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredStories.length > 0 ? (
            <motion.div className="flex flex-col gap-3">
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  isActive={story.id === currentStoryId}
                  onSelect={onStorySelect}
                  onEdit={userRole === "product_owner" ? onEditStory : undefined}
                  onDelete={userRole === "product_owner" ? onDeleteStory : undefined}
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-slate-500">
                {searchTerm ? "No stories match your search" : "No stories in backlog"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      <Card glassEffect className="p-4 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Total Points: {stories.reduce((sum, s) => sum + (s.estimatedPoints || 0), 0)}</span>
          <span>Estimated: {stories.filter((s) => s.estimatedPoints).length}</span>
        </div>
      </Card>
    </div>
  );
};

export default BacklogList;
