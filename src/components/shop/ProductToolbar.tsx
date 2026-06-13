"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Grid3x3, List, ChevronDown, Filter } from "lucide-react";
import { useShopFilters } from "@/store/shopFilters";
import { SortOption } from "@/features/products/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

interface ProductToolbarProps {
  productCount: number;
  totalProducts?: number;
}

export default function ProductToolbar({ productCount, totalProducts }: ProductToolbarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedSort,
    setSelectedSort,
    viewMode,
    setViewMode,
    setFilterDrawerOpen,
  } = useShopFilters();
  const [isSortOpen, setIsSortOpen] = useState(false);

  const selectedSortLabel = sortOptions.find((opt) => opt.value === selectedSort)?.label || "Sort by";

  return (
    <div className="bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all border border-transparent focus:border-gray-200"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto justify-between lg:justify-end">
            {/* Mobile Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl font-medium"
            >
              <Filter size={18} />
              <span>Filters</span>
            </motion.button>

            {/* Sort Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl font-medium min-w-[160px] justify-between"
                aria-expanded={isSortOpen}
              >
                <span className="text-sm">{selectedSortLabel}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              {/* Dropdown Menu */}
              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10 lg:hidden"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedSort(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 ${
                          selectedSort === option.value
                            ? "bg-gray-50 font-semibold text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === "grid"
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === "list"
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Product Count */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {productCount} of {totalProducts || productCount}{" "}
          {productCount === 1 ? "product" : "products"}
        </div>
      </div>
    </div>
  );
}
