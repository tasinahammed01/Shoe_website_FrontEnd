import { Product, ProductColor, ProductSize } from "@/features/products/types";

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: string;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartActions {
  addItem: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getItemById: (itemId: string) => CartItem | undefined;
  isInCart: (productId: string, color: string, size: string) => boolean;
}

export type CartStore = CartState & CartActions;
