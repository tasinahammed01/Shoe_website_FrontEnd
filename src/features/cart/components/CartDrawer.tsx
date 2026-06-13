"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "../store/cart-store";
import { useEffect } from "react";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartSummary";
import Link from "next/link";

export default function CartDrawer() {
  const { isOpen, toggleCart, getItemCount } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => toggleCart(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl shadow-black/20 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-10">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <p className="text-sm text-gray-500">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleCart(false)}
                  className="p-3 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X size={24} className="text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <CartItemsList isDrawer />
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 p-6">
              <CartSummary isDrawer onCheckout={() => toggleCart(false)} />

              <Link href="/cart" onClick={() => toggleCart(false)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  View Full Cart
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
