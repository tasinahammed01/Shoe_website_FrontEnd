"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Sparkles, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const trustBadges = [
  { icon: Shield, text: "Secure Checkout", subtext: "100% Protected" },
  { icon: Truck, text: "Free Shipping", subtext: "On orders $100+" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day policy" },
];

const customerStats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9", label: "Average Rating" },
  { value: "100%", label: "Satisfaction" },
];

export default function ShopHero() {
  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-purple-300/20 via-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -120, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/20 via-purple-200/20 to-blue-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              {/* Luxury Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-black/5 to-purple-500/5 rounded-full border border-black/10 backdrop-blur-sm"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30"
                  />
                  <Sparkles size={16} className="relative text-purple-600 sm:block hidden" />
                  <Sparkles size={14} className="relative text-purple-600 block sm:hidden" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">
                  New Collection 2026
                </span>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                  Step Into
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Luxury
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                  Experience unparalleled comfort and style with our premium footwear collection. Crafted for those who demand excellence.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl font-semibold shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
                  >
                    <span className="relative flex items-center gap-2">
                      Shop Collection
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform sm:block hidden" />
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform block sm:hidden" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/best-sellers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-2xl font-semibold shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 border border-gray-200 transition-all duration-300"
                  >
                    Best Sellers
                  </motion.button>
                </Link>
              </motion.div>

              {/* Customer Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 border-t border-gray-200"
              >
                {customerStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 sm:gap-3 md:gap-4"
              >
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:shadow-black/10 transition-all"
                    >
                      <div className="p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                        <Icon size={18} className="text-purple-700 sm:block hidden" />
                        <Icon size={16} className="text-purple-700 block sm:hidden" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 block">{badge.text}</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">{badge.subtext}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-[40px] transform rotate-6 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-purple-300/30 rounded-[40px] transform -rotate-3 blur-xl" />

                {/* Main product card */}
                <div className="relative bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 rounded-[40px] shadow-2xl shadow-black/10 border border-white/50 backdrop-blur-xl overflow-hidden">
                  {/* Product image */}
                  <div className="relative aspect-[4/5] p-8">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                        alt="Premium Shoe"
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-8 right-8 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold shadow-lg"
                    >
                      NEW
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute bottom-8 left-8 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold shadow-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>4.9</span>
                        <span className="text-gray-500">(1.2k)</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -left-12 top-20 px-6 py-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Premium Quality</div>
                      <div className="text-xs text-gray-500">Handcrafted</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                  className="absolute -right-8 bottom-32 px-6 py-4 bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl shadow-xl shadow-black/20"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">$149</div>
                    <div className="text-xs text-gray-300 line-through">$189</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
