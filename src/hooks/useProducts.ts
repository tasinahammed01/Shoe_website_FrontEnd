import { useState, useEffect } from "react";
import { getProducts, getProductBySlug } from "@/features/products/data/products";
import { Product } from "@/features/products/types";

export function useProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProductsData(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    products: productsData,
    isLoading,
    error,
  };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data || undefined);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch product");
        setIsLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  return {
    product,
    isLoading,
    error,
  };
}
