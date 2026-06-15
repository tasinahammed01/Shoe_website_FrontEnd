"use client";

import { motion } from "framer-motion";
import { Check, Truck, Shield, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cart-store";
import { useState } from "react";

interface CartSummaryProps {
  isDrawer?: boolean;
  onCheckout?: () => void;
}

export default function CartSummary({
  isDrawer = false,
  onCheckout,
}: CartSummaryProps) {
  const router = useRouter();
  const { getSubtotal, getTotal, getItemCount, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = getItemCount();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = promoApplied ? subtotal * 0.1 : 0;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    onCheckout?.();
    if (!isDrawer) {
      router.push("/checkout");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-black/5 ${
        isDrawer ? "" : "sticky top-24"
      }`}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Promo Code */}
      {!isDrawer && (
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code (try: SAVE10)"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all text-sm"
              disabled={promoApplied}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApplyPromo}
              disabled={promoApplied || !promoCode}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {promoApplied ? "Applied" : "Apply"}
            </motion.button>
          </div>
          {promoApplied && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-1 text-green-600 text-sm font-medium"
            >
              <Check size={16} />
              Promo code applied! 10% off
            </motion.div>
          )}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Percent size={14} />
              Discount
            </span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <Truck size={14} />
            Shipping
          </span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <Shield size={14} />
            Tax (8%)
          </span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t-2 border-gray-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              ${(subtotal - discount + shipping + tax).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {subtotal < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <Truck size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Add ${(100 - subtotal).toFixed(2)} more for FREE shipping
              </p>
              <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(subtotal / 100) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Checkout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckout}
        disabled={itemCount === 0}
        className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-xl font-bold text-lg hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mb-3"
      >
        Proceed to Checkout
      </motion.button>

      {!isDrawer && (
        <>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => clearCart()}
            disabled={itemCount === 0}
            className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            Clear Cart
          </motion.button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            {[
              { icon: Shield, label: "Secure" },
              { icon: Truck, label: "Free Ship" },
              { icon: Check, label: "Guaranteed" },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <badge.icon size={18} className="text-gray-700" />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
