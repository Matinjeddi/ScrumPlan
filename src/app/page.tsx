"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Card } from "@/components/common";
import { useRoomStore } from "@/stores/roomStore";
import { User } from "@/types";
import { generateId } from "@/utils/generateId";
import { Users, Plus, LogIn } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { createRoom, joinRoom } = useRoomStore();
  
  const [mode, setMode] = useState<"select" | "create" | "join">("select");
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !roomName.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const owner: User = {
      id: generateId(),
      name: name.trim(),
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      role: "product_owner",
      isOnline: true,
    };

    const room = createRoom(roomName.trim(), owner);
    router.push(`/room/${room.id}`);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !inviteCode.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const user: User = {
      id: generateId(),
      name: name.trim(),
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      role: "team_member",
      isOnline: true,
    };

    const room = joinRoom(inviteCode.trim().toUpperCase(), user);
    if (!room) {
      setError("Invalid invite code. Please check and try again.");
      return;
    }

    router.push(`/room/${room.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-slate-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">ScrumPlan</h1>
          <p className="text-slate-600">Sprint Planning Made Simple</p>
        </div>

        <Card className="p-6 shadow-xl">
          {mode === "select" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setMode("create")}
              >
                <Plus className="h-5 w-5" />
                Create New Room
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setMode("join")}
              >
                <LogIn className="h-5 w-5" />
                Join Existing Room
              </Button>
            </motion.div>
          )}

          {mode === "create" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleCreateRoom}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g., Sprint 42 Planning"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setMode("select");
                    setError("");
                  }}
                >
                  Back
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Create Room
                </Button>
              </div>
            </motion.form>
          )}

          {mode === "join" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleJoinRoom}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Invite Code
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g., ABC123"
                  maxLength={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-center text-2xl tracking-widest font-mono"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setMode("select");
                    setError("");
                  }}
                >
                  Back
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Join Room
                </Button>
              </div>
            </motion.form>
          )}
        </Card>

        <p className="text-center text-slate-500 text-sm mt-6">
          <Users className="inline-block h-4 w-4 mr-1" />
          Collaborative sprint planning for agile teams
        </p>
      </motion.div>
    </div>
  );
}
