import { api } from '../lib/axios';

export interface PaymentDetails {
  orderId: string;
  amount: number;
  paymentMethod: string;
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  paymentId?: string;
}

export const paymentService = {
  createPayment: async (paymentDetails: PaymentDetails): Promise<PaymentResponse> => {
    const response = await api.post('/api/payments', paymentDetails);
    return response.data;
  },

  getPaymentStatus: async (paymentId: string): Promise<PaymentResponse> => {
    const response = await api.get(`/api/payments/${paymentId}`);
    return response.data;
  },

  refundPayment: async (paymentId: string): Promise<PaymentResponse> => {
    const response = await api.post(`/api/payments/${paymentId}/refund`);
    return response.data;
  },
};
