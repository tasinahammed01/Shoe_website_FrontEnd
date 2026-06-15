import { Metadata } from "next";
import { getNewArrivals } from "@/features/products/data/products";
import NewArrivalsContent from "./NewArrivalsContent";

export const metadata: Metadata = {
  title: "New Arrivals - LUXE Premium Footwear",
  description: "Be the first to experience our latest collection. Fresh drops, new styles, and trending footwear just arrived.",
  keywords: "new arrivals, fresh drops, latest shoes, new collection, trending footwear",
  openGraph: {
    title: "New Arrivals - LUXE Premium Footwear",
    description: "Be the first to experience our latest collection. Fresh drops, new styles, and trending footwear just arrived.",
    type: "website",
  },
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return <NewArrivalsContent products={products} />;
}
