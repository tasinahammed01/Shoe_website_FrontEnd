import { Product, ProductReview } from "../types";
import { fetchAllProducts, fetchProductBySlug, fetchProductsByCategory, fetchFeaturedProducts, fetchNewArrivals, fetchBestSellers } from "@/lib/api";

// API-based functions - fetch from MongoDB via backend API
export async function getProducts(): Promise<Product[]> {
  return await fetchAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await fetchProductBySlug(slug);
  return product || undefined;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await fetchProductsByCategory(category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return await fetchFeaturedProducts();
}

export async function getNewArrivals(): Promise<Product[]> {
  return await fetchNewArrivals();
}

export async function getBestSellers(): Promise<Product[]> {
  return await fetchBestSellers();
}

// Fallback mock data for development
export const products: Product[] = [
  {
    id: "1",
    slug: "air-max-premium",
    name: "Air Max Premium",
    description: "Experience unparalleled comfort with our Air Max Premium. Featuring advanced cushioning technology and premium materials, these shoes are designed for those who demand excellence in every step.",
    shortDescription: "Premium running shoes with advanced cushioning technology",
    price: 189,
    salePrice: 149,
    rating: 4.9,
    reviewCount: 1284,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    category: "Running",
    brand: "LUXE",
    stock: 45,
    tags: ["running", "premium", "cushioning", "performance"],
    featured: true,
    newArrival: true,
    bestSeller: true,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Red", hex: "#EF4444" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
      { name: "US 12", available: false },
    ],
  },
  {
    id: "2",
    slug: "ultra-boost-elite",
    name: "Ultra Boost Elite",
    description: "The Ultra Boost Elite combines cutting-edge technology with sophisticated design. Perfect for both athletic performance and casual wear, these shoes deliver exceptional comfort and style.",
    shortDescription: "Elite performance shoes with boost technology",
    price: 219,
    rating: 4.8,
    reviewCount: 956,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ],
    category: "Running",
    brand: "LUXE",
    stock: 32,
    tags: ["running", "boost", "elite", "performance"],
    featured: true,
    newArrival: false,
    bestSeller: true,
    colors: [
      { name: "Navy", hex: "#1E3A8A" },
      { name: "Gray", hex: "#6B7280" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: false },
      { name: "US 11", available: true },
      { name: "US 12", available: true },
    ],
  },
  {
    id: "3",
    slug: "classic-leather",
    name: "Classic Leather",
    description: "Timeless elegance meets modern comfort. Our Classic Leather collection features premium leather construction with cushioned insoles, perfect for everyday wear.",
    shortDescription: "Premium leather casual shoes",
    price: 159,
    salePrice: 129,
    rating: 4.7,
    reviewCount: 743,
    images: [
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
    ],
    category: "Casual",
    brand: "LUXE",
    stock: 67,
    tags: ["casual", "leather", "classic", "everyday"],
    featured: false,
    newArrival: false,
    bestSeller: true,
    colors: [
      { name: "Brown", hex: "#8B4513" },
      { name: "Black", hex: "#000000" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
      { name: "US 12", available: true },
    ],
  },
  {
    id: "4",
    slug: "basketball-pro",
    name: "Basketball Pro",
    description: "Dominate the court with our Basketball Pro series. Engineered for professional athletes with superior traction, ankle support, and responsive cushioning.",
    shortDescription: "Professional basketball shoes",
    price: 249,
    rating: 4.9,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
    ],
    category: "Basketball",
    brand: "LUXE",
    stock: 28,
    tags: ["basketball", "pro", "court", "performance"],
    featured: true,
    newArrival: true,
    bestSeller: false,
    colors: [
      { name: "Black/Red", hex: "#000000" },
      { name: "White/Blue", hex: "#FFFFFF" },
    ],
    sizes: [
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
      { name: "US 12", available: true },
      { name: "US 13", available: true },
    ],
  },
  {
    id: "5",
    slug: "training-elite",
    name: "Training Elite",
    description: "Built for intense training sessions. The Training Elite features breathable mesh, durable construction, and superior stability for all your workout needs.",
    shortDescription: "High-performance training shoes",
    price: 179,
    rating: 4.6,
    reviewCount: 432,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    ],
    category: "Training",
    brand: "LUXE",
    stock: 54,
    tags: ["training", "gym", "workout", "performance"],
    featured: false,
    newArrival: false,
    bestSeller: false,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#6B7280" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
    ],
  },
  {
    id: "6",
    slug: "luxury-collection",
    name: "Luxury Collection",
    description: "The pinnacle of footwear craftsmanship. Our Luxury Collection features exotic materials, hand-finished details, and unparalleled comfort for the discerning individual.",
    shortDescription: "Handcrafted luxury footwear",
    price: 499,
    rating: 5.0,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    ],
    category: "Luxury",
    brand: "LUXE",
    stock: 12,
    tags: ["luxury", "handcrafted", "premium", "exclusive"],
    featured: true,
    newArrival: true,
    bestSeller: false,
    colors: [
      { name: "Gold", hex: "#FFD700" },
      { name: "Silver", hex: "#C0C0C0" },
    ],
    sizes: [
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: false },
    ],
  },
  {
    id: "7",
    slug: "lifestyle-essential",
    name: "Lifestyle Essential",
    description: "Perfect for everyday wear. The Lifestyle Essential combines comfort with versatility, making it ideal for work, leisure, and everything in between.",
    shortDescription: "Versatile everyday shoes",
    price: 139,
    salePrice: 109,
    rating: 4.5,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    ],
    category: "Lifestyle",
    brand: "LUXE",
    stock: 89,
    tags: ["lifestyle", "everyday", "versatile", "comfort"],
    featured: false,
    newArrival: false,
    bestSeller: true,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Beige", hex: "#F5F5DC" },
    ],
    sizes: [
      { name: "US 6", available: true },
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
    ],
  },
  {
    id: "8",
    slug: "speed-runner",
    name: "Speed Runner",
    description: "Designed for speed. The Speed Runner features lightweight construction, responsive cushioning, and aerodynamic design for maximum performance.",
    shortDescription: "Lightweight speed running shoes",
    price: 199,
    rating: 4.8,
    reviewCount: 654,
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    ],
    category: "Running",
    brand: "LUXE",
    stock: 41,
    tags: ["running", "speed", "lightweight", "performance"],
    featured: true,
    newArrival: true,
    bestSeller: false,
    colors: [
      { name: "Neon Yellow", hex: "#FFFF00" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
    ],
  },
  {
    id: "9",
    slug: "urban-street",
    name: "Urban Street",
    description: "Street-ready style meets premium comfort. The Urban Street collection features bold designs, durable materials, and all-day comfort for the modern urban explorer.",
    shortDescription: "Bold street-style shoes",
    price: 169,
    rating: 4.6,
    reviewCount: 478,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    ],
    category: "Casual",
    brand: "LUXE",
    stock: 73,
    tags: ["street", "urban", "bold", "casual"],
    featured: false,
    newArrival: true,
    bestSeller: false,
    colors: [
      { name: "Multi", hex: "#FF6B6B" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
    ],
  },
  {
    id: "10",
    slug: "court-master",
    name: "Court Master",
    description: "Master every court. The Court Master provides exceptional traction, stability, and comfort for tennis, basketball, and other court sports.",
    shortDescription: "Multi-court performance shoes",
    price: 189,
    rating: 4.7,
    reviewCount: 389,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    ],
    category: "Basketball",
    brand: "LUXE",
    stock: 36,
    tags: ["basketball", "tennis", "court", "multi-sport"],
    featured: false,
    newArrival: false,
    bestSeller: false,
    colors: [
      { name: "White/Green", hex: "#FFFFFF" },
      { name: "Black/Orange", hex: "#000000" },
    ],
    sizes: [
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
      { name: "US 12", available: true },
    ],
  },
  {
    id: "11",
    slug: "cross-trainer",
    name: "Cross Trainer",
    description: "One shoe, every workout. The Cross Trainer is designed for versatility, providing support and comfort for running, lifting, and everything in between.",
    shortDescription: "Versatile cross-training shoes",
    price: 159,
    rating: 4.5,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80",
    ],
    category: "Training",
    brand: "LUXE",
    stock: 58,
    tags: ["training", "cross-fit", "versatile", "gym"],
    featured: false,
    newArrival: false,
    bestSeller: false,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#6B7280" },
      { name: "Blue", hex: "#3B82F6" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
    ],
  },
  {
    id: "12",
    slug: "minimalist-pro",
    name: "Minimalist Pro",
    description: "Less is more. The Minimalist Pro features a sleek, streamlined design with premium materials and exceptional comfort for the modern minimalist.",
    shortDescription: "Sleek minimalist design",
    price: 179,
    rating: 4.8,
    reviewCount: 423,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    ],
    category: "Lifestyle",
    brand: "LUXE",
    stock: 44,
    tags: ["minimalist", "sleek", "modern", "lifestyle"],
    featured: true,
    newArrival: true,
    bestSeller: false,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#9CA3AF" },
    ],
    sizes: [
      { name: "US 7", available: true },
      { name: "US 8", available: true },
      { name: "US 9", available: true },
      { name: "US 10", available: true },
      { name: "US 11", available: true },
    ],
  },
];

