"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, TrendingUp } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    title: "Best running shoes I've ever owned",
    content: "Absolutely love these shoes! The cushioning is incredible and they look amazing. I've been using them for my daily runs and they've exceeded my expectations.",
    verified: true,
    date: "2 weeks ago",
    product: "Air Max Premium",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    rating: 5,
    title: "Premium quality worth every penny",
    content: "The quality is outstanding. You can tell these are made with premium materials. Very comfortable for long walks and runs. Highly recommend!",
    verified: true,
    date: "1 month ago",
    product: "Ultra Boost Elite",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "ED",
    rating: 5,
    title: "Exquisite design and comfort",
    content: "Beautiful shoes and very comfortable. The attention to detail is remarkable. I've received so many compliments whenever I wear them.",
    verified: true,
    date: "3 weeks ago",
    product: "Luxury Collection",
  },
];

const stats = [
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "12K+", label: "Total Reviews", icon: TrendingUp },
  { value: "98%", label: "Satisfaction", icon: CheckCircle2 },
];

export default function CustomerReviews() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-4 sm:mb-6">
            <Star size={14} className="text-yellow-600 fill-yellow-600 sm:block hidden" />
            <Star size={12} className="text-yellow-600 fill-yellow-600 block sm:hidden" />
            <span className="text-xs sm:text-sm font-semibold text-yellow-700">Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {" "}Customers Say
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 text-center shadow-lg shadow-black/5 border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon size={20} className="text-white sm:block hidden" />
                  <Icon size={18} className="text-white block sm:hidden" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1.5 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Quote size={18} className="text-purple-600 sm:block hidden" />
                <Quote size={16} className="text-purple-600 block sm:hidden" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              {/* Review Content */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{review.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 line-clamp-4">{review.content}</p>

              {/* Reviewer Info */}
              <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-sm sm:font-semibold text-gray-900">{review.name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">{review.date}</div>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-green-100 rounded-full">
                    <CheckCircle2 size={10} className="text-green-600 sm:block hidden" />
                    <CheckCircle2 size={8} className="text-green-600 block sm:hidden" />
                    <span className="text-[10px] sm:text-xs font-semibold text-green-700">Verified</span>
                  </div>
                )}
              </div>

              {/* Product */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="text-[10px] sm:text-xs text-gray-500">Purchased: {review.product}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl font-semibold shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
          >
            View All Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
