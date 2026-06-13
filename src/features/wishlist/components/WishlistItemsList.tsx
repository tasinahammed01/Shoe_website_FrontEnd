"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "../store/wishlist-store";
import WishlistItem from "./WishlistItem";
import WishlistEmpty from "./WishlistEmpty";

export default function WishlistItemsList() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <WishlistItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
