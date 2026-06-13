import { Sparkles, Tag, TrendingUp } from "lucide-react";
import { Product } from "../types";

interface ProductBadgeProps {
  product: Product;
  className?: string;
}

export default function ProductBadge({ product, className = "" }: ProductBadgeProps) {
  if (!product.featured && !product.newArrival && !product.bestSeller && !product.salePrice) {
    return null;
  }

  const getBadge = () => {
    if (product.newArrival) {
      return {
        text: "New Arrival",
        icon: Sparkles,
        className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
      };
    }
    if (product.bestSeller) {
      return {
        text: "Best Seller",
        icon: TrendingUp,
        className: "bg-gradient-to-r from-black to-gray-800 text-white",
      };
    }
    if (product.salePrice) {
      const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
      return {
        text: `${discount}% OFF`,
        icon: Tag,
        className: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
      };
    }
    if (product.featured) {
      return {
        text: "Featured",
        icon: Sparkles,
        className: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white",
      };
    }
  };

  const badge = getBadge();
  if (!badge) return null;

  const Icon = badge.icon;

  return (
    <div className={`absolute top-4 left-4 z-10 ${badge.className} ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg">
        <Icon size={14} />
        <span>{badge.text}</span>
      </div>
    </div>
  );
}
