"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/common";
import { Shield, Users } from "lucide-react";

interface RoleToggleProps {
  currentRole: "product_owner" | "team_member";
  onRoleChange: (role: "product_owner" | "team_member") => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ currentRole, onRoleChange }) => {
  return (
    <Card glassEffect className="p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Your Role</h3>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRoleChange("product_owner")}
          className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            currentRole === "product_owner"
              ? "bg-primary-700 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Shield className="h-4 w-4" />
          PO
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRoleChange("team_member")}
          className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            currentRole === "team_member"
              ? "bg-primary-700 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Users className="h-4 w-4" />
          Team
        </motion.button>
      </div>
    </Card>
  );
};

export default RoleToggle;
