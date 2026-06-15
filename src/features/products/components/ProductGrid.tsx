import { Product } from "../types";
import ProductCard from "@/components/ecommerce/ProductCard";

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
  className = "" 
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`text-center py-20 ${className}`}>
        <p className="text-zinc-500 text-lg">No products found</p>
      </div>
    );
  }

  const gridClasses = viewMode === "grid"
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    : "grid grid-cols-1 gap-4";

  return (
    <div className={`${gridClasses} ${className}`}>
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
