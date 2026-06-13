"use client";

import { motion } from "framer-motion";
import { CreditCard, Apple, Globe } from "lucide-react";
import { useState } from "react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit Card",
    icon: <CreditCard size={24} />,
    description: "Visa, Mastercard, Amex",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: <Apple size={24} />,
    description: "Fast and secure checkout",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: <Globe size={24} />,
    description: "Quick checkout with Google",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <CreditCard size={24} />,
    description: "Pay with PayPal account",
  },
];

interface PaymentMethodSelectorProps {
  selected: string;
  onSelect: (method: string) => void;
}

export default function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAYMENT_METHODS.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(method.id)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${
                selected === method.id
                  ? "border-black/20 bg-black/5 ring-4 ring-black/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selected === method.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {method.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {method.name}
                </h4>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
            </div>

            {selected === method.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-5 h-5 bg-black rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
