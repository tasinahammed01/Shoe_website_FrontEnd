export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPriceCompact(price: number): string {
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(1)}k`;
  }
  return `$${price.toFixed(0)}`;
}

export function formatPriceWithCents(price: number): string {
  return formatPrice(price);
}

export function formatPriceWithoutCents(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDiscount(percentage: number): string {
  return `${percentage}%`;
}

export function formatSavings(amount: number): string {
  return `Save ${formatPrice(amount)}`;
}

export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function parsePriceString(priceString: string): number {
  const cleaned = priceString.replace(/[^0-9.-]+/g, "");
  return parseFloat(cleaned) || 0;
}
