"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cart-store";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";

interface CartItemsListProps {
  isDrawer?: boolean;
}

export default function CartItemsList({ isDrawer = false }: CartItemsListProps) {
  const { items } = useCartStore();

  if (items.length === 0) {
    return <CartEmpty isDrawer={isDrawer} />;
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CartItem item={item} isDrawer={isDrawer} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
