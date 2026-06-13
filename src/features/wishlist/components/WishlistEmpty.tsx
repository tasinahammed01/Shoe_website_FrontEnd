"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WishlistEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center py-16 px-8"
    >
      {/* Illustration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
          <Heart size={64} className="text-pink-400" />
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center"
        >
          <Sparkles size={20} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Your wishlist is empty
      </h3>
      <p className="text-gray-500 mb-8 max-w-md text-lg">
        Save your favorite items and never lose track of what you love. Start
        exploring our collection!
      </p>

      {/* CTA Button */}
      <Link href="/shop">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg shadow-black/20 mb-12"
        >
          Start Exploring
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </motion.button>
      </Link>

      {/* Recommended Products Section */}
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-6">
            Why create a wishlist?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💝",
                title: "Save for Later",
                description:
                  "Keep track of items you love and want to purchase later",
              },
              {
                icon: "📉",
                title: "Price Alerts",
                description:
                  "Get notified when your saved items go on sale",
              },
              {
                icon: "🎁",
                title: "Gift Ideas",
                description:
                  "Share your wishlist with friends and family for perfect gifts",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h5>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
