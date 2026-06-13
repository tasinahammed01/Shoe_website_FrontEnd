"use client";

import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = "Select an option",
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <motion.select
            ref={ref}
            className={`
              w-full px-4 py-3.5 rounded-xl border-2 appearance-none transition-all duration-200 pr-12
              ${error ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-white"}
              ${isFocused && !error ? "border-black/20 ring-4 ring-black/5" : ""}
              ${isFocused && error ? "ring-4 ring-red-100" : ""}
              focus:outline-none
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(props as any)}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </motion.select>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {error ? (
              <AlertCircle size={18} className="text-red-500" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
          >
            <AlertCircle size={14} />
            {error}
          </motion.p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
