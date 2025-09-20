import { CartItem } from '@/types';

// API request/response types
export interface CheckoutRequest {
  checkoutMode: 'login' | 'guest';
  email?: string;
  shipping: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    state: string;
  };
  payment_method: string;
  cart: {
    items: CartItem[];
    subtotal: number;
    discounts: {
      bogofDiscount: number;
      bulkDiscount: number;
    };
    totalDiscount: number;
    totalPrice: number;
  };
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  message: string;
}

// Order types
export interface Order {
  id: string;
  userId?: string;
  checkoutMode: 'login' | 'guest';
  shipping: CheckoutRequest['shipping'];
  payment: {
    cardNumber: string; // this would be tokenized
    expiryDate: string;
    cvc: string; // this would be tokenized
  };
  cart: CheckoutRequest['cart'];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Form validation error type
export interface FormValidationError {
  field: string;
  message: string;
}
