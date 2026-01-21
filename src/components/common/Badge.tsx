"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { PRIORITY_COLORS } from "@/utils/constants";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "priority" | "status" | "tag";
  value: "low" | "medium" | "high" | "critical" | string;
  label?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "tag", value, label, ...props }, ref) => {
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold";

    let variantStyles = "bg-slate-100 text-slate-700";

    if (variant === "priority") {
      variantStyles = PRIORITY_COLORS[value] || PRIORITY_COLORS.low;
    }

    return (
      <div ref={ref} className={cn(baseStyles, variantStyles, className)} {...props}>
        {label || value}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
