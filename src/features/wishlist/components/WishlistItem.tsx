"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Trash2, Star, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WishlistItem as WishlistItemType } from "../types/wishlist.types";
import { useWishlistStore } from "../store/wishlist-store";

interface WishlistItemProps {
  item: WishlistItemType;
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const { removeItem, moveToCart } = useWishlistStore();
  const price = item.product.salePrice || item.product.price;
  const isInStock = item.product.stock > 0;

  const handleRemove = () => {
    removeItem(item.id);
  };

  const handleMoveToCart = () => {
    moveToCart(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${item.product.slug}`}>
          <Image
            src={item.product.images[0] || "/placeholder-product.jpg"}
            alt={item.product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.product.salePrice && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              SALE
            </div>
          )}
          {!isInStock && (
            <div className="bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2"
        >
          <Link href={`/product/${item.product.slug}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Quick view"
            >
              <Eye size={16} />
              Quick View
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMoveToCart}
            disabled={!isInStock}
            className="flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:from-gray-800 hover:to-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Move to cart"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </motion.button>
        </motion.div>

        {/* Remove Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors group-hover:opacity-100 opacity-0 transition-opacity"
          aria-label="Remove from wishlist"
        >
          <Trash2 size={18} className="text-red-500" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${item.product.slug}`}>
          <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2 group-hover:text-black/70 transition-colors">
            {item.product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(item.product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({item.product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {item.product.salePrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ${item.product.salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${item.product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${item.product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5">
          {isInStock ? (
            <>
              <CheckCircle size={14} className="text-green-500" />
              <span className="text-xs font-medium text-green-600">
                In Stock ({item.product.stock} available)
              </span>
            </>
          ) : (
            <>
              <div className="w-3.5 h-3.5 rounded-full bg-gray-400" />
              <span className="text-xs font-medium text-gray-500">
                Out of Stock
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
