"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Grid3x3, List, SlidersHorizontal, Clock, TrendingUp, X, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ecommerce/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Container from "@/components/layout/Container";
import { getProducts } from "@/features/products/data/products";
import { Product } from "@/features/products/types/index";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Nike Air Max", "Running shoes", "Black sneakers"]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const trendingSearches = ["Running Shoes", "Summer Collection", "New Arrivals", "Best Sellers"];

  useEffect(() => {
    async function fetchData() {
      try {
        const allProds = await getProducts();
        setAllProducts(allProds);
        setProducts(allProds);
        
        // Get unique categories and their counts
        const categoryMap = new Map<string, number>();
        allProds.forEach(product => {
          const count = categoryMap.get(product.category) || 0;
          categoryMap.set(product.category, count + 1);
        });
        
        const categoryCounts = Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
        setCategories(categoryCounts);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    function performSearch() {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          const queryLower = searchQuery.toLowerCase();
          const results = allProducts.filter(product =>
            product.name.toLowerCase().includes(queryLower) ||
            product.description.toLowerCase().includes(queryLower) ||
            product.category.toLowerCase().includes(queryLower) ||
            product.tags.some(tag => tag.toLowerCase().includes(queryLower))
          );
          setProducts(results);
        } catch (error) {
          console.error('Error searching products:', error);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts(allProducts);
      }
    }
    performSearch();
  }, [searchQuery, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setRecentSearches((prev) => {
        const newSearches = [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 5);
        return newSearches;
      });
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(search)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <Container>
          <div className="py-6">
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
              <Input
                icon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for shoes, brands, categories..."
                className="text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </form>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          {isInitialLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : !searchQuery ? (
            <div className="max-w-4xl mx-auto">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Clock size={18} />
                      Recent Searches
                    </h2>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleRecentSearchClick(search)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        {search}
                        <ArrowRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} />
                  Trending Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleRecentSearchClick(search)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Shortcuts */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleRecentSearchClick(category.name)}
                      className="p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
                    >
                      <div className="font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500">{category.count} products</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Products */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Search results for "{searchQuery}"
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    {products.length} {products.length === 1 ? "result" : "results"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal size={18} className="mr-2" />
                    Filters
                  </Button>

                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"
                      }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-gray-200 h-96 animate-pulse"
                    />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="No results found"
                  description={`We couldn't find any products matching "${searchQuery}"`}
                  action={{
                    label: "Browse all products",
                    onClick: () => window.location.href = "/shop",
                  }}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
