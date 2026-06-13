import { CartItem } from "@/features/cart/types/cart.types";
import { mockProducts } from "./products";

export const mockCartItems: CartItem[] = [
  {
    id: "1-Black-9",
    productId: "1",
    product: mockProducts[0],
    quantity: 1,
    selectedColor: mockProducts[0].colors[0],
    selectedSize: "9",
    addedAt: new Date().toISOString(),
  },
  {
    id: "2-White-10",
    productId: "2",
    product: mockProducts[1],
    quantity: 2,
    selectedColor: mockProducts[1].colors[1],
    selectedSize: "10",
    addedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
