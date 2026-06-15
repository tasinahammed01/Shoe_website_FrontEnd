import { Metadata } from "next";
import { getBestSellers } from "@/features/products/data/products";
import BestSellersContent from "./BestSellersContent";

export const metadata: Metadata = {
  title: "Best Sellers - LUXE Premium Footwear",
  description: "Discover our most loved footwear. Shop the best-selling shoes loved by customers worldwide. Premium quality, exceptional style.",
  keywords: "best sellers, popular shoes, trending footwear, customer favorites",
  openGraph: {
    title: "Best Sellers - LUXE Premium Footwear",
    description: "Discover our most loved footwear. Shop the best-selling shoes loved by customers worldwide.",
    type: "website",
  },
};

export default async function BestSellersPage() {
  const products = await getBestSellers();

  return <BestSellersContent products={products} />;
}
