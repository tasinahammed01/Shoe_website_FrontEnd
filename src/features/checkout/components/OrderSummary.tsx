"use client";

import { motion } from "framer-motion";
import { Truck, Shield, RefreshCw, CheckCircle } from "lucide-react";
import { CartItem } from "@/features/cart/types/cart.types";
import { formatPrice } from "@/lib/utils/price-formatter";
import { calculateCartTotals } from "@/lib/utils/cart-calculations";
import { calculateShippingCost } from "@/lib/utils/shipping-calculator";
import Card from "@/components/ui/Card";

interface OrderSummaryProps {
  items: CartItem[];
  shippingOption?: string;
  discountCode?: string;
  discountPercentage?: number;
  taxRate?: number;
}

export default function OrderSummary({
  items,
  shippingOption = "standard",
  discountCode,
  discountPercentage = 0,
  taxRate = 0.08,
}: OrderSummaryProps) {
  const subtotal = items.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  const discount = discountCode ? subtotal * (discountPercentage / 100) : 0;
  const shipping = calculateShippingCost(subtotal, shippingOption);
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;
  const total = subtotal - discount + shipping + tax;

  return (
    <Card variant="elevated" className="sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const price = item.product.salePrice || item.product.price;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                  {item.product.name}
                </h4>
                <p className="text-xs text-gray-500 mb-1">
                  {item.selectedColor.name} / {item.selectedSize}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountCode})</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <Truck size={14} />
            Shipping
          </span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <Shield size={14} />
            Tax
          </span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>

        <div className="border-t-2 border-gray-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {subtotal < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Add {formatPrice(100 - subtotal)} more for FREE shipping
              </p>
              <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(subtotal / 100) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-100">
        {[
          { icon: Shield, label: "Secure" },
          { icon: Truck, label: "Free Ship" },
          { icon: RefreshCw, label: "Returns" },
        ].map((badge) => (
          <motion.div
            key={badge.label}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <badge.icon size={18} className="text-gray-700" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
