"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  isWishlisted?: boolean;
  onToggle?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

export default function WishlistButton({
  isWishlisted = false,
  onToggle,
  size = "md",
  className = "",
}: WishlistButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle?.();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        transition-colors focus:outline-none focus:ring-2 focus:ring-black/20
        ${isWishlisted ? "bg-red-50 text-red-500" : "bg-white text-gray-600 hover:text-red-500"}
        shadow-sm border border-gray-200
        ${className}
      `}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={iconSizes[size]}
          className={isWishlisted ? "fill-current" : ""}
        />
      </motion.div>
    </motion.button>
  );
}
