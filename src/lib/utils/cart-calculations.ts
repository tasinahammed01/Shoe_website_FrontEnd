import { CartItem } from "@/features/cart/types/cart.types";

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CalculationOptions {
  taxRate?: number;
  freeShippingThreshold?: number;
  shippingCost?: number;
  discountCode?: string;
  discountPercentage?: number;
}

export function calculateCartTotals(
  items: CartItem[],
  options: CalculationOptions = {}
): CartTotals {
  const {
    taxRate = 0.08,
    freeShippingThreshold = 100,
    shippingCost = 9.99,
    discountCode,
    discountPercentage = 0,
  } = options;

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  // Calculate discount
  let discount = 0;
  if (discountCode && discountPercentage > 0) {
    discount = subtotal * (discountPercentage / 100);
  }

  // Calculate shipping
  const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;

  // Calculate tax (on subtotal minus discount)
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;

  // Calculate total
  const total = subtotal - discount + shipping + tax;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
}

export function calculateItemSubtotal(item: CartItem): number {
  const price = item.product.salePrice || item.product.price;
  return price * item.quantity;
}

export function calculateItemSavings(item: CartItem): number {
  if (!item.product.salePrice) return 0;
  return (item.product.price - item.product.salePrice) * item.quantity;
}

export function calculateTotalSavings(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateItemSavings(item), 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getUniqueProductCount(items: CartItem[]): number {
  return items.length;
}
