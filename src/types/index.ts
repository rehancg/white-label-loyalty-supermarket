// Common types for the application
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  isBogof: boolean;
  currency: string;
  currencySymbol: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export type ProductsResponse = ApiResponse<Product[]>;