export const reviews: ProductReview[] = [
  {
    id: "1",
    productId: "1",
    customerName: "Sarah Johnson",
    rating: 5,
    title: "Best running shoes I've ever owned",
    content: "Absolutely love these shoes! The cushioning is incredible and they look amazing. I've been using them for my daily runs and they've exceeded my expectations.",
    date: "2024-01-15",
    verified: true,
    helpful: 42,
  },
  {
    id: "2",
    productId: "1",
    customerName: "Michael Chen",
    rating: 5,
    title: "Premium quality",
    content: "The quality is outstanding. You can tell these are made with premium materials. Very comfortable for long walks and runs.",
    date: "2024-01-10",
    verified: true,
    helpful: 28,
  },
  {
    id: "3",
    productId: "1",
    customerName: "Emily Davis",
    rating: 4,
    title: "Great shoes, runs slightly small",
    content: "Beautiful shoes and very comfortable. I recommend ordering a half size up as they run slightly small. Otherwise perfect!",
    date: "2024-01-05",
    verified: true,
    helpful: 15,
  },
  {
    id: "4",
    productId: "6",
    customerName: "James Wilson",
    rating: 5,
    title: "Worth every penny",
    content: "These are truly luxury shoes. The craftsmanship is impeccable and they feel amazing on. Perfect for special occasions or when you want to treat yourself.",
    date: "2024-01-12",
    verified: true,
    helpful: 67,
  },
  {
    id: "5",
    productId: "6",
    customerName: "Amanda Lee",
    rating: 5,
    title: "Exquisite design",
    content: "The attention to detail is remarkable. These shoes are a work of art. I've received so many compliments whenever I wear them.",
    date: "2024-01-08",
    verified: true,
    helpful: 34,
  },
];

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return [];
  
  return allProducts
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

export function getReviewsByProductId(productId: string): ProductReview[] {
  return reviews.filter((review) => review.productId === productId);
}
