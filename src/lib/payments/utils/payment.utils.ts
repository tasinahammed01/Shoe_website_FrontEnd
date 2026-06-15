import { PaymentMethod } from '../types/payment.types';

/**
 * Format amount for payment gateway
 */
export function formatPaymentAmount(amount: number): number {
  // Most payment gateways expect amount in smallest currency unit (cents)
  return Math.round(amount * 100);
}

/**
 * Format amount from payment gateway
 */
export function formatPaymentAmountFromCents(cents: number): number {
  return cents / 100;
}

/**
 * Validate card number (Luhn algorithm)
 */
export function validateCardNumber(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(sanitized) || sanitized.length < 13 || sanitized.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate CVV
 */
export function validateCVV(cvv: string, cardType?: string): boolean {
  const sanitized = cvv.replace(/\s/g, '');
  
  if (!/^\d+$/.test(sanitized)) {
    return false;
  }

  // Amex requires 4 digits, others require 3
  const requiredLength = cardType === 'amex' ? 4 : 3;
  return sanitized.length === requiredLength;
}

/**
 * Validate expiry date
 */
export function validateExpiryDate(month: string, year: string): boolean {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);

  if (expiryYear < currentYear) {
    return false;
  }

  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return false;
  }

  return expiryMonth >= 1 && expiryMonth <= 12;
}

/**
 * Detect card type from card number
 */
export function detectCardType(cardNumber: string): string {
  const sanitized = cardNumber.replace(/\s/g, '');

  if (/^4/.test(sanitized)) {
    return 'visa';
  }

  if (/^5[1-5]/.test(sanitized) || /^2[2-7]/.test(sanitized)) {
    return 'mastercard';
  }

  if (/^3[47]/.test(sanitized)) {
    return 'amex';
  }

  if (/^6(?:011|5)/.test(sanitized)) {
    return 'discover';
  }

  return 'unknown';
}

/**
 * Generate unique transaction ID
 */
export function generateTransactionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `TXN_${timestamp}_${random}`.toUpperCase();
}

/**
 * Calculate payment fee based on payment method
 */
export function calculatePaymentFee(amount: number, method: PaymentMethod): number {
  switch (method.type) {
    case 'stripe':
      // Stripe: 2.9% + 30 cents
      return (amount * 0.029) + 0.30;
    case 'paypal':
      // PayPal: 2.9% + 30 cents
      return (amount * 0.029) + 0.30;
    case 'sslcommerz':
      // SSLCommerz: varies, typically 3-5%
      return amount * 0.035;
    case 'razorpay':
      // Razorpay: 2% per transaction
      return amount * 0.02;
    default:
      return 0;
  }
}

/**
 * Format payment method display name
 */
export function formatPaymentMethodName(method: PaymentMethod): string {
  switch (method.type) {
    case 'stripe':
      return 'Credit Card (Stripe)';
    case 'paypal':
      return 'PayPal';
    case 'sslcommerz':
      return 'SSLCommerz';
    case 'razorpay':
      return 'Razorpay';
    case 'card':
      return 'Credit Card';
    default:
      return method.name;
  }
}
