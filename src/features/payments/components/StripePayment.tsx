"use client";

import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface StripePaymentProps {
  onSubmit: (paymentDetails: any) => void;
  isLoading?: boolean;
  amount: number;
}

const monthOptions = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 10 }, (_, i) => ({
  value: String(currentYear + i),
  label: String(currentYear + i),
}));

export default function StripePayment({
  onSubmit,
  isLoading = false,
  amount,
}: StripePaymentProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiryMonth,
      expiryYear,
      cvv,
      cardholderName,
      saveCard,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Security Banner */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <Lock size={20} className="text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-900">
            Secure Payment
          </p>
          <p className="text-xs text-blue-700">
            Your payment is processed securely by Stripe
          </p>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Card Number"
          icon={<CreditCard size={18} />}
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />

        <Input
          label="Cardholder Name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="JOHN DOE"
        />

        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Month"
            options={monthOptions}
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
          />
          <Select
            label="Year"
            options={yearOptions}
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
          />
          <Input
            label="CVV"
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveCard"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="saveCard" className="text-sm text-gray-700">
            Save card for future purchases
          </label>
        </div>

        <Button type="submit" loading={isLoading} className="w-full">
          Pay ${amount.toFixed(2)}
        </Button>
      </form>

      {/* Payment Logos */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
        <div className="text-xs font-semibold text-gray-400">VISA</div>
        <div className="text-xs font-semibold text-gray-400">MASTERCARD</div>
        <div className="text-xs font-semibold text-gray-400">AMEX</div>
        <div className="text-xs font-semibold text-gray-400">DISCOVER</div>
      </div>
    </motion.div>
  );
}
