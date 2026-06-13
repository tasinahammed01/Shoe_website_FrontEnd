"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Star, X, Tag } from "lucide-react";
import { useShopFilters } from "@/store/shopFilters";
import { ProductCategory } from "@/features/products/types";

const categories: (ProductCategory | "all")[] = [
  "all",
  "Running",
  "Lifestyle",
  "Basketball",
  "Training",
  "Casual",
  "Luxury",
];

const ratingOptions = [
  { value: 5, label: "5 stars" },
  { value: 4, label: "4 stars & up" },
  { value: 3, label: "3 stars & up" },
  { value: 2, label: "2 stars & up" },
];

const colorOptions = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#6B7280" },
  { name: "Red", hex: "#EF4444" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Green", hex: "#10B981" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Pink", hex: "#EC4899" },
];

const tagOptions = [
  "New Arrival",
  "Best Seller",
  "Limited Edition",
  "Discount",
  "Premium",
  "Exclusive",
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-sm uppercase tracking-wider text-gray-900">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSidebar() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedRating,
    setSelectedRating,
    selectedColors,
    setSelectedColors,
    selectedTags,
    setSelectedTags,
    resetFilters,
    hasActiveFilters,
  } = useShopFilters();

  const handleColorToggle = (colorName: string) => {
    setSelectedColors(
      selectedColors.includes(colorName)
        ? selectedColors.filter((c) => c !== colorName)
        : [...selectedColors, colorName]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...selectedPriceRange] as [number, number];
    newRange[index] = value;
    setSelectedPriceRange(newRange);
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Filters</h2>
          {hasActiveFilters() && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
            >
              <X size={14} />
              Clear All
            </motion.button>
          )}
        </div>

        {/* Categories */}
        <FilterSection title="Categories" defaultOpen>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedCategory === category
                        ? "border-black bg-black"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {selectedCategory === category && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full rounded-full bg-black"
                      />
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm ${
                    selectedCategory === category
                      ? "font-semibold text-black"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Min</label>
                <input
                  type="number"
                  min="0"
                  max={selectedPriceRange[1]}
                  value={selectedPriceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 border border-transparent focus:border-gray-200"
                />
              </div>
              <span className="text-gray-400 mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                <input
                  type="number"
                  min={selectedPriceRange[0]}
                  max="500"
                  value={selectedPriceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 border border-transparent focus:border-gray-200"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={selectedPriceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>
        </FilterSection>

        {/* Ratings */}
        <FilterSection title="Ratings">
          <div className="space-y-2">
            {ratingOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={selectedRating === option.value}
                    onChange={() => setSelectedRating(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedRating === option.value
                        ? "border-black bg-black"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {selectedRating === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full rounded-full bg-black"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < option.value
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection title="Colors">
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.name)
                    ? "border-black scale-110 shadow-lg"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              >
                {selectedColors.includes(color.name) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Tags */}
        <FilterSection title="Tags">
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </FilterSection>

        {/* Special Offer Card */}
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-lg" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={16} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                Special Offer
              </span>
            </div>
            <h3 className="font-bold mb-1">Summer Sale</h3>
            <p className="text-sm text-gray-300 mb-3">Up to 40% off on selected items</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </div>
    </aside>
  );
}
