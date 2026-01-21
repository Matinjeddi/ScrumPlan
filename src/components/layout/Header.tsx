"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, Badge } from "@/components/common";
import { User } from "@/types";
import { Users, LogOut, Share2, RotateCcw } from "lucide-react";

interface HeaderProps {
  sprintGoal: string;
  participants: User[];
  currentUser: User | null;
  roomCode?: string;
  onLogout?: () => void;
  onInviteClick?: () => void;
  onExitSprint?: () => void;
}

const Header: React.FC<HeaderProps> = ({ sprintGoal, participants, currentUser, roomCode, onLogout, onInviteClick, onExitSprint }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        {/* Sprint Goal */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Sprint Planning</h1>
          <p className="mt-1 text-sm text-slate-600">Goal: {sprintGoal || "No sprint goal set"}</p>
        </div>

        {/* Participants & User Info */}
        <div className="flex items-center gap-6">
          {/* Exit Sprint Button */}
          {onExitSprint && (
            <button
              onClick={onExitSprint}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Exit Sprint</span>
            </button>
          )}

          {/* Invite Button */}
          {roomCode && onInviteClick && (
            <button
              onClick={onInviteClick}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Invite</span>
              <span className="font-mono text-xs bg-primary-100 px-1.5 py-0.5 rounded">{roomCode}</span>
            </button>
          )}

          {/* Team Presence */}
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-600" />
            <div className="flex -space-x-2">
              {participants.slice(0, 5).map((participant) => (
                <Avatar
                  key={participant.id}
                  name={participant.name}
                  size="sm"
                  isOnline={participant.isOnline}
                />
              ))}
              {participants.length > 5 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white">
                  +{participants.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* Current User */}
          {currentUser && (
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-slate-900">{currentUser.name}</span>
                <Badge variant="tag" value={currentUser.role} label={currentUser.role.replace("_", " ")} />
              </div>
              <Avatar name={currentUser.name} size="md" isOnline={currentUser.isOnline} />
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 text-slate-600" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
