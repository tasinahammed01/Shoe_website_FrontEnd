"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getNewArrivals } from "@/features/products/data/products";
import ProductCard from "@/components/ecommerce/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "@/features/products/types";

export default function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNewArrivals();
        setNewArrivals(data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        </div>
      </section>
    );
  }

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-full mb-4 sm:mb-6">
            <Sparkles size={14} className="sm:block hidden" />
            <Sparkles size={12} className="block sm:hidden" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Just Dropped</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-3 sm:mb-4">
            New
            <span className="text-black">
              {" "}Arrivals
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 max-w-2xl mx-auto">
            Discover the latest collection crafted with precision and style. Be the first to experience luxury.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {newArrivals.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link href="/new-arrivals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-xl font-semibold shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 inline-flex items-center gap-2"
            >
              View All New Arrivals
              <ArrowRight size={18} className="sm:block hidden" />
              <ArrowRight size={16} className="block sm:hidden" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
