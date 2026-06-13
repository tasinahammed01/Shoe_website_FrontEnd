"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ColorSelectorProps {
  colors: Array<{ name: string; hex: string; available: boolean }>;
  selectedColor?: string;
  onSelect: (color: string) => void;
  className?: string;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelect,
  className = "",
}: ColorSelectorProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {colors.map((color) => (
        <motion.button
          key={color.name}
          type="button"
          onClick={() => color.available && onSelect(color.name)}
          disabled={!color.available}
          whileHover={color.available ? { scale: 1.1 } : {}}
          whileTap={color.available ? { scale: 0.9 } : {}}
          className={`
            relative w-10 h-10 rounded-full border-2 transition-all duration-200
            ${selectedColor === color.name
              ? "border-black ring-2 ring-black/20"
              : color.available
              ? "border-gray-200 hover:border-gray-300"
              : "border-gray-100 opacity-50 cursor-not-allowed"
            }
            focus:outline-none focus:ring-2 focus:ring-black/20
          `}
          style={{ backgroundColor: color.hex }}
          aria-label={`Select color ${color.name}`}
          aria-disabled={!color.available}
          title={color.name}
        >
          {selectedColor === color.name && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check size={16} className="text-white drop-shadow-md" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
