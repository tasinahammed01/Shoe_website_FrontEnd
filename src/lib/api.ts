import { Product, ProductReview } from '@/features/products/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/slug/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function fetchNewArrivals(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/new-arrivals`);
    if (!response.ok) {
      throw new Error('Failed to fetch new arrivals');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
}

export async function fetchBestSellers(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/best-sellers`);
    if (!response.ok) {
      throw new Error('Failed to fetch best sellers');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    return [];
  }
}
