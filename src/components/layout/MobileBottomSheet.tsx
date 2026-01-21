"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/common";
import { BacklogList } from "@/components/backlog";
import { Story } from "@/types";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MobileBottomSheetProps {
  stories: Story[];
  currentStoryId?: string;
  userRole: "product_owner" | "team_member";
  onStorySelect: (story: Story) => void;
  onAddStory?: () => void;
  onEditStory?: (story: Story) => void;
  onDeleteStory?: (storyId: string) => void;
  onReorderStories?: (stories: Story[]) => void;
}

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  stories,
  currentStoryId,
  userRole,
  onStorySelect,
  onAddStory,
  onEditStory,
  onDeleteStory,
  onReorderStories,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: isExpanded ? 0 : "calc(100% - 60px)" }}
        className="fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl border-t border-slate-200 bg-white shadow-2xl md:hidden"
      >
        {/* Handle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center border-b border-slate-200 py-3"
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-slate-600" />
          ) : (
            <ChevronUp className="h-5 w-5 text-slate-600" />
          )}
        </button>

        {/* Content */}
        {isExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[70vh] overflow-y-auto p-4">
            <BacklogList
              stories={stories}
              currentStoryId={currentStoryId}
              userRole={userRole}
              onStorySelect={(story) => {
                onStorySelect(story);
                setIsExpanded(false);
              }}
              onAddStory={onAddStory}
              onEditStory={onEditStory}
              onDeleteStory={onDeleteStory}
              onReorderStories={onReorderStories}
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileBottomSheet;
