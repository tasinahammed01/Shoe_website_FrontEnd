"use client";

import { motion } from "framer-motion";
import { Heart, ArrowLeft, Share2, Trash2 } from "lucide-react";
import Link from "next/link";
import WishlistItemsList from "@/features/wishlist/components/WishlistItemsList";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";

export default function WishlistPage() {
  const { getItemCount, clearWishlist } = useWishlistStore();
  const itemCount = getItemCount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} className="text-gray-700" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {itemCount} {itemCount === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {itemCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearWishlist}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  aria-label="Clear wishlist"
                >
                  <Trash2 size={18} />
                  <span className="hidden sm:inline">Clear All</span>
                </motion.button>
              )}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl flex items-center justify-center"
              >
                <Heart size={24} className="text-pink-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-gray-600 max-w-2xl">
            Save your favorite items and keep track of products you love. Share
            your wishlist with friends and family for the perfect gift ideas.
          </p>
        </motion.div>

        {/* Wishlist Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <WishlistItemsList />
        </motion.div>

        {/* Share Wishlist - Desktop */}
        {itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="hidden md:block mt-12"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Share Your Wishlist
                  </h3>
                  <p className="text-sm text-gray-500">
                    Let your friends and family know what you love
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg shadow-black/20"
                >
                  <Share2 size={18} />
                  Share Wishlist
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Continue Shopping - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="md:hidden mt-8"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
              <ArrowLeft size={18} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Continue Shopping - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="hidden md:block mt-6"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
              <ArrowLeft size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
