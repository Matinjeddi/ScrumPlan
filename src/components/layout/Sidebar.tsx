"use client";

import React from "react";
import { motion } from "framer-motion";
import { BacklogList } from "@/components/backlog";
import { Story } from "@/types";

interface SidebarProps {
  stories: Story[];
  currentStoryId?: string;
  userRole: "product_owner" | "team_member";
  onStorySelect: (story: Story) => void;
  onAddStory?: () => void;
  onEditStory?: (story: Story) => void;
  onDeleteStory?: (storyId: string) => void;
  onReorderStories?: (stories: Story[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  stories,
  currentStoryId,
  userRole,
  onStorySelect,
  onAddStory,
  onEditStory,
  onDeleteStory,
  onReorderStories,
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden h-full flex-col border-r border-slate-200 bg-white p-4 md:flex md:w-96 lg:w-[400px]"
    >
      <BacklogList
        stories={stories}
        currentStoryId={currentStoryId}
        userRole={userRole}
        onStorySelect={onStorySelect}
        onAddStory={onAddStory}
        onEditStory={onEditStory}
        onDeleteStory={onDeleteStory}
        onReorderStories={onReorderStories}
      />
    </motion.aside>
  );
};

export default Sidebar;
