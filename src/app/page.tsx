import ProductGrid from "@/components/ecommerce/ProductGrid";
import ShopHero from "@/components/shop/ShopHero";
import TrustIndicators from "@/components/shop/TrustIndicators";
import FeaturedCategories from "@/components/shop/FeaturedCategories";
import NewArrivals from "@/components/shop/NewArrivals";
import CustomerReviews from "@/components/shop/CustomerReviews";
import Newsletter from "@/components/shop/Newsletter";
import { getFeaturedProducts, getBestSellers } from "@/features/products/data/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const bestSellers = await getBestSellers();

  return (
    <div>
      {/* Hero Section */}
      <ShopHero />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Best
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {" "}Sellers
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">Most loved by our customers</p>
            </div>
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {/* New Arrivals */}
      <NewArrivals />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
