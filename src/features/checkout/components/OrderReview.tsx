"use client";

import { motion } from "framer-motion";
import { MapPin, CreditCard, Package, CheckCircle } from "lucide-react";
import { CartItem } from "@/features/cart/types/cart.types";
import { ShippingAddress } from "@/lib/utils/shipping-calculator";
import { formatPrice } from "@/lib/utils/price-formatter";
import Card from "@/components/ui/Card";

interface OrderReviewProps {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export default function OrderReview({
  items,
  shippingAddress,
  paymentMethod,
  totals,
}: OrderReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Shipping Address */}
      <Card padding="md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-gray-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">
              {shippingAddress.firstName} {shippingAddress.lastName}
              <br />
              {shippingAddress.addressLine1}
              {shippingAddress.addressLine2 && (
                <>
                  <br />
                  {shippingAddress.addressLine2}
                </>
              )}
              <br />
              {shippingAddress.city}, {shippingAddress.state}{" "}
              {shippingAddress.postalCode}
              <br />
              {shippingAddress.country}
            </p>
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card padding="md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CreditCard size={18} className="text-gray-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
            <p className="text-sm text-gray-600">{paymentMethod}</p>
          </div>
        </div>
      </Card>

      {/* Order Items */}
      <Card padding="md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package size={18} className="text-gray-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-3">
              {items.map((item) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.selectedColor.name} / {item.selectedSize} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Order Total */}
      <Card padding="md" variant="elevated">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{formatPrice(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span className="font-medium">-{formatPrice(totals.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">
              {totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span className="font-medium">{formatPrice(totals.tax)}</span>
          </div>
          <div className="border-t-2 border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(totals.total)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Confirmation Notice */}
      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
        <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-green-900 mb-1">
            Order Confirmation
          </h4>
          <p className="text-sm text-green-700">
            By clicking "Place Order", you agree to our Terms of Service and
            Privacy Policy. Your order will be processed immediately.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
