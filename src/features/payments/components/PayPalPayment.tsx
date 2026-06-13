"use client";

import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface PayPalPaymentProps {
  onSubmit: (paymentDetails: any) => void;
  isLoading?: boolean;
  amount: number;
}

export default function PayPalPayment({
  onSubmit,
  isLoading = false,
  amount,
}: PayPalPaymentProps) {
  const [email, setEmail] = useState("");
  const [saveAccount, setSaveAccount] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      saveAccount,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* PayPal Banner */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
        <CreditCard size={24} />
        <div>
          <p className="text-sm font-semibold">Pay with PayPal</p>
          <p className="text-xs text-blue-100">
            Fast, secure payment with your PayPal account
          </p>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="PayPal Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          icon={<Lock size={18} />}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveAccount"
            checked={saveAccount}
            onChange={(e) => setSaveAccount(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="saveAccount" className="text-sm text-gray-700">
            Save PayPal account for future purchases
          </label>
        </div>

        <Button type="submit" loading={isLoading} className="w-full">
          Pay ${amount.toFixed(2)} with PayPal
        </Button>
      </form>

      {/* Security Notice */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Lock size={16} className="text-gray-500" />
        <p className="text-xs text-gray-600">
          You'll be redirected to PayPal to complete your payment securely
        </p>
      </div>
    </motion.div>
  );
}
