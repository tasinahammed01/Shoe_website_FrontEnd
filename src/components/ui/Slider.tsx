"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  onChange?: (value: number[]) => void;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ label, min = 0, max = 100, step = 1, value = [0], onChange, showValue = true, className = "", ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value[0]);
    const currentValue = value?.[0] ?? localValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setLocalValue(newValue);
      onChange?.([newValue]);
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <div ref={ref} className={`w-full ${className}`}>
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            {showValue && (
              <span className="text-sm text-gray-900 font-medium">{currentValue}</span>
            )}
          </div>
        )}

        <div className="relative h-2 bg-gray-200 rounded-full">
          <motion.div
            className="absolute h-full bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.2 }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            {...props}
          />

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-pointer"
            style={{ left: `${percentage}%` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{min}</span>
          <span className="text-xs text-gray-500">{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
