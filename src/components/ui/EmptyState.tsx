"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  illustration?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  illustration,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center py-16 px-8"
    >
      {illustration ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="mb-8"
        >
          {illustration}
        </motion.div>
      ) : Icon ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-8"
        >
          <Icon size={48} className="text-gray-400" />
        </motion.div>
      ) : null}

      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-500 mb-8 max-w-md">{description}</p>

      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg shadow-black/20"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
