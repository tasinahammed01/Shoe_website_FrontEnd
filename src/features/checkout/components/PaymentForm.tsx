"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number must be at most 19 digits"),
  cardholderName: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters"),
  expiryMonth: z.string().min(1, "Month is required"),
  expiryYear: z.string().min(1, "Year is required"),
  cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must be at most 4 digits"),
  saveCard: z.boolean().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isLoading?: boolean;
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

export default function PaymentForm({ onSubmit, isLoading = false }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Security Notice */}
      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-xl border border-green-200">
        <Lock size={18} className="text-green-600" />
        <p className="text-sm text-green-700">
          Your payment information is secure and encrypted
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <Input
            label="Card Number"
            icon={<CreditCard size={18} />}
            {...register("cardNumber", {
              onChange: (e) => {
                e.target.value = formatCardNumber(e.target.value);
              },
            })}
            error={errors.cardNumber?.message}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>

        <Input
          label="Cardholder Name"
          {...register("cardholderName")}
          error={errors.cardholderName?.message}
          placeholder="JOHN DOE"
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Expiry Month"
            options={monthOptions}
            {...register("expiryMonth")}
            error={errors.expiryMonth?.message}
          />
          <Select
            label="Expiry Year"
            options={yearOptions}
            {...register("expiryYear")}
            error={errors.expiryYear?.message}
          />
        </div>

        <Input
          label="CVV"
          type="password"
          showPasswordToggle
          {...register("cvv")}
          error={errors.cvv?.message}
          placeholder="123"
          maxLength={4}
          helperText="3 or 4 digit security code on back of card"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveCard"
            {...register("saveCard")}
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="saveCard" className="text-sm text-gray-700">
            Save card for future purchases
          </label>
        </div>

        <Button type="submit" loading={isLoading} className="w-full">
          Complete Order
        </Button>
      </form>

      {/* Payment Logos */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-xs font-semibold">Visa</span>
          <span className="text-xs font-semibold">Mastercard</span>
          <span className="text-xs font-semibold">Amex</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="text-xs text-gray-400">Powered by Stripe</div>
      </div>
    </motion.div>
  );
}
