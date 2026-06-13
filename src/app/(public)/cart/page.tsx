"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, Shield, Truck, RefreshCw } from "lucide-react";
import Link from "next/link";
import CartItemsList from "@/features/cart/components/CartItemsList";
import CartSummary from "@/features/cart/components/CartSummary";
import { useCartStore } from "@/features/cart/store/cart-store";

export default function CartPage() {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} className="text-gray-700" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Shopping Cart
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"
            >
              <ShoppingBag size={24} className="text-gray-700" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CartItemsList />
            </motion.div>

            {/* Trust Badges - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="lg:hidden mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Shield, label: "Secure Checkout" },
                { icon: Truck, label: "Free Shipping" },
                { icon: RefreshCw, label: "Easy Returns" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <badge.icon size={20} className="text-gray-700" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 text-center">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <CartSummary />
            </motion.div>

            {/* Trust Badges - Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="hidden lg:block mt-6"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Why Shop With Us
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Shield,
                      title: "Secure Checkout",
                      description:
                        "Your payment information is safe with us",
                    },
                    {
                      icon: Truck,
                      title: "Free Shipping",
                      description: "On orders over $100",
                    },
                    {
                      icon: RefreshCw,
                      title: "Easy Returns",
                      description: "30-day return policy",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon size={18} className="text-gray-700" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="hidden lg:block mt-6"
            >
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                  <ArrowLeft size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Continue Shopping - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="lg:hidden mt-8"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
              <ArrowLeft size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
