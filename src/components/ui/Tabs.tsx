"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Tabs({ tabs, value, onChange, className = "" }: TabsProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => !tab.disabled && onChange(tab.value)}
            disabled={tab.disabled}
            className={`
              relative px-6 py-3 text-sm font-medium transition-colors
              ${tab.disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"}
              ${value === tab.value ? "text-black" : ""}
            `}
          >
            {tab.label}
            {value === tab.value && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TabContentProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

export function TabContent({ value, activeValue, children }: TabContentProps) {
  return (
    <AnimatePresence mode="wait">
      {value === activeValue && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
