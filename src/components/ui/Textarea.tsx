"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      maxLength,
      showCharCount = false,
      value,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <motion.textarea
            ref={ref}
            value={value}
            maxLength={maxLength}
            className={`
              w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 resize-none
              ${error ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-white"}
              ${isFocused && !error ? "border-black/20 ring-4 ring-black/5" : ""}
              ${isFocused && error ? "ring-4 ring-red-100" : ""}
              focus:outline-none
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(props as any)}
          />

          {error && (
            <div className="absolute right-4 top-4 text-red-500">
              <AlertCircle size={18} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-1.5">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle size={14} />
              {error}
            </motion.p>
          )}

          {showCharCount && maxLength && (
            <p className={`text-sm ${charCount >= maxLength ? "text-red-600" : "text-gray-500"}`}>
              {charCount}/{maxLength}
            </p>
          )}

          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
