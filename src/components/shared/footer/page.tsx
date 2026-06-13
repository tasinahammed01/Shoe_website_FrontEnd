"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Heart, Share2, Globe, MessageCircle, Camera } from "lucide-react";
import Container from "@/components/shared/container/container";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-24 pb-8">
      <Container>
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              LUXE
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Premium footwear crafted for those who demand excellence. Experience the perfect blend of style, comfort, and performance.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: MessageCircle, label: "Message" },
                { icon: Globe, label: "Website" },
                { icon: Share2, label: "Share" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
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
            <h3 className="text-lg font-semibold mb-6">Company</h3>
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
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
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
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
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
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
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
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:hello@luxe.com" className="text-white hover:text-gray-300 transition-colors">
                    hello@luxe.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+1234567890" className="text-white hover:text-gray-300 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white">
                    123 Luxury Lane<br />
                    New York, NY 10001
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pt-8 border-t border-white/10"
        >
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $100" },
            { icon: "🔒", title: "Secure Payment", desc: "100% protected" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day policy" },
            { icon: "🎧", title: "24/7 Support", desc: "Dedicated care" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-400 text-sm mb-4 text-center">Payment Methods</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
              <div
                key={method}
                className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors cursor-default"
              >
                {method}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © 2026 LUXE. All rights reserved. Made with <Heart className="inline text-red-500" size={14} />
          </p>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}