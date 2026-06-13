"use client";

import { motion } from "framer-motion";
import { Trash2, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import { CartItem as CartItemType } from "../types/cart.types";
import QuantitySelector from "./QuantitySelector";
import { useCartStore } from "../store/cart-store";

interface CartItemProps {
  item: CartItemType;
  isDrawer?: boolean;
}

export default function CartItem({ item, isDrawer = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const price = item.product.salePrice || item.product.price;
  const subtotal = price * item.quantity;

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(item.id, quantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const handleSaveForLater = () => {
    // Implement save for later functionality
    // TODO: Add save for later feature
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white rounded-2xl p-4 md:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 ${
        isDrawer ? "mb-4" : "mb-6"
      }`}
    >
      <div className={`flex gap-4 ${isDrawer ? "flex-col" : "flex-col sm:flex-row"}`}>
        {/* Product Image */}
        <div className={`relative ${isDrawer ? "w-full aspect-square" : "w-full sm:w-32 sm:h-32"} rounded-xl overflow-hidden bg-gray-50`}>
          <Image
            src={item.product.images[0] || "/placeholder-product.jpg"}
            alt={item.product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 128px"
          />
          {item.product.salePrice && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
              SALE
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1 line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemove}
                className="p-2 rounded-full hover:bg-red-50 transition-colors group-hover:opacity-100 opacity-0 transition-opacity"
                aria-label="Remove item"
              >
                <Trash2 size={18} className="text-red-500" />
              </motion.button>
            </div>

            {/* Variants */}
            <div className="flex flex-wrap gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color:
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                    style={{ backgroundColor: item.selectedColor.hex }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {item.selectedColor.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size:
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {item.selectedSize}
                </span>
              </div>
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
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <QuantitySelector
              quantity={item.quantity}
              onQuantityChange={handleQuantityChange}
              size="sm"
            />

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveForLater}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Save for later"
              >
                <Bookmark size={16} />
                <span className="hidden sm:inline">Save</span>
              </motion.button>

              {!isDrawer && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                    Subtotal
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
