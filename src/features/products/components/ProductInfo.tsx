"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Truck, RotateCcw, Heart, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import QuantitySelector from "./QuantitySelector";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store/cart-store";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: Product;
  className?: string;
}

export default function ProductInfo({ product, className = "" }: ProductInfoProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const isInCart = useCartStore((state) => state.isInCart);
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const selectedColorObj = product.colors.find(c => c.name === selectedColor) || product.colors[0];
  const selectedSizeObj = product.sizes.find(s => s.name === selectedSize) || product.sizes[0];

  const handleAddToCart = () => {
    if (!selectedColorObj || !selectedSizeObj) {
      toast.error("Please select color and size");
      return;
    }

    setIsAdding(true);
    addItem(product, selectedColorObj, selectedSize, quantity);
    
    toast.success(`Added ${quantity} ${product.name} to cart`, {
      position: "bottom-center",
      duration: 2000,
    });

    setIsAdding(false);
  };

  const handleBuyNow = () => {
    if (!selectedColorObj || !selectedSizeObj) {
      toast.error("Please select color and size");
      return;
    }

    setIsAdding(true);
    addItem(product, selectedColorObj, selectedSize, quantity);
    
    toast.success(`Added ${quantity} ${product.name} to cart`, {
      position: "bottom-center",
      duration: 1500,
    });

    setTimeout(() => {
      router.push("/checkout");
    }, 500);

    setIsAdding(false);
  };

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleSizeChange = (sizeName: string) => {
    setSelectedSize(sizeName);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block"
      >
        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
          {product.category}
        </span>
      </motion.div>

      {/* Product Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold leading-tight"
      >
        {product.name}
      </motion.h1>

      {/* Rating */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
      </motion.div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ProductPrice price={product.price} salePrice={product.salePrice} size="lg" />
      </motion.div>

      {/* Short Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 leading-relaxed"
      >
        {product.shortDescription}
      </motion.p>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-6"
      >
        {[
          { icon: Shield, text: "Secure Checkout" },
          { icon: Truck, text: "Free Shipping" },
          { icon: RotateCcw, text: "Easy Returns" },
        ].map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <badge.icon size={18} className="text-gray-700" />
            <span>{badge.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Color Selector */}
      {product.colors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-semibold mb-3">Color: <span className="font-normal text-gray-600">{selectedColor}</span></p>
          <ColorSelector 
            colors={product.colors} 
            selected={selectedColor}
            onChange={handleColorChange}
          />
        </motion.div>
      )}

      {/* Size Selector */}
      {product.sizes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="font-semibold mb-3">Size</p>
          <SizeSelector 
            sizes={product.sizes} 
            selected={selectedSize}
            onChange={handleSizeChange}
          />
        </motion.div>
      )}

      {/* Quantity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="font-semibold mb-3">Quantity</p>
        <QuantitySelector 
          initial={quantity}
          min={1}
          max={product.stock}
          onChange={handleQuantityChange}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button 
          className="flex-1 py-4 text-lg"
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
          loading={isAdding}
        >
          Add to Cart
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 py-4 text-lg border-2"
          onClick={handleBuyNow}
          disabled={isAdding || product.stock === 0}
          loading={isAdding}
        >
          Buy Now
        </Button>
      </motion.div>

      {/* Secondary Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex gap-3"
      >
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Heart size={18} />
          <span className="font-medium">Wishlist</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Share2 size={18} />
          <span className="font-medium">Share</span>
        </button>
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="flex items-center gap-2 text-sm"
      >
        <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
        <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
          {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
        </span>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="space-y-3 pt-6 border-t border-gray-200"
      >
        {[
          "Premium materials and craftsmanship",
          "30-day money-back guarantee",
          "Free shipping on orders over $100",
          "Dedicated customer support",
        ].map((benefit, index) => (
          <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
            <Check size={18} className="text-green-600 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
