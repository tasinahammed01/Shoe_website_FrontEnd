"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";

type PaymentStatus = "pending" | "processing" | "succeeded" | "failed" | "cancelled";

interface PaymentStatusProps {
  status: PaymentStatus;
  message?: string;
  amount?: number;
  currency?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    title: "Payment Pending",
    description: "Your payment is being processed",
  },
  processing: {
    icon: Loader2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    title: "Processing Payment",
    description: "Please wait while we process your payment",
  },
  succeeded: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    title: "Payment Successful",
    description: "Your payment has been completed successfully",
  },
  failed: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    title: "Payment Failed",
    description: "Your payment could not be processed",
  },
  cancelled: {
    icon: AlertCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    title: "Payment Cancelled",
    description: "The payment was cancelled",
  },
};

export default function PaymentStatus({
  status,
  message,
  amount,
  currency = "USD",
}: PaymentStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card padding="lg" className={`border-2 ${config.borderColor} ${config.bgColor}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-4"
      >
        <div className={`flex-shrink-0 ${config.color}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ rotate: 0 }}
              animate={{ rotate: status === "processing" ? 360 : 0 }}
              transition={
                status === "processing"
                  ? { duration: 1, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 }
              }
            >
              <Icon size={32} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${config.color} mb-1`}>
            {config.title}
          </h3>
          <p className="text-sm text-gray-700 mb-2">{config.description}</p>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-600"
            >
              {message}
            </motion.p>
          )}

          {amount !== undefined && status === "succeeded" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 pt-3 border-t border-gray-200"
            >
              <p className="text-2xl font-bold text-gray-900">
                {currency} {amount.toFixed(2)}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Card>
  );
}
