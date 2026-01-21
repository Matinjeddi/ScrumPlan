"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Badge, Button, Avatar } from "@/components/common";
import PokerCard from "./PokerCard";
import { Story, User } from "@/types";
import { FIBONACCI_POINTS } from "@/utils/constants";
import { useSessionStore } from "@/stores/sessionStore";

interface PlanningAreaProps {
  story: Story | null;
  participants: User[];
  onRevealVotes: () => void;
}

const PlanningArea: React.FC<PlanningAreaProps> = ({ story, participants, onRevealVotes }) => {
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);
  const { addVote, currentUser, votes, votesRevealed, setVotesRevealed, clearVotes } = useSessionStore();

  const handleSelectPoints = (points: number) => {
    setSelectedPoints(points);
    if (currentUser) {
      addVote(currentUser.id, story?.id || "", points);
    }
  };

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-slate-500">No story selected for planning</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col gap-6">
      {/* Story Header */}
      <Card hoverable glassEffect className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{story.title}</h2>
            <p className="mt-2 text-slate-600">{story.description}</p>
          </div>
          {story.estimatedPoints && <span className="text-2xl font-bold text-primary-700">{story.estimatedPoints}</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="priority" value={story.priority} />
          {story.tags?.map((tag) => (
            <Badge key={tag} variant="tag" value={tag} />
          ))}
        </div>
      </Card>

      {/* Poker Voting Section */}
      <Card glassEffect className="flex-1 p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Estimate Story Points</h3>

        <div className="mb-6 grid grid-cols-5 gap-2 sm:grid-cols-4 md:flex md:flex-wrap">
          {FIBONACCI_POINTS.map((point) => (
            <PokerCard
              key={point.value}
              value={point.value}
              label={point.label}
              isSelected={selectedPoints === point.value}
              isRevealed={votesRevealed}
              onSelect={handleSelectPoints}
            />
          ))}
        </div>

        {/* Voting Controls */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => {
              setVotesRevealed(true);
              onRevealVotes();
            }}
            size="md"
          >
            Reveal Votes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedPoints(null);
              setVotesRevealed(false);
              if (story) {
                clearVotes(story.id);
              }
            }}
            size="md"
          >
            Reset
          </Button>
        </div>

        {/* Vote Results */}
        {votesRevealed && story && (
          <div className="mt-6 rounded-lg bg-slate-100 p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Vote Results</h4>
            <div className="flex flex-wrap gap-4">
              {participants.map((participant) => {
                const voteKey = `${participant.id}-${story.id}`;
                const vote = votes.get(voteKey);
                return (
                  <div key={participant.id} className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm">
                    <Avatar name={participant.name} size="sm" />
                    <span className="text-sm font-medium text-slate-700">{participant.name}:</span>
                    <span className="text-lg font-bold text-primary-600">
                      {vote !== undefined ? vote : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Participants */}
      <Card glassEffect className="p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Team Members</h4>
        <div className="flex flex-wrap gap-3">
          {participants.map((participant) => (
            <div key={participant.id} className="flex flex-col items-center gap-1">
              <Avatar name={participant.name} size="sm" isOnline={participant.isOnline} />
              <span className="text-xs text-slate-600">{participant.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default PlanningArea;
