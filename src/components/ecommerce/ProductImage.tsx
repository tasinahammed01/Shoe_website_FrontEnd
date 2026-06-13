"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface ProductImageProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ProductImage({ images, alt, className = "" }: ProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div
        className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={images[currentIndex]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-transform duration-300"
        />
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <ZoomIn size={18} className="text-gray-700" />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`
                relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200
                ${index === currentIndex ? "border-black" : "border-gray-200 hover:border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-black/20 flex-shrink-0
              `}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} - view ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[90vh] aspect-[4/5]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                className="object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                aria-label="Close zoom"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
