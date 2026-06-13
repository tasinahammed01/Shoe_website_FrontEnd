"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  value: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultValue?: string;
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  defaultValue,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue ? [defaultValue] : []);

  const toggleItem = (value: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    }
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {items.map((item) => (
        <div key={item.value} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleItem(item.value)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <motion.div
              animate={{ rotate: openItems.includes(item.value) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} className="text-gray-500" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openItems.includes(item.value) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
