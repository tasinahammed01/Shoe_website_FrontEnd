"use client";

import { motion } from "framer-motion";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "black" | "white";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const colorClasses = {
  black: "border-black",
  white: "border-white",
};

export default function Spinner({ size = "md", color = "black", className = "" }: SpinnerProps) {
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <motion.div
        className={`absolute inset-0 border-2 border-transparent rounded-full ${colorClasses[color]} border-t-current`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute inset-0 border-2 border-transparent rounded-full ${colorClasses[color]} border-b-current opacity-50`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: -0.5 }}
      />
    </div>
  );
}
