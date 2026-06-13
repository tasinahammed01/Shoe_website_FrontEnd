"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CartEmptyProps {
  isDrawer?: boolean;
}

export default function CartEmpty({ isDrawer = false }: CartEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center py-12 ${
        isDrawer ? "px-4" : "px-8"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center"
        >
          <span className="text-lg">🛍️</span>
        </motion.div>
      </motion.div>

      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        Looks like you haven't added any items to your cart yet. Start shopping
        to fill it up!
      </p>

      <Link href="/shop">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg shadow-black/20"
        >
          Start Shopping
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </motion.button>
      </Link>

      {!isDrawer && (
        <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-md">
          {[
            { icon: "🚚", label: "Free Shipping" },
            { icon: "🔒", label: "Secure Checkout" },
            { icon: "↩️", label: "Easy Returns" },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{feature.icon}</span>
              <span className="text-xs font-medium text-gray-600">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
