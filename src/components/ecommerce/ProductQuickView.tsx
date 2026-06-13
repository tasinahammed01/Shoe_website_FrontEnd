"use client";

import Modal from "@/components/ui/Modal";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import { Product } from "@/features/products/types";

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function ProductQuickView({ isOpen, onClose, product }: ProductQuickViewProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <ProductImage images={product.images} alt={product.name} />

        {/* Product Info & Actions */}
        <div className="flex flex-col justify-center">
          <ProductInfo product={product} />
          <ProductActions
            onAddToCart={(quantity) => {
              // TODO: Implement add to cart functionality
              onClose();
            }}
            onWishlistToggle={() => {
              // TODO: Implement wishlist toggle functionality
            }}
            onShare={() => {
              // TODO: Implement share functionality
            }}
            isWishlisted={false}
            stock={product.stock}
          />
        </div>
      </div>
    </Modal>
  );
}
