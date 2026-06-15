"use client";

import { motion } from "framer-motion";
import { TrendingUp, Star, Award } from "lucide-react";
import Container from "@/components/shared/container/container";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { Product } from "@/features/products/types";

interface BestSellersContentProps {
  products: Product[];
}

export default function BestSellersContent({ products }: BestSellersContentProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white py-20 sm:py-28 md:py-36">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <TrendingUp size={16} />
              <span className="text-sm font-semibold tracking-wider uppercase">Most Loved</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Best Sellers
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-8 sm:mb-10">
              Discover the footwear that's captured hearts worldwide. Our top-rated picks, loved by thousands.
            </p>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="text-sm sm:text-base font-medium">Top Rated</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <Award className="text-yellow-400" size={20} />
                <span className="text-sm sm:text-base font-medium">Customer Favorites</span>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-3 sm:mb-4">
              {products.length} Best Selling Products
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              Handpicked based on customer reviews, ratings, and sales performance
            </p>
          </motion.div>

          <ProductGrid products={products} priority={true} />
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 bg-zinc-50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Star,
                title: "Top Rated",
                description: "4.8+ average rating from verified customers",
              },
              {
                icon: Award,
                title: "Award Winning",
                description: "Recognized for quality and design excellence",
              },
              {
                icon: TrendingUp,
                title: "Trending Now",
                description: "Most popular choices this season",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-100 shadow-sm"
              >
                <item.icon className="text-black mb-4" size={32} />
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-zinc-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
