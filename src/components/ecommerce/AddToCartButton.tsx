"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const iconSizes = {
  sm: 16,
  md: 18,
  lg: 20,
};

export default function AddToCartButton({
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  fullWidth = false,
  className = "",
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsAdded(true);
      onClick?.();
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        relative overflow-hidden rounded-xl font-medium transition-all duration-200
        flex items-center justify-center gap-2
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses[size]}
        ${disabled || loading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : isAdded
          ? "bg-green-600 text-white"
          : "bg-black text-white hover:bg-gray-800"
        }
        focus:outline-none focus:ring-2 focus:ring-black/20
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check size={iconSizes[size]} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={iconSizes[size]} />
          Add to Cart
        </>
      )}
    </motion.button>
  );
}
