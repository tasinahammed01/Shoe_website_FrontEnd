"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Home,
  ShoppingBag,
  Grid3x3,
  Sparkles,
  TrendingUp,
  Tag,
  MessageCircle,
  ChevronRight,
  Package,
  MapPin,
  Clock,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import Container from "@/components/shared/container/container";

const links = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Shop", icon: ShoppingBag, href: "/shop" },
  { label: "Offers", icon: Tag, href: "/offers" },
  { label: "Contact", icon: MessageCircle, href: "/contact" },
];

const quickActions = [
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
  { label: "Orders", icon: Package, href: "/dashboard/orders" },
  { label: "Track Order", icon: MapPin, href: "/dashboard/orders" },
  { label: "Recently Viewed", icon: Clock, href: "/dashboard" },
];

const trustBadges = [
  { label: "Secure Checkout", icon: Shield },
  { label: "Free Shipping", icon: Truck },
  { label: "Easy Returns", icon: RotateCcw },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(2);

  const recentSearches = ["Nike Air Max", "Running shoes", "Black sneakers"];
  const trendingSearches = ["Running Shoes", "Summer Collection", "New Arrivals", "Best Sellers"];
  const categories = [
    { name: "Running", count: 245 },
    { name: "Basketball", count: 189 },
    { name: "Casual", count: 312 },
    { name: "Training", count: 156 },
    { name: "Luxury", count: 78 },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 shadow-2xl shadow-black/10 border border-white/30"
            : "bg-white/95 backdrop-blur-md border-b border-gray-100"
        }`}
      >
        <Container className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            LUXE
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {links.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-black/60 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} className="text-gray-700" />
            </motion.button>

            <Link href="/wishlist">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full hover:bg-black/5 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} className="text-gray-700" />
              </motion.button>
            </Link>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full hover:bg-black/5 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute -top-1 -right-1 text-[10px] font-semibold bg-gradient-to-r from-black to-gray-700 text-white px-1.5 py-0.5 rounded-full shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full hover:bg-black/5 transition-colors hidden sm:block"
                aria-label="Profile"
              >
                <User size={20} className="text-gray-700" />
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-700" />
            </motion.button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 md:hidden overflow-y-auto shadow-2xl shadow-black/20"
            >
              {/* Menu Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-10">
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent"
                    >
                      LUXE
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm text-gray-500 mt-1"
                    >
                      Premium Footwear
                    </motion.p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="p-3 rounded-full hover:bg-black/5 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} className="text-gray-700" />
                  </motion.button>
                </div>

                {/* User Greeting */}
                <div className="px-6 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200"
                  >
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Welcome Back
                    </p>
                    <p className="text-xl font-semibold text-gray-900 mb-3">
                      Hello, Tanjid
                    </p>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Sign In
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-white text-black border border-gray-300 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Register
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="px-6 py-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all border border-transparent focus:border-gray-200"
                  />
                </motion.div>
              </div>

              {/* Menu Links */}
              <div className="px-6 pb-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2"
                >
                  {links.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                        >
                          <div className="p-2.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-black group-hover:to-gray-700 transition-all">
                            <Icon size={20} className="text-gray-700 group-hover:text-white transition-colors" />
                          </div>
                          <span className="flex-1 font-medium text-gray-900">{link.label}</span>
                          <ChevronRight size={18} className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                        </motion.div>
                      </Link>
                    );
                  })}
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="px-6 pb-5">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
                >
                  Quick Actions
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.label}
                        href={action.href}
                        onClick={() => setOpen(false)}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all border border-gray-100"
                        >
                          <Icon size={22} className="text-gray-700" />
                          <span className="text-xs font-medium text-gray-700">{action.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </motion.div>
              </div>

              {/* Promotional Card */}
              <div className="px-6 pb-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black via-gray-800 to-gray-900 p-6 text-white"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                  <div className="relative">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Special Offer
                    </p>
                    <h3 className="text-2xl font-bold mb-1">Summer Collection</h3>
                    <p className="text-white/80 text-sm mb-4">Up to 40% OFF</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Shop Now
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Trust Badges */}
              <div className="px-6 pb-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.95 }}
                  className="flex justify-around pt-4 border-t border-gray-100"
                >
                  {trustBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="p-2.5 rounded-xl bg-gray-50">
                          <Icon size={20} className="text-gray-700" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 text-center">
                          {badge.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 bg-white z-50 shadow-2xl"
            >
              <Container className="py-6">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    aria-label="Close search"
                  >
                    <X size={24} className="text-gray-700" />
                  </motion.button>
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for shoes, brands, categories..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all border border-transparent focus:border-gray-200"
                      autoFocus
                    />
                  </div>
                </div>

                {!searchQuery && (
                  <div className="mt-8">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Clock size={16} />
                          Recent Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search) => (
                            <Link
                              key={search}
                              href={`/search?q=${encodeURIComponent(search)}`}
                              onClick={() => setSearchOpen(false)}
                              className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              {search}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search) => (
                          <Link
                            key={search}
                            href={`/search?q=${encodeURIComponent(search)}`}
                            onClick={() => setSearchOpen(false)}
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            {search}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Browse by Category
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={`/search?q=${encodeURIComponent(category.name)}`}
                            onClick={() => setSearchOpen(false)}
                            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-center border border-gray-100"
                          >
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">{category.count} products</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}