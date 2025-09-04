// types/product.ts
export interface Product {
  id: string | number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  rating?: number | { rate: number; count: number }; // Allow both formats
}