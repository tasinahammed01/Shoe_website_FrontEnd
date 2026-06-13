"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Tag } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CouponInputProps {
  onApply: (code: string) => void;
  onRemove: () => void;
  appliedCode?: string;
  discountPercentage?: number;
  isLoading?: boolean;
}

const VALID_COUPONS: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15,
  SUMMER25: 25,
};

export default function CouponInput({
  onApply,
  onRemove,
  appliedCode,
  discountPercentage = 0,
  isLoading = false,
}: CouponInputProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const upperCode = code.toUpperCase().trim();
    
    if (!upperCode) {
      setError("Please enter a coupon code");
      return;
    }

    if (VALID_COUPONS[upperCode]) {
      onApply(upperCode);
      setCode("");
      setError("");
    } else {
      setError("Invalid coupon code");
    }
  };

  const handleRemove = () => {
    onRemove();
    setError("");
  };

  return (
    <div className="space-y-3">
      {appliedCode ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200"
        >
          <div className="flex items-center gap-2">
            <Check size={18} className="text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-900">
                Coupon Applied
              </p>
              <p className="text-xs text-green-700">
                {appliedCode} - {discountPercentage}% off
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            className="p-2 rounded-full hover:bg-green-100 transition-colors"
            aria-label="Remove coupon"
          >
            <X size={16} className="text-green-600" />
          </motion.button>
        </motion.div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              icon={<Tag size={18} />}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="Enter coupon code"
              error={error}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleApply();
                }
              }}
            />
          </div>
          <Button
            onClick={handleApply}
            loading={isLoading}
            disabled={!code.trim()}
          >
            Apply
          </Button>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {!appliedCode && (
        <p className="text-xs text-gray-500">
          Try codes: SAVE10, SAVE20, WELCOME15, SUMMER25
        </p>
      )}
    </div>
  );
}
