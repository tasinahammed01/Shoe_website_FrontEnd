"use client";

import { Product } from "@/features/products/types";
import PriceDisplay from "./PriceDisplay";
import RatingStars from "./RatingStars";
import StockStatusBadge from "./StockStatusBadge";

interface ProductInfoProps {
  product: Product;
  className?: string;
}

export default function ProductInfo({ product, className = "" }: ProductInfoProps) {
  const price = product.salePrice || product.price;
  const isOnSale = Boolean(product.salePrice && product.salePrice < product.price);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-500">{product.category}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <RatingStars rating={product.rating || 4.5} reviewCount={product.reviewCount} />
        <span className="text-sm text-gray-500">({product.reviewCount || 0} reviews)</span>
      </div>

      {/* Price */}
      <PriceDisplay
        price={product.price}
        salePrice={product.salePrice}
        size="lg"
        showSavings={isOnSale}
      />

      {/* Description */}
      <div className="prose prose-sm text-gray-600">
        <p>{product.description}</p>
      </div>

      {/* Stock Status */}
      <div>
        <StockStatusBadge stock={product.stock ?? 10} />
      </div>

      {/* Features */}
      {product.description && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      )}
    </div>
  );
}
