"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 20,
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  disabled = false,
  className = "",
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`flex items-center border-2 border-gray-200 rounded-xl overflow-hidden ${disabled ? "opacity-50" : ""} ${className}`}>
      <motion.button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        whileHover={{ scale: disabled || value <= min ? 1 : 1.1 }}
        whileTap={{ scale: disabled || value <= min ? 1 : 0.9 }}
        className={`
          ${sizeClasses[size]} flex items-center justify-center
          ${disabled || value <= min ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}
          transition-colors focus:outline-none
        `}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSizes[size]} />
      </motion.button>

      <div className={`px-4 text-center font-semibold text-gray-900 ${size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"}`}>
        {value}
      </div>

      <motion.button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        whileHover={{ scale: disabled || value >= max ? 1 : 1.1 }}
        whileTap={{ scale: disabled || value >= max ? 1 : 0.9 }}
        className={`
          ${sizeClasses[size]} flex items-center justify-center
          ${disabled || value >= max ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}
          transition-colors focus:outline-none
        `}
        aria-label="Increase quantity"
      >
        <Plus size={iconSizes[size]} />
      </motion.button>
    </div>
  );
}
