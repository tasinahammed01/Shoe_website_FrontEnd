"use client";

import { Product } from "@/features/products/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
  showWishlist?: boolean;
  showAddToCart?: boolean;
  priority?: boolean;
  className?: string;
}

export default function ProductGrid({
  products,
  viewMode = "grid",
  showWishlist = true,
  showAddToCart = true,
  priority = false,
  className = "",
}: ProductGridProps) {
  const gridCols = viewMode === "grid"
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid-cols-1";

  return (
    <div className={`grid gap-4 sm:gap-6 ${gridCols} ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          showWishlist={showWishlist}
          showAddToCart={showAddToCart}
          priority={priority && index < 4}
        />
      ))}
    </div>
  );
}
