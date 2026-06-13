"use client";

import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, HeadphonesIcon } from "lucide-react";

const trustFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
    color: "from-green-500 to-green-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "from-orange-500 to-orange-600",
  },
];

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
