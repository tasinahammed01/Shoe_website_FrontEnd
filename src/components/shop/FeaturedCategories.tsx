"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    count: 245,
    description: "Performance running shoes",
    gradient: "from-purple-500/80 to-pink-500/80",
  },
  {
    name: "Basketball",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
    count: 189,
    description: "Court-ready performance",
    gradient: "from-blue-500/80 to-purple-500/80",
  },
  {
    name: "Casual",
    image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
    count: 312,
    description: "Everyday comfort",
    gradient: "from-orange-500/80 to-red-500/80",
  },
  {
    name: "Training",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    count: 156,
    description: "Gym & workout gear",
    gradient: "from-green-500/80 to-teal-500/80",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 rounded-full mb-4 sm:mb-6">
            <TrendingUp size={14} className="text-purple-700 sm:block hidden" />
            <TrendingUp size={12} className="text-purple-700 block sm:hidden" />
            <span className="text-xs sm:text-sm font-semibold text-purple-700">Browse Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Explore Our
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}Collections
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect pair for every occasion. From performance to style, we have it all.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{category.name}</h3>
                    <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs sm:text-sm">{category.count} Products</span>
                      <motion.div
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight size={16} className="text-gray-900 sm:block hidden" />
                        <ArrowRight size={14} className="text-gray-900 block sm:hidden" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl font-semibold shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 inline-flex items-center gap-2"
            >
              View All Categories
              <ArrowRight size={18} className="sm:block hidden" />
              <ArrowRight size={16} className="block sm:hidden" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
