"use client";

import { Check } from "lucide-react";
import { ProductColor } from "../types";
import { useState } from "react";

interface ColorSelectorProps {
  colors: ProductColor[];
  selected?: string;
  onChange?: (color: string) => void;
  className?: string;
}

export default function ColorSelector({
  colors,
  selected,
  onChange,
  className = "",
}: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(selected || colors[0]?.name);

  const handleSelect = (colorName: string) => {
    setSelectedColor(colorName);
    onChange?.(colorName);
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => handleSelect(color.name)}
          className={`relative w-10 h-10 rounded-full border-2 transition-all ${
            selectedColor === color.name
              ? "border-black scale-110"
              : "border-gray-200 hover:border-gray-400"
          }`}
          style={{ backgroundColor: color.hex }}
          aria-label={`Select ${color.name}`}
          title={color.name}
        >
          {selectedColor === color.name && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Check size={16} className="text-white drop-shadow-md" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
