"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className = "",
  size = "md",
}: QuantitySelectorProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDecrement = () => {
    if (quantity > min) {
      setIsAnimating(true);
      onQuantityChange(quantity - 1);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      setIsAnimating(true);
      onQuantityChange(quantity + 1);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  const sizeClasses = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3 text-base",
    lg: "h-12 px-4 text-lg",
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  return (
    <div
      className={`flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white ${className}`}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`flex items-center justify-center ${sizeClasses[size]} hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize[size]} className="text-gray-700" />
      </motion.button>

      <motion.span
        key={quantity}
        initial={{ scale: 1.2, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`flex items-center justify-center ${sizeClasses[size]} font-semibold text-gray-900 min-w-[3rem]`}
      >
        {quantity}
      </motion.span>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`flex items-center justify-center ${sizeClasses[size]} hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize[size]} className="text-gray-700" />
      </motion.button>
    </div>
  );
}
