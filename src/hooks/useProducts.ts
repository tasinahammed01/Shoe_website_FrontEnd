import { useState, useEffect } from "react";
import { products } from "@/features/products/data/products";
import { Product } from "@/features/products/types";

export function useProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProductsData(products);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    products: productsData,
    isLoading,
  };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProduct(products.find((p) => p.slug === slug));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  return {
    product,
    isLoading,
  };
}
