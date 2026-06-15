"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles, Shield } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800" />
      
      {/* Decorative Elements */}
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
          className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8"
        >
          <Mail size={32} className="text-white sm:block hidden" />
          <Mail size={24} className="text-white block sm:hidden" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Get Exclusive
            <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              {" "}Deals & Updates
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:block hidden" size={18} />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 block sm:hidden" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-700 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitted ? (
                <>
                  <Sparkles size={18} className="sm:block hidden" />
                  <Sparkles size={16} className="block sm:hidden" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={18} className="sm:block hidden" />
                  <ArrowRight size={16} className="block sm:hidden" />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm"
        >
          <Shield size={14} className="sm:block hidden" />
          <Shield size={12} className="block sm:hidden" />
          <span>We respect your privacy. Unsubscribe at any time.</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-xs sm:text-sm text-white/70">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">20%</div>
            <div className="text-xs sm:text-sm text-white/70">Exclusive Deals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">Weekly</div>
            <div className="text-xs sm:text-sm text-white/70">Updates</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
