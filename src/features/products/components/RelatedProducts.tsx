import { Product } from "../types";
import ProductCard from "@/components/ecommerce/ProductCard";
import ProductGrid from "@/components/ecommerce/ProductGrid";

interface RelatedProductsProps {
  products: Product[];
  className?: string;
}

export default function RelatedProducts({ products, className = "" }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
      <ProductGrid products={products} />
    </div>
  );
}
