"use client";

interface ProductBadgeProps {
  type?: "new" | "sale" | "bestseller" | "limited";
  text?: string;
  className?: string;
}

const badgeConfig = {
  new: {
    className: "bg-green-600 text-white",
    defaultText: "NEW",
  },
  sale: {
    className: "bg-red-600 text-white",
    defaultText: "SALE",
  },
  bestseller: {
    className: "bg-purple-600 text-white",
    defaultText: "BESTSELLER",
  },
  limited: {
    className: "bg-orange-600 text-white",
    defaultText: "LIMITED",
  },
};

export default function ProductBadge({
  type = "new",
  text,
  className = "",
}: ProductBadgeProps) {
  const config = badgeConfig[type];
  const badgeText = text || config.defaultText;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${config.className} ${className}`}>
      {badgeText}
    </span>
  );
}
