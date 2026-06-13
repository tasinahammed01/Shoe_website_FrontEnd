"use client";

interface StockStatusBadgeProps {
  stock: number;
  lowStockThreshold?: number;
  className?: string;
}

export default function StockStatusBadge({
  stock,
  lowStockThreshold = 5,
  className = "",
}: StockStatusBadgeProps) {
  if (stock === 0) {
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 ${className}`}>
        Out of Stock
      </span>
    );
  }

  if (stock <= lowStockThreshold) {
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 ${className}`}>
        Only {stock} left
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 ${className}`}>
      In Stock
    </span>
  );
}
