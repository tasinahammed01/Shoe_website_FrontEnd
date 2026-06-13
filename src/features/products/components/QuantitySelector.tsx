"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (quantity: number) => void;
  className?: string;
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  initial = 1,
  onChange,
  className = "",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= min && value <= max) {
      setQuantity(value);
      onChange?.(value);
    }
  };

  return (
    <div className={`flex items-center border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-16 text-center border-x border-gray-200 py-3 font-medium focus:outline-none"
      />
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
