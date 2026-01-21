"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface PokerCardProps {
  value: number;
  label: string;
  isSelected?: boolean;
  isRevealed?: boolean;
  onSelect: (value: number) => void;
}

const PokerCard: React.FC<PokerCardProps> = ({
  value,
  label,
  isSelected = false,
  isRevealed = false,
  onSelect,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(value)}
      className={cn(
        "relative h-20 w-14 rounded-lg border-2 font-bold text-lg transition-all duration-200 ease-out",
        "flex items-center justify-center",
        isSelected
          ? "border-primary-700 bg-primary-100 text-primary-900 shadow-lg"
          : "border-slate-300 bg-white text-slate-700 hover:border-primary-500 hover:shadow-md",
        !isRevealed && "cursor-pointer",
        isRevealed && "cursor-not-allowed opacity-70"
      )}
      disabled={isRevealed}
    >
      {label}
    </motion.button>
  );
};

export default PokerCard;
