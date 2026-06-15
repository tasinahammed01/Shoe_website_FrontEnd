"use client";

import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, HeadphonesIcon, Award, Clock } from "lucide-react";

const trustFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
    subtext: "Fast & reliable delivery",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
    subtext: "SSL encrypted transactions",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    subtext: "Hassle-free returns",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team",
    subtext: "Always here to help",
    color: "from-orange-500 to-red-500",
  },
];

export default function TrustIndicators() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4 sm:mb-6">
            <Award size={14} className="text-green-700 sm:block hidden" />
            <Award size={12} className="text-green-700 block sm:hidden" />
            <span className="text-xs sm:text-sm font-semibold text-green-700">Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Shop With
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}Confidence
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible.
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
                >
                  <Icon size={20} className="text-white sm:block hidden" />
                  <Icon size={18} className="text-white block sm:hidden" />
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{feature.description}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{feature.subtext}</p>
                </div>

                {/* Decorative Element */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Additional Trust Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 sm:p-6 md:p-8 text-center border border-purple-100">
            <Clock size={24} className="text-purple-600 mx-auto mb-3 sm:mb-4 sm:block hidden" />
            <Clock size={20} className="text-purple-600 mx-auto mb-3 block sm:hidden" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">10+ Years</div>
            <div className="text-xs sm:text-sm text-gray-600">Industry Experience</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-5 sm:p-6 md:p-8 text-center border border-blue-100">
            <Shield size={24} className="text-blue-600 mx-auto mb-3 sm:mb-4 sm:block hidden" />
            <Shield size={20} className="text-blue-600 mx-auto mb-3 block sm:hidden" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">100%</div>
            <div className="text-xs sm:text-sm text-gray-600">Authentic Products</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 sm:p-6 md:p-8 text-center border border-green-100">
            <Award size={24} className="text-green-600 mx-auto mb-3 sm:mb-4 sm:block hidden" />
            <Award size={20} className="text-green-600 mx-auto mb-3 block sm:hidden" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">50K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Happy Customers</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
