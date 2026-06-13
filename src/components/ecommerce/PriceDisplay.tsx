"use client";

interface PriceDisplayProps {
  price: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export default function PriceDisplay({
  price,
  salePrice,
  size = "md",
  showSavings = false,
  className = "",
}: PriceDisplayProps) {
  const currentPrice = salePrice || price;
  const isOnSale = salePrice && salePrice < price;
  const savings = isOnSale ? price - salePrice : 0;
  const savingsPercentage = isOnSale ? Math.round((savings / price) * 100) : 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-bold text-gray-900 ${sizeClasses[size]}`}>
        ${currentPrice}
      </span>
      {isOnSale && (
        <>
          <span className={`font-medium text-gray-400 line-through ${sizeClasses[size]}`}>
            ${price}
          </span>
          {showSavings && (
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
              Save {savingsPercentage}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
