"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, checked, onChange, disabled = false, className = "", ...props }, ref) => {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange?.({ target: { checked: !checked } } as any)}
          className={`
            relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black/20
            ${checked ? "bg-black" : "bg-gray-300"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <motion.div
            className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
            animate={{ x: checked ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-900"}`}>
                {label}
              </span>
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

Toggle.displayName = "Toggle";

export default Toggle;
