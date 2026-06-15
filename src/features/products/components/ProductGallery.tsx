"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  className?: string;
}

export default function ProductGallery({ images, className = "" }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            {images[currentIndex] && !imageError ? (
              <Image
                src={images[currentIndex]}
                alt={`Product image ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                onError={() => setImageError(true)}
                priority={currentIndex === 0}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400 text-2xl font-semibold">
                  Image not available
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Zoom"
        >
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all relative ${
                index === currentIndex
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              {image ? (
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">{index + 1}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
