import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistStore, WishlistItem } from "../types/wishlist.types";
import { Product } from "@/features/products/types";

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product) => {
        const existingItem = get().items.find(
          (item) => item.productId === product.id
        );

        if (!existingItem) {
          const newItem: WishlistItem = {
            id: product.id,
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...get().items, newItem] });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id === itemId) });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      toggleWishlist: (open?: boolean) => {
        set({ isOpen: open !== undefined ? open : !get().isOpen });
      },

      getItemCount: () => {
        return get().items.length;
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.productId === productId);
      },

      getItemById: (itemId: string) => {
        return get().items.find((item) => item.id === itemId);
      },

      moveToCart: (itemId: string) => {
        const item = get().getItemById(itemId);
        if (item) {
          // Import cart store dynamically to avoid circular dependency
          const { useCartStore } = require("@/features/cart/store/cart-store");
          const cartStore = useCartStore.getState();
          
          // Add default first color and size
          const defaultColor = item.product.colors[0];
          const defaultSize = item.product.sizes.find((s) => s.available)?.name || item.product.sizes[0]?.name;
          
          if (defaultColor && defaultSize) {
            cartStore.addItem(item.product, defaultColor, defaultSize, 1);
          }
          
          // Remove from wishlist after moving to cart
          get().removeItem(itemId);
        }
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
