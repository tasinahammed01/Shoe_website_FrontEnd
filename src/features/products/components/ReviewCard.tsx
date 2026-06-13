import { Star, CheckCircle } from "lucide-react";
import { ProductReview } from "../types";
import ProductRating from "./ProductRating";

interface ReviewCardProps {
  review: ProductReview;
  className?: string;
}

export default function ReviewCard({ review, className = "" }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-500 font-semibold">
              {review.customerName[0]}
            </span>
          </div>
          <div>
            <p className="font-semibold">{review.customerName}</p>
            {review.verified && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle size={12} />
                <span>Verified Purchase</span>
              </div>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
      </div>

      {/* Rating */}
      <ProductRating rating={review.rating} showCount={false} size="sm" className="mb-3" />

      {/* Title */}
      <h4 className="font-semibold mb-2">{review.title}</h4>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed mb-4">{review.content}</p>

      {/* Helpful */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button className="hover:text-gray-700 transition-colors">
          Helpful ({review.helpful})
        </button>
        <button className="hover:text-gray-700 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}
