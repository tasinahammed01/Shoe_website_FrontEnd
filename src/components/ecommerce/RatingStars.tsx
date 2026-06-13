"use client";

import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showCount?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = 16,
  showCount = false,
  reviewCount,
  className = "",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} size={size} className="text-gray-300" />
        ))}
      </div>
      {showCount && reviewCount && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
}
