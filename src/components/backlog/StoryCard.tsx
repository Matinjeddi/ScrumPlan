"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, Badge } from "@/components/common";
import { Story } from "@/types";
import { GripVertical, Edit2, Trash2 } from "lucide-react";

interface StoryCardProps {
  story: Story;
  isActive?: boolean;
  isDragging?: boolean;
  onSelect: (story: Story) => void;
  onEdit?: (story: Story) => void;
  onDelete?: (storyId: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isActive = false,
  isDragging = false,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer transition-all duration-200 ${isDragging ? "opacity-50" : ""}`}
    >
      <Card
        hoverable
        glassEffect
        className={`p-4 border-l-4 ${isActive ? "border-l-primary-700 shadow-lg bg-primary-50" : "border-l-slate-300"}`}
        onClick={() => onSelect(story)}
      >
        <div className="flex items-start gap-3">
          <GripVertical className="mt-1 h-4 w-4 flex-shrink-0 text-slate-400" />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 line-clamp-2">{story.title}</h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-1">{story.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="priority" value={story.priority} />
              {story.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="tag" value={tag} label={tag} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {story.estimatedPoints && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                {story.estimatedPoints}
              </div>
            )}

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(story);
                  }}
                  className="p-1 hover:bg-slate-200 rounded"
                >
                  <Edit2 className="h-4 w-4 text-slate-600" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(story.id);
                  }}
                  className="p-1 hover:bg-error hover:bg-opacity-20 rounded"
                >
                  <Trash2 className="h-4 w-4 text-error" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StoryCard;
