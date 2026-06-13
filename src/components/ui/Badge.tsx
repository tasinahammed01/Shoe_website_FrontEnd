"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      dot = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-gray-100 text-gray-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-red-100 text-red-700",
      info: "bg-blue-100 text-blue-700",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };

    const dotColors = {
      default: "bg-gray-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
      info: "bg-blue-500",
    };

    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
        {...(props as any)}
      >
        {dot && (
          <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
        )}
        {children}
      </motion.div>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
