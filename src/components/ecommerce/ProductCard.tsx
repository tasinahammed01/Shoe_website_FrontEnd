"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Truck, RotateCcw, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  showWishlist?: boolean;
  showAddToCart?: boolean;
  priority?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  showWishlist = true,
  showAddToCart = true,
  priority = false,
  className = "",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const price = product.salePrice || product.price;
  const isOnSale = product.salePrice && product.salePrice < product.price;
  const discount = isOnSale ? Math.round(((product.price - price) / product.price) * 100) : 0;
  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/10 
        transition-all duration-400 ease-out group relative
        ${viewMode === "grid" ? "h-full flex flex-col" : "flex gap-6"}
        ${className}
      `}
    >
      {/* Image Section - 70% of card height */}
      <Link
        href={`/product/${product.slug}`}
        className={`
          relative overflow-hidden bg-gradient-to-br from-zinc-50 to-stone-100
          ${viewMode === "grid" ? "aspect-[4/5] flex-shrink-0" : "w-72 h-72 flex-shrink-0"}
        `}
      >
        {productImage && !imageError ? (
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={productImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
              onError={() => setImageError(true)}
              priority={priority}
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-stone-200">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-zinc-200 rounded-full flex items-center justify-center">
                <span className="text-zinc-400 text-3xl">👟</span>
              </div>
              <p className="text-zinc-400 text-sm font-medium">Image not available</p>
            </div>
          </div>
        )}

        {/* Luxury Badges - Floating */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {isOnSale && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="px-3 py-1.5 bg-black text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg"
            >
              SALE -{discount}%
            </motion.div>
          )}
          {product.newArrival && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="px-3 py-1.5 bg-black text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg"
            >
              New
            </motion.div>
          )}
          {product.bestSeller && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="px-3 py-1.5 bg-black text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg"
            >
              Best Seller
            </motion.div>
          )}
          {product.featured && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="px-3 py-1.5 bg-black text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg"
            >
              Limited
            </motion.div>
          )}
        </div>

        {/* Glassmorphism Action Buttons - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          {showWishlist && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              aria-label="Add to wishlist"
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
                    size={16}
                    className={`${isWishlisted ? "fill-black text-black" : "text-zinc-600"} transition-colors`}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 delay-75"
            aria-label="Quick view"
          >
            <Eye size={16} className="text-zinc-600" />
          </motion.button>
        </div>

        {/* Stock Indicator - Bottom Left */}
        {isLowStock && !isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 z-20"
          >
            <div className="px-2.5 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-[10px] font-semibold rounded-lg shadow-lg">
              Only {product.stock} left
            </div>
          </motion.div>
        )}

        {isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 z-20"
          >
            <div className="px-2.5 py-1 bg-zinc-800/90 backdrop-blur-sm text-white text-[10px] font-semibold rounded-lg shadow-lg">
              Out of Stock
            </div>
          </motion.div>
        )}

        {/* Add To Cart Button - Bottom (Desktop: hover reveal, Mobile: always visible) */}
        {showAddToCart && !isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            className="absolute bottom-3 left-3 right-3 z-20"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 sm:py-3 bg-black text-white rounded-xl font-semibold text-sm shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </motion.button>
          </motion.div>
        )}
      </Link>

      {/* Content Section - 30% of card height */}
      <div className={`p-4 sm:p-5 flex flex-col justify-between flex-1 ${viewMode === "list" ? "flex-1" : ""}`}>
        <div>
          {/* Brand Name - Small uppercase muted */}
          <p className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            {product.brand}
          </p>

          {/* Product Title - Bold luxury typography */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-zinc-900 mb-2 line-clamp-2 hover:text-black transition-colors text-sm sm:text-base leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Rating - Stars + review count */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "fill-black text-black" : "text-zinc-200"}
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs text-zinc-400">({product.reviewCount})</span>
          </div>

          {/* Price - Large bold primary, Compare price muted strikethrough */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-zinc-900">${price}</span>
            {isOnSale && (
              <span className="text-sm text-zinc-400 line-through">${product.price}</span>
            )}
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 mb-3">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zinc-100 border-2 border-white shadow-md flex items-center justify-center">
                  <span className="text-[8px] sm:text-[10px] text-zinc-600 font-semibold">
                    +{product.colors.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Modern Features - Optional hover reveal */}
          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 px-2 py-1 bg-zinc-50 rounded-md">
              <Truck size={10} className="text-zinc-500" />
              <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-zinc-50 rounded-md">
              <RotateCcw size={10} className="text-zinc-500" />
              <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">Free Returns</span>
            </div>
          </div>
        </div>

        {/* Mobile Add to Cart - Always visible on mobile */}
        {showAddToCart && !isOutOfStock && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 sm:py-3 bg-black text-white rounded-xl font-semibold text-sm shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all flex items-center justify-center gap-2 mt-3 sm:hidden"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
