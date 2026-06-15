import { Metadata } from "next";
import { getProductBySlug } from "@/features/products/data/products";
import ProductPageContent from "@/features/products/components/ProductPageContent";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: "Product Not Found - LUXE Premium Footwear",
    };
  }

  const price = product.salePrice || product.price;
  const isOnSale = product.salePrice && product.salePrice < product.price;

  return {
    title: `${product.name} - LUXE Premium Footwear`,
    description: product.shortDescription || product.description,
    keywords: `${product.brand}, ${product.name}, ${product.category}, premium footwear, luxury shoes`,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: product.images[0] ? [{ url: product.images[0], width: 1200, height: 630 }] : [],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPageContent slug={slug} />;
}

