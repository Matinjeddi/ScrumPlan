"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card } from "@/components/common";
import { X, Copy, Check, Link2, Users } from "lucide-react";

interface InviteModalProps {
  isOpen: boolean;
  inviteCode: string;
  roomName: string;
  onClose: () => void;
}

export default function InviteModal({ isOpen, inviteCode, roomName, onClose }: InviteModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const inviteLink = typeof window !== "undefined" 
    ? `${window.location.origin}/join/${inviteCode}`
    : "";

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-slate-900">Invite Team Members</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <p className="text-slate-600 mb-6">
              Share this code or link with your team to invite them to <strong>{roomName}</strong>.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Invite Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-100 rounded-lg px-4 py-3 text-center">
                    <span className="text-2xl font-mono font-bold tracking-widest text-slate-800">
                      {inviteCode}
                    </span>
                  </div>
                  <Button
                    variant={copiedCode ? "primary" : "outline"}
                    onClick={handleCopyCode}
                    className="px-3"
                  >
                    {copiedCode ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">or</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Invite Link
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-100 rounded-lg px-4 py-3 overflow-hidden">
                    <p className="text-sm text-slate-600 truncate font-mono">{inviteLink}</p>
                  </div>
                  <Button
                    variant={copiedLink ? "primary" : "outline"}
                    onClick={handleCopyLink}
                    className="px-3"
                  >
                    {copiedLink ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button variant="primary" className="w-full" onClick={onClose}>
                Done
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
