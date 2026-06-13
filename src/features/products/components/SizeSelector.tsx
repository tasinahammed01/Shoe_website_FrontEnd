"use client";

import { ProductSize } from "../types";
import { useState } from "react";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected?: string;
  onChange?: (size: string) => void;
  className?: string;
}

export default function SizeSelector({
  sizes,
  selected,
  onChange,
  className = "",
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(selected || sizes[0]?.name);

  const handleSelect = (sizeName: string) => {
    const size = sizes.find((s) => s.name === sizeName);
    if (size?.available) {
      setSelectedSize(sizeName);
      onChange?.(sizeName);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {sizes.map((size) => (
        <button
          key={size.name}
          onClick={() => handleSelect(size.name)}
          disabled={!size.available}
          className={`px-4 py-2.5 rounded-xl border-2 font-medium transition-all ${
            selectedSize === size.name
              ? "border-black bg-black text-white"
              : size.available
              ? "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
              : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
          }`}
          aria-label={`Select size ${size.name}`}
          aria-disabled={!size.available}
        >
          {size.name}
        </button>
      ))}
    </div>
  );
}
