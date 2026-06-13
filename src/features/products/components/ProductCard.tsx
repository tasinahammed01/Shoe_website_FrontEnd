"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { Product } from "../types";
import ProductBadge from "./ProductBadge";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, className = "", viewMode = "grid" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart logic here
  };

  const cardVariants = {
    grid: "aspect-[4/5]",
    list: "aspect-square sm:aspect-video",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: viewMode === "grid" ? -8 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group ${className}`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className={`relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-3xl overflow-hidden mb-4 ${cardVariants[viewMode]} shadow-sm hover:shadow-xl transition-shadow duration-300`}>
          {/* Glassmorphism overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/10 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none" />

          {/* Badge */}
          <ProductBadge product={product} />

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:bg-white"
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isWishlisted ? "filled" : "outline"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Heart
                  size={18}
                  className={`${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} transition-colors`}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Quick View Button - Desktop */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md text-white py-3 rounded-2xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center gap-2 hover:bg-black"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Eye size={18} />
            Quick View
          </motion.button>

          {/* Product Image with zoom effect */}
          <motion.div
            className="w-full h-full flex items-center justify-center p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-inner">
              <span className="text-gray-400 text-lg font-semibold text-center px-4">
                {product.name}
              </span>
            </div>
          </motion.div>

          {/* Color dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center">
                  <span className="text-[8px] text-gray-600 font-semibold">
                    +{product.colors.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className={viewMode === "list" ? "flex items-start gap-4" : ""}>
        <div className={viewMode === "list" ? "flex-1" : ""}>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-base sm:text-lg mb-2 hover:text-gray-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <ProductRating rating={product.rating} reviewCount={product.reviewCount} />

          <div className={`flex items-center gap-3 mt-3 ${viewMode === "list" ? "flex-wrap" : "justify-between"}`}>
            <ProductPrice price={product.price} salePrice={product.salePrice} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="p-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
