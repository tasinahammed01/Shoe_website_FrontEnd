"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, checked, onChange, disabled = false, error, className = "", ...props }, ref) => {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative pt-0.5">
          <input
            ref={ref}
            type="radio"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <motion.button
            type="button"
            onClick={() => onChange?.({ target: { checked: true } } as any)}
            disabled={disabled}
            className={`
              w-5 h-5 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 flex items-center justify-center
              ${error ? "border-red-300" : checked ? "border-black" : "border-gray-300"}
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            whileTap={{ scale: 0.95 }}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-2.5 h-2.5 rounded-full bg-black"
              />
            )}
          </motion.button>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                className={`text-sm font-medium cursor-pointer ${
                  disabled ? "text-gray-400" : error ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => !disabled && onChange?.({ target: { checked: true } } as any)}
              >
                {label}
              </label>
            )}
            {description && (
              <span className={`text-xs ${disabled ? "text-gray-400" : "text-gray-500"}`}>
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
