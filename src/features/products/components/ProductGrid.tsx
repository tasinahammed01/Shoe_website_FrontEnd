import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
  className?: string;
}

export default function ProductGrid({ products, viewMode = "grid", className = "" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`text-center py-20 ${className}`}>
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  const gridClasses = viewMode === "grid"
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    : "grid grid-cols-1 gap-4";

  return (
    <div className={`${gridClasses} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
