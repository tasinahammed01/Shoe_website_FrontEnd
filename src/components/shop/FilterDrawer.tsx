"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import { useShopFilters } from "@/store/shopFilters";
import FilterSidebar from "./FilterSidebar";

export default function FilterDrawer() {
  const { isFilterDrawerOpen, setFilterDrawerOpen, hasActiveFilters } = useShopFilters();

  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterDrawerOpen]);

  return (
    <>
      {/* Floating Filter Button - Mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setFilterDrawerOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 bg-black text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-medium"
      >
        <Filter size={18} />
        <span>Filters</span>
        {hasActiveFilters() && (
          <span className="ml-1 w-2 h-2 bg-yellow-400 rounded-full" />
        )}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setFilterDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 lg:hidden overflow-y-auto shadow-2xl shadow-black/20"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-10">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black rounded-xl">
                    <Filter size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Filters</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-3 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Close filters"
                >
                  <X size={24} className="text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-6">
              <FilterSidebar />
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 p-6 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterDrawerOpen(false)}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Apply Filters
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  useShopFilters.getState().resetFilters();
                  setFilterDrawerOpen(false);
                }}
                className="w-full bg-gray-100 text-black py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear All
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
