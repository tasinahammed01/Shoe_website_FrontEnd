import { api } from '../lib/axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  ratings: number;
  reviews: number;
}

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/api/products');
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/api/products/category/${category}`);
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/api/products/search?q=${query}`);
    return response.data;
  },
};
