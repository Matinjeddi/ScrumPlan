"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Card } from "@/components/common";
import { useRoomStore } from "@/stores/roomStore";
import { User } from "@/types";
import { generateId } from "@/utils/generateId";
import { Users, AlertCircle } from "lucide-react";

export default function JoinPage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = (params.code as string).toUpperCase();
  
  const { getRoomByInviteCode, joinRoom } = useRoomStore();
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [roomName, setRoomName] = useState<string | null>(null);
  const [isValidCode, setIsValidCode] = useState(true);

  useEffect(() => {
    const room = getRoomByInviteCode(inviteCode);
    if (room) {
      setRoomName(room.name);
      setIsValidCode(true);
    } else {
      setIsValidCode(false);
    }
  }, [inviteCode, getRoomByInviteCode]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    const user: User = {
      id: generateId(),
      name: name.trim(),
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      role: "team_member",
      isOnline: true,
    };

    const room = joinRoom(inviteCode, user);
    if (!room) {
      setError("Unable to join room. Please try again.");
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
          {isValidCode ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Join Planning Session</h2>
                {roomName && (
                  <p className="text-slate-600 mt-1">
                    You're joining <strong>{roomName}</strong>
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-2">
                  Invite code: <span className="font-mono font-bold">{inviteCode}</span>
                </p>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    autoFocus
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" variant="primary" className="w-full">
                  Join Session
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Invalid Invite Code</h2>
              <p className="text-slate-600 mb-4">
                The invite code <span className="font-mono font-bold">{inviteCode}</span> is not valid
                or the room no longer exists.
              </p>
              <Button variant="primary" onClick={() => router.push("/")}>
                Go to Home
              </Button>
            </motion.div>
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
