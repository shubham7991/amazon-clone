// types/cart.ts
export interface CartItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  price: number;
  rating?: number; // Make sure this is optional
  category?: string;
  quantity: number;
}