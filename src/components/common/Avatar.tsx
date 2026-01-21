"use client";

import React from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, src, size = "md", isOnline = false, ...props }, ref) => {
    const sizeStyles: Record<string, string> = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    };

    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-semibold",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image src={src} alt={name} className="h-full w-full rounded-full object-cover" />
        ) : (
          initials
        )}
        {isOnline && (
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-white" />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
