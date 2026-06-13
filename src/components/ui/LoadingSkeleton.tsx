"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export default function LoadingSkeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: LoadingSkeletonProps) {
  const variants = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-sm",
    rounded: "rounded-xl",
  };

  const animations = {
    pulse: "animate-pulse",
    wave: "",
    none: "",
  };

  const baseStyles = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

  if (animation === "wave") {
    return (
      <motion.div
        className={`${baseStyles} ${variants[variant]} ${className}`}
        style={{ width, height }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%", "0% 0%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  }

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${animations[animation]} ${className}`}
      style={{ width, height }}
    />
  );
}
