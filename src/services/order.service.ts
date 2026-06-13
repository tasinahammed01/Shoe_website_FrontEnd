import { api } from '../lib/axios';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const orderService = {
  createOrder: async (orderData: Partial<Order>): Promise<Order> => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },

  getUserOrders: async (): Promise<Order[]> => {
    const response = await api.get('/api/orders/user');
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    const response = await api.patch(`/api/orders/${id}`, { status });
    return response.data;
  },
};
