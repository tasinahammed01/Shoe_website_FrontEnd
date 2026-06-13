export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: ProductCategory;
  brand: string;
  stock: number;
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  colors: ProductColor[];
  sizes: ProductSize[];
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  name: string;
  available: boolean;
}

export type ProductCategory =
  | "Running"
  | "Lifestyle"
  | "Basketball"
  | "Training"
  | "Casual"
  | "Luxury";

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export type SortOption =
  | "featured"
  | "newest"
  | "best-selling"
  | "price-low-high"
  | "price-high-low";

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
}
