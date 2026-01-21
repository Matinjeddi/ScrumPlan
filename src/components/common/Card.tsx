"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glassEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, glassEffect = false, children, ...props }, ref) => {
    const baseStyles = "rounded-xl border border-slate-200 bg-white";
    const hoverStyles = hoverable ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-200" : "";
    const glassStyles = glassEffect
      ? "backdrop-blur-md bg-white bg-opacity-80 border-white border-opacity-30"
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, hoverStyles, glassStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
