import { Product, ProductReview } from '@/features/products/types';
import { products as mockProducts } from '@/features/products/data/products';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

console.log('API_URL configured as:', API_URL);

// Transform MongoDB document to frontend Product type
function transformProduct(doc: any): Product {
  return {
    ...doc,
    id: doc._id?.toString() || doc.id,
  };
}

function transformProducts(docs: any[]): Product[] {
  return docs.map(transformProduct);
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    console.log('Fetching products from:', `${API_URL}/products`);
    const response = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    console.log('API response data:', data);
    const transformed = transformProducts(data.data);
    console.log('Transformed products:', transformed.length);
    return transformed;
  } catch (error) {
    console.error('Error fetching products, using mock data:', error);
    console.log('Using mock products:', mockProducts.length);
    return mockProducts;
  }
}

// Temporary: Force use mock data for testing
export async function fetchAllProductsMock(): Promise<Product[]> {
  console.log('Using mock products directly');
  return mockProducts;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/slug/${slug}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data.data ? transformProduct(data.data) : null;
  } catch (error) {
    console.error('Error fetching product, using mock data:', error);
    return mockProducts.find(p => p.slug === slug) || null;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    const data = await response.json();
    return transformProducts(data.data);
  } catch (error) {
    console.error('Error fetching products by category, using mock data:', error);
    return mockProducts.filter(p => p.category === category);
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/featured`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }
    const data = await response.json();
    return transformProducts(data.data);
  } catch (error) {
    console.error('Error fetching featured products, using mock data:', error);
    return mockProducts.filter(p => p.featured);
  }
}

export async function fetchNewArrivals(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/new-arrivals`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch new arrivals');
    }
    const data = await response.json();
    return transformProducts(data.data);
  } catch (error) {
    console.error('Error fetching new arrivals, using mock data:', error);
    return mockProducts.filter(p => p.newArrival);
  }
}

export async function fetchBestSellers(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/best-sellers`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch best sellers');
    }
    const data = await response.json();
    return transformProducts(data.data);
  } catch (error) {
    console.error('Error fetching best sellers, using mock data:', error);
    return mockProducts.filter(p => p.bestSeller);
  }
}
