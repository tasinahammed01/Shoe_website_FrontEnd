"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "@/components/shared/container/container";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { Product } from "@/features/products/types";

interface NewArrivalsContentProps {
  products: Product[];
}

export default function NewArrivalsContent({ products }: NewArrivalsContentProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Simplified, Premium */}
      <section className="relative bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white py-24 sm:py-32 md:py-40">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8"
            >
              <Sparkles size={14} className="text-white/80" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/90">New Collection</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              New Arrivals
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover the latest in premium footwear. Crafted with precision, designed for distinction.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Products Section - Clean, Focused */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {products.length} New Styles
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg max-w-xl mx-auto">
              Fresh from our design studio. Premium quality, exclusive drops.
            </p>
          </motion.div>

          <ProductGrid products={products} priority={true} />
        </Container>
      </section>

      {/* Trust Section - Minimal, Elegant */}
      <section className="py-16 sm:py-20 bg-zinc-50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Premium Quality",
                description: "Handcrafted with the finest materials",
              },
              {
                icon: Sparkles,
                title: "Limited Edition",
                description: "Exclusive designs in limited quantities",
              },
              {
                icon: Sparkles,
                title: "Free Shipping",
                description: "Complimentary shipping on orders over $100",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-zinc-900 rounded-full flex items-center justify-center">
                  <item.icon className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
