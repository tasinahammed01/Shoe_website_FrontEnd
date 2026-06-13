interface ProductPriceProps {
  price: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProductPrice({
  price,
  salePrice,
  size = "md",
  className = "",
}: ProductPriceProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const originalSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${sizeClasses[size]} font-bold`}>
        ${salePrice || price}
      </span>
      {salePrice && (
        <span
          className={`${originalSizeClasses[size]} text-gray-400 line-through`}
        >
          ${price}
        </span>
      )}
    </div>
  );
}
