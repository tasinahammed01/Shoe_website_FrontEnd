"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
  sizes: Array<{ name: string; available: boolean }>;
  selectedSize?: string;
  onSelect: (size: string) => void;
  className?: string;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  className = "",
}: SizeSelectorProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {sizes.map((size) => (
        <motion.button
          key={size.name}
          type="button"
          onClick={() => size.available && onSelect(size.name)}
          disabled={!size.available}
          whileHover={size.available ? { scale: 1.05 } : {}}
          whileTap={size.available ? { scale: 0.95 } : {}}
          className={`
            px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
            ${selectedSize === size.name
              ? "border-black bg-black text-white"
              : size.available
              ? "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
              : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
            }
            focus:outline-none focus:ring-2 focus:ring-black/20
          `}
          aria-label={`Select size ${size.name}`}
          aria-disabled={!size.available}
        >
          {size.name}
        </motion.button>
      ))}
    </div>
  );
}
