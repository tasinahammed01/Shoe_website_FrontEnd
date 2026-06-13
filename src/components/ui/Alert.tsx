"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    messageColor: "text-green-700",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-900",
    messageColor: "text-yellow-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
  },
};

export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  className = "",
}: AlertProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`
        relative p-4 rounded-xl border-2
        ${config.bgColor} ${config.borderColor}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className={config.iconColor} style={{ flexShrink: 0, marginTop: "0.125rem" }} />
        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold mb-1 ${config.titleColor}`}>{title}</h3>
          )}
          <p className={`text-sm ${config.messageColor}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${config.iconColor}`}
            aria-label="Close alert"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
