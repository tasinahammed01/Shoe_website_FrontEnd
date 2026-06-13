import ProductGrid from "@/components/ecommerce/ProductGrid";
import ShopHero from "@/components/shop/ShopHero";
import TrustIndicators from "@/components/shop/TrustIndicators";
import { products } from "@/features/products/data/products";

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured);
  const newArrivals = products.filter(p => p.newArrival);
  const bestSellers = products.filter(p => p.bestSeller);

  return (
    <div>
      {/* Hero Section */}
      <ShopHero />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked premium items for you</p>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">Fresh styles just landed</p>
          </div>
          <ProductGrid products={newArrivals} />
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Most loved by our customers</p>
          </div>
          <ProductGrid products={bestSellers} />
        </section>
      )}
    </div>
  );
}
