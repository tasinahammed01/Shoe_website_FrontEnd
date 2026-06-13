import { WishlistItem } from "@/features/wishlist/types/wishlist.types";
import { mockProducts } from "./products";

export const mockWishlistItems: WishlistItem[] = [
  {
    id: "3",
    productId: "3",
    product: mockProducts[2],
    addedAt: new Date().toISOString(),
  },
  {
    id: "4",
    productId: "4",
    product: mockProducts[3],
    addedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "5",
    productId: "5",
    product: mockProducts[4],
    addedAt: new Date(Date.now() - 259200000).toISOString(),
  },
];
