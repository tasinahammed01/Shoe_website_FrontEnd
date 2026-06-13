"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import QuantitySelector from "./QuantitySelector";
import WishlistButton from "./WishlistButton";

interface ProductActionsProps {
  onAddToCart?: (quantity: number) => void;
  onWishlistToggle?: () => void;
  onShare?: () => void;
  isWishlisted?: boolean;
  stock?: number;
  className?: string;
}

export default function ProductActions({
  onAddToCart,
  onWishlistToggle,
  onShare,
  isWishlisted = false,
  stock = 10,
  className = "",
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={stock}
        />
      </div>

      {/* Add to Cart */}
      <AddToCartButton
        onClick={handleAddToCart}
        fullWidth
        disabled={stock === 0}
      />

      {/* Secondary Actions */}
      <div className="flex gap-3">
        <WishlistButton
          isWishlisted={isWishlisted}
          onToggle={onWishlistToggle}
          size="lg"
          className="flex-1"
        />
        <motion.button
          type="button"
          onClick={onShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all duration-200 flex items-center justify-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <Share2 size={20} />
          Share
        </motion.button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
            <Truck size={18} className="text-green-600" />
          </div>
          <p className="text-xs font-medium text-gray-900">Free Shipping</p>
          <p className="text-xs text-gray-500">On orders $100+</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield size={18} className="text-blue-600" />
          </div>
          <p className="text-xs font-medium text-gray-900">Secure Payment</p>
          <p className="text-xs text-gray-500">100% protected</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
            <RefreshCw size={18} className="text-purple-600" />
          </div>
          <p className="text-xs font-medium text-gray-900">Easy Returns</p>
          <p className="text-xs text-gray-500">30-day policy</p>
        </div>
      </div>
    </div>
  );
}
