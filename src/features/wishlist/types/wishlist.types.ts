import { Product } from "@/features/products/types";

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
}

export interface WishlistActions {
  addItem: (product: Product) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  toggleWishlist: (open?: boolean) => void;
  getItemCount: () => number;
  isInWishlist: (productId: string) => boolean;
  getItemById: (itemId: string) => WishlistItem | undefined;
  moveToCart: (itemId: string) => void;
}

export type WishlistStore = WishlistState & WishlistActions;
