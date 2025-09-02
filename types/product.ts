// types/product.ts
export interface Product {
  id: string | number; // This accepts both string and number
  title: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  rating?: number;
  // Note: quantity is NOT included here since it's added dynamically
}