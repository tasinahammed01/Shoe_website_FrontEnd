import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, CartItem } from "../types/cart.types";
import { Product, ProductColor } from "@/features/products/types";

const generateCartItemId = (
  productId: string,
  colorName: string,
  size: string
): string => {
  return `${productId}-${colorName}-${size}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, color: ProductColor, size: string, quantity = 1) => {
        const itemId = generateCartItemId(product.id, color.name, size);
        const existingItem = get().items.find((item) => item.id === itemId);

        // Stock validation
        const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;
        if (newQuantity > product.stock) {
          console.warn(`Requested quantity (${newQuantity}) exceeds available stock (${product.stock})`);
          return;
        }

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...get().items, newItem] });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const item = get().getItemById(itemId);
        if (item && quantity > item.product.stock) {
          console.warn(`Requested quantity (${quantity}) exceeds available stock (${item.product.stock})`);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: (open?: boolean) => {
        set({ isOpen: open !== undefined ? open : !get().isOpen });
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        // Add tax, shipping, etc. here if needed
        return subtotal;
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemById: (itemId: string) => {
        return get().items.find((item) => item.id === itemId);
      },

      isInCart: (productId: string, color: string, size: string) => {
        const itemId = generateCartItemId(productId, color, size);
        return get().items.some((item) => item.id === itemId);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
