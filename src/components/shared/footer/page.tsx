"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Heart, Share2, Globe, MessageCircle, Camera } from "lucide-react";
import Container from "@/components/shared/container/container";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 pb-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -120, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <Container className="relative">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="relative mb-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full blur-xl opacity-20"
              />
              <h2 className="relative text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                LUXE
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Premium footwear crafted for those who demand excellence. Experience the perfect blend of style, comfort, and performance.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: MessageCircle, label: "Twitter" },
                { icon: Share2, label: "Facebook" },
                { icon: Globe, label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border border-white/10"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Company</h3>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Press", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm group"
                  >
                    {link.label}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Shop</h3>
            <ul className="space-y-4">
              {[
                { label: "New Arrivals", href: "#" },
                { label: "Best Sellers", href: "#" },
                { label: "Categories", href: "#" },
                { label: "Sale", href: "#" },
                { label: "Gift Cards", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm group"
                  >
                    {link.label}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <a href="mailto:hello@luxe.com" className="text-white hover:text-gray-300 transition-colors text-sm">
                    hello@luxe.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <a href="tel:+1234567890" className="text-white hover:text-gray-300 transition-colors text-sm">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-white text-sm">
                    123 Luxury Lane<br />
                    New York, NY 10001
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-16 p-6 sm:p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay in the Loop</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Subscribe to our newsletter for exclusive offers and updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pt-8 border-t border-white/10"
        >
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $100" },
            { icon: "🔒", title: "Secure Payment", desc: "100% protected" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day policy" },
            { icon: "🎧", title: "24/7 Support", desc: "Dedicated care" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-sm mb-1 text-white">{item.title}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-gray-400 text-sm mb-4 text-center">Secure Payment Methods</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
              <motion.div
                key={method}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/20 transition-all cursor-default border border-white/10"
              >
                {method}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © 2026 LUXE. All rights reserved. Crafted with <Heart className="inline text-red-500 fill-red-500" size={12} />
          </p>
          
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}