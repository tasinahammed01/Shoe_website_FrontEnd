"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/features/cart/store/cart-store";
import ShippingForm from "@/features/checkout/components/ShippingForm";
import PaymentForm from "@/features/checkout/components/PaymentForm";
import PaymentMethodSelector from "@/features/checkout/components/PaymentMethodSelector";
import CheckoutSteps from "@/features/checkout/components/CheckoutSteps";
import OrderSummary from "@/features/checkout/components/OrderSummary";
import OrderReview from "@/features/checkout/components/OrderReview";
import CouponInput from "@/features/checkout/components/CouponInput";
import StripePayment from "@/features/payments/components/StripePayment";
import PayPalPayment from "@/features/payments/components/PayPalPayment";
import PaymentStatus from "@/features/payments/components/PaymentStatus";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { calculateCartTotals } from "@/lib/utils/cart-calculations";
import { calculateShippingCost } from "@/lib/utils/shipping-calculator";
import { formatPrice } from "@/lib/utils/price-formatter";
import { ShippingAddress } from "@/lib/utils/shipping-calculator";

type CheckoutStep = "shipping" | "payment" | "review" | "confirmation";

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentFormData {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  saveCard?: boolean;
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [discountCode, setDiscountCode] = useState<string | undefined>();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "succeeded" | "failed">("pending");
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Generate order number on client side only to avoid hydration mismatch
  useEffect(() => {
    setOrderNumber(`ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
  }, []);

  const subtotal = items.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  const discount = discountCode ? subtotal * (discountPercentage / 100) : 0;
  const shipping = calculateShippingCost(subtotal, "standard");
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * 0.08;
  const total = subtotal - discount + shipping + tax;

  const steps: Array<{ id: string; label: string; status: "current" | "pending" | "completed" }> = [
    { id: "shipping", label: "Shipping", status: currentStep === "shipping" ? "current" : currentStep === "payment" || currentStep === "review" || currentStep === "confirmation" ? "completed" : "pending" },
    { id: "payment", label: "Payment", status: currentStep === "payment" ? "current" : currentStep === "review" || currentStep === "confirmation" ? "completed" : "pending" },
    { id: "review", label: "Review", status: currentStep === "review" ? "current" : currentStep === "confirmation" ? "completed" : "pending" },
  ];

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentData(data);
    setCurrentStep("review");
  };

  const handlePaymentMethodSubmit = (paymentDetails: any) => {
    setPaymentData(paymentDetails);
    setCurrentStep("review");
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setPaymentStatus("processing");

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPaymentStatus("succeeded");
    setCurrentStep("confirmation");
    setIsProcessing(false);

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  const handleBack = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    if (currentStep === "review") setCurrentStep("payment");
  };

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/shop">
            <Button className="mt-4">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Shop</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <div className="w-32" />
          </div>
        </div>
      </div>

      {/* Checkout Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-8">
        <CheckoutSteps steps={steps} currentStep={currentStep === "confirmation" ? 3 : steps.findIndex(s => s.status === "current")} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                    <ShippingForm
                      onSubmit={handleShippingSubmit}
                      defaultValues={shippingData || undefined}
                      isLoading={isProcessing}
                    />
                  </div>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                    <PaymentMethodSelector
                      selected={paymentMethod}
                      onSelect={setPaymentMethod}
                    />
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
                    {paymentMethod === "card" ? (
                      <PaymentForm
                        onSubmit={handlePaymentSubmit}
                        isLoading={isProcessing}
                      />
                    ) : paymentMethod === "paypal" ? (
                      <PayPalPayment
                        onSubmit={handlePaymentMethodSubmit}
                        isLoading={isProcessing}
                        amount={total}
                      />
                    ) : (
                      <StripePayment
                        onSubmit={handlePaymentMethodSubmit}
                        isLoading={isProcessing}
                        amount={total}
                      />
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Shipping
                  </Button>
                </motion.div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <OrderReview
                    items={items}
                    shippingAddress={shippingData as ShippingAddress}
                    paymentMethod={paymentMethod === "card" ? "Credit Card" : paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}
                    totals={{
                      subtotal,
                      discount,
                      shipping,
                      tax,
                      total,
                    }}
                  />

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      <ArrowLeft size={18} className="mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      loading={isProcessing}
                      className="flex-1"
                    >
                      Place Order
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Confirmation Step */}
              {currentStep === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <PaymentStatus
                    status={paymentStatus}
                    message="Thank you for your order! You will receive a confirmation email shortly."
                    amount={total}
                  />

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Order Number:</span> #{orderNumber}</p>
                      <p><span className="font-medium">Email:</span> {shippingData?.email}</p>
                      <p><span className="font-medium">Shipping Address:</span> {shippingData?.addressLine1}, {shippingData?.city}, {shippingData?.state} {shippingData?.postalCode}</p>
                    </div>
                  </div>

                  <Link href="/shop">
                    <Button className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <OrderSummary
                items={items}
                shippingOption="standard"
                discountCode={discountCode}
                discountPercentage={discountPercentage}
                taxRate={0.08}
              />

              {/* Coupon Input */}
              {currentStep !== "confirmation" && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Apply Coupon</h3>
                  <CouponInput
                    onApply={(code) => {
                      setDiscountCode(code);
                      const discounts: Record<string, number> = {
                        SAVE10: 10,
                        SAVE20: 20,
                        WELCOME15: 15,
                        SUMMER25: 25,
                      };
                      setDiscountPercentage(discounts[code] || 0);
                    }}
                    onRemove={() => {
                      setDiscountCode(undefined);
                      setDiscountPercentage(0);
                    }}
                    appliedCode={discountCode}
                    discountPercentage={discountPercentage}
                  />
                </div>
              )}

              {/* Trust Badges */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4">Secure Checkout</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-400" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-400" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-400" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
