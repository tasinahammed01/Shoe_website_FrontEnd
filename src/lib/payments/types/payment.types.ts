export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'stripe' | 'sslcommerz' | 'razorpay';
  name: string;
  enabled: boolean;
}

export interface CardPaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  saveCard?: boolean;
}

export interface PayPalPaymentDetails {
  email: string;
  saveAccount?: boolean;
}

export interface StripePaymentDetails {
  paymentMethodId: string;
  saveCard?: boolean;
}

export interface SSLCommerzPaymentDetails {
  tran_id: string;
  amount: number;
  currency: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
}

export interface RazorpayPaymentDetails {
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
}

export type PaymentDetails = 
  | CardPaymentDetails 
  | PayPalPaymentDetails 
  | StripePaymentDetails
  | SSLCommerzPaymentDetails
  | RazorpayPaymentDetails;

export interface PaymentRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  details: PaymentDetails;
  orderId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  transactionId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled';
  message?: string;
  error?: string;
  metadata?: Record<string, any>;
}

export interface PaymentConfig {
  stripe?: {
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  sslcommerz?: {
    storeId: string;
    storePassword: string;
    isSandbox: boolean;
  };
  razorpay?: {
    keyId: string;
    keySecret: string;
  };
}
