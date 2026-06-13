"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

export default function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  fallback,
  className = "",
  onClick,
}: AvatarProps) {
  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const Component = onClick ? motion.button : motion.div;
  const motionProps = onClick
    ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      }
    : {};

  return (
    <Component
      className={`
        relative rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200
        flex items-center justify-center font-semibold text-gray-600
        ${sizeClasses[size]}
        ${onClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20" : ""}
        ${className}
      `}
      {...motionProps}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User size={size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 32} />
      )}
    </Component>
  );
}
