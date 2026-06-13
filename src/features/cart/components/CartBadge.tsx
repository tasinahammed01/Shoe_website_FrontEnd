"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cart-store";

interface CartBadgeProps {
  className?: string;
}

export default function CartBadge({ className = "" }: CartBadgeProps) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <AnimatePresence mode="wait">
      {itemCount > 0 && (
        <motion.span
          key={itemCount}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.2 }}
          className={`absolute -top-1 -right-1 text-[10px] font-semibold bg-gradient-to-r from-black to-gray-700 text-white px-1.5 py-0.5 rounded-full shadow-lg ${className}`}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
