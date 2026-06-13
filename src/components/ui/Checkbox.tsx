"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, checked, onChange, disabled = false, error, className = "", ...props }, ref) => {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <motion.button
            type="button"
            onClick={() => onChange?.({ target: { checked: !checked } } as any)}
            disabled={disabled}
            className={`
              w-5 h-5 rounded-md border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 flex items-center justify-center
              ${error ? "border-red-300" : checked ? "border-black bg-black" : "border-gray-300 bg-white"}
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            whileTap={{ scale: 0.95 }}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check size={14} className="text-white" />
              </motion.div>
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
                onClick={() => !disabled && onChange?.({ target: { checked: !checked } } as any)}
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

Checkbox.displayName = "Checkbox";

export default Checkbox;
