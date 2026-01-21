"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props },
    ref
  ) => {
    const baseStyles = "font-medium rounded-lg transition-all duration-200 ease-out";

    const variantStyles: Record<string, string> = {
      primary: "bg-primary-700 text-white hover:bg-primary-800 active:scale-95 shadow-sm hover:shadow-md",
      secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 active:scale-95",
      outline: "border-2 border-primary-700 text-primary-700 hover:bg-primary-50 active:scale-95",
      ghost: "text-primary-700 hover:bg-primary-50 active:scale-95",
    };

    const sizeStyles: Record<string, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
