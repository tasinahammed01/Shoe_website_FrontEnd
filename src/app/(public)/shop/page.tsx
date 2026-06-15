"use client";

import { useMemo, useState, useEffect } from "react";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { getProducts } from "@/features/products/data/products";
import { useShopFilters } from "@/store/shopFilters";
import ShopHero from "@/components/shop/ShopHero";
import FilterSidebar from "@/components/shop/FilterSidebar";
import FilterDrawer from "@/components/shop/FilterDrawer";
import ProductToolbar from "@/components/shop/ProductToolbar";
import Pagination from "@/components/shop/Pagination";
import TrustIndicators from "@/components/shop/TrustIndicators";
import { Product } from "@/features/products/types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    searchQuery,
    selectedCategory,
    selectedSort,
    selectedPriceRange,
    selectedRating,
    selectedColors,
    selectedTags,
    viewMode,
    currentPage,
    itemsPerPage,
  } = useShopFilters();

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const productsData = await getProducts();
        console.log('Fetched products:', productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsData();
  }, []);



  // Filter products

  const filteredProducts = useMemo(() => {

    const filtered = products.filter((product) => {

      // Category filter

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

      

      // Search filter

      const matchesSearch =

        searchQuery === "" ||

        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      

      // Price range filter

      const price = product.salePrice || product.price;

      const matchesPrice = price >= selectedPriceRange[0] && price <= selectedPriceRange[1];

      

      // Rating filter

      const matchesRating = selectedRating === null || product.rating >= selectedRating;

      

      // Color filter

      const matchesColors =

        selectedColors.length === 0 ||

        product.colors.some((color) => selectedColors.includes(color.name));

      

      // Tag filter

      const matchesTags =

        selectedTags.length === 0 ||

        selectedTags.some((tag) => product.tags.includes(tag.toLowerCase()));

      

      return (

        matchesCategory &&

        matchesSearch &&

        matchesPrice &&

        matchesRating &&

        matchesColors &&

        matchesTags

      );

    });

    console.log('Filtered products:', filtered.length);
    return filtered;

  }, [

    products,

    searchQuery,

    selectedCategory,

    selectedPriceRange,

    selectedRating,

    selectedColors,

    selectedTags,

  ]);



  // Sort products

  const sortedProducts = useMemo(() => {

    const productsToSort = [...filteredProducts];

    const sorted = productsToSort.sort((a, b) => {

      switch (selectedSort) {

        case "price-low-high":

          return (a.salePrice || a.price) - (b.salePrice || b.price);

        case "price-high-low":

          return (b.salePrice || b.price) - (a.salePrice || a.price);

        case "newest":

          return a.newArrival ? -1 : b.newArrival ? 1 : 0;

        case "best-selling":

          return a.bestSeller ? -1 : b.bestSeller ? 1 : 0;

        default:

          return a.featured ? -1 : b.featured ? 1 : 0;

      }

    });
    console.log('Sorted products:', sorted.length);
    return sorted;

  }, [filteredProducts, selectedSort]);



  // Pagination

  const paginatedProducts = useMemo(() => {

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginated = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    console.log('Paginated products:', paginated.length);
    return paginated;

  }, [sortedProducts, currentPage, itemsPerPage]);



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>

          <p className="text-gray-600">Loading products...</p>

        </div>

      </div>

    );

  }

  // Debug: Show if no products
  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-bold">No products found</p>
          <p className="text-gray-600">Check console for details</p>
        </div>
      </div>
    );
  }



  return (

    <main className="min-h-screen">

      {/* Shop Hero */}

      <ShopHero />



      {/* Main Content */}

      <div className="px-4 sm:px-6 lg:px-8 py-8">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Filter Sidebar - Desktop */}

            <div className="hidden lg:block">

              <FilterSidebar />

            </div>



            {/* Products Section */}

            <div className="flex-1">

              {/* Product Toolbar */}

              <ProductToolbar

                productCount={paginatedProducts.length}

                totalProducts={sortedProducts.length}

              />



              {/* Products Grid */}

              <div className="py-8">

                <ProductGrid products={paginatedProducts} viewMode={viewMode} />

              </div>



              {/* Pagination */}

              <Pagination totalItems={sortedProducts.length} />

            </div>

          </div>

        </div>

      </div>



      {/* Trust Indicators */}

      <TrustIndicators />



      {/* Mobile Filter Drawer */}

      <FilterDrawer />

    </main>

  );

}

