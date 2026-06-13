import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export default function ProductRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className = "",
}: ProductRatingProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size === "sm" ? 14 : size === "md" ? 16 : 20}
            className={`${
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            } ${sizeClasses[size]}`}
          />
        ))}
      </div>
      {showCount && reviewCount && (
        <span className={`${textSizeClasses[size]} text-gray-500`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
