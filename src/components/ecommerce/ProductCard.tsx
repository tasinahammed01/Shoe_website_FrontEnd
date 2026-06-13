"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  showWishlist?: boolean;
  showAddToCart?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  showWishlist = true,
  showAddToCart = true,
  className = "",
}: ProductCardProps) {
  const price = product.salePrice || product.price;
  const isOnSale = product.salePrice && product.salePrice < product.price;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-2xl border border-gray-200 overflow-hidden
        ${viewMode === "grid" ? "h-full" : "flex gap-4"}
        ${className}
      `}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className={`
          relative overflow-hidden bg-gray-100
          ${viewMode === "grid" ? "aspect-[4/5]" : "w-48 h-48 flex-shrink-0"}
        `}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            SALE
          </div>
        )}
        {showWishlist && (
          <button
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        )}
      </Link>

      {/* Content */}
      <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-2">{product.category}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {isOnSale && (
            <span className="text-sm text-gray-400 line-through">${product.price}</span>
          )}
        </div>

        {showAddToCart && (
          <button
            className={`
              w-full py-2.5 rounded-xl font-medium transition-all duration-200
              bg-black text-white hover:bg-gray-800
              flex items-center justify-center gap-2
            `}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
}
