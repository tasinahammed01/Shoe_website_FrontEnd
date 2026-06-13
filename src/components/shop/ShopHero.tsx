"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Sparkles } from "lucide-react";

const trustBadges = [
  { icon: Shield, text: "Secure Checkout" },
  { icon: Truck, text: "Free Shipping" },
  { icon: RotateCcw, text: "Easy Returns" },
];

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <span className="hover:text-black cursor-pointer transition-colors">Home</span>
                <span className="text-gray-300">/</span>
                <span className="font-medium text-black">Shop</span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full border border-black/10">
                  <Sparkles size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">New Collection 2024</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  Discover Premium{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Products
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                  Luxury shopping experience with carefully curated products from the world's finest brands.
                </p>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6"
              >
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
                        <Icon size={18} className="text-purple-700" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{badge.text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full aspect-square max-w-lg mx-auto"
              >
                {/* Abstract 3D-like shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-3xl transform rotate-6 opacity-20 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-purple-400 to-blue-400 rounded-3xl transform -rotate-3 opacity-30 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-300 to-blue-300 rounded-3xl transform rotate-3 opacity-40 blur-lg" />
                
                {/* Main shape */}
                <div className="relative h-full bg-gradient-to-br from-purple-100 via-white to-blue-100 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 blur-2xl"
                  />
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-xl flex items-center justify-center">
                      <Sparkles size={48} className="text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800">Premium Quality</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
