"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
  status: "pending" | "current" | "completed";
}

interface CheckoutStepsProps {
  steps: Step[];
  currentStep: number;
}

export default function CheckoutSteps({ steps, currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                  ${
                    step.status === "completed"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : step.status === "current"
                      ? "bg-gradient-to-r from-black to-gray-800 text-white ring-4 ring-black/10"
                      : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {step.status === "completed" ? (
                  <Check size={18} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div
                className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-colors ${
                  step.status === "completed"
                    ? "text-green-600"
                    : step.status === "current"
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </div>
            </motion.div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className={`h-0.5 flex-1 mx-4 transition-colors ${
                  step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
