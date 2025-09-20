import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discounts: {
    bogofDiscount: number;
    bulkDiscount: number;
  };
  totalDiscount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discounts: {
    bogofDiscount: 0,
    bulkDiscount: 0,
  },
  totalDiscount: 0,
  totalPrice: 0,
};

const calculateDiscounts = (items: CartItem[]) => {
  let bogofDiscount = 0;
  let bulkDiscount = 0;
  let subtotal = 0;
  let totalItems = 0;

  // Calculate subtotal and BOGOF discount
  items.forEach(item => {
    if (item.product.isBogof) {
      // BOGOF: Buy 1, Get 1 Free
      const freeItems = Math.floor(item.quantity / 2);
      
      // Customer pays for paid items, gets free items
      subtotal += (item.quantity * item.product.price);
      totalItems += item.quantity;
      
      // Calculate discount amount (value of free items)
      bogofDiscount += freeItems * item.product.price;
    } else {
      // Regular items - no BOGOF
      const itemTotal = item.product.price * item.quantity;
      subtotal += itemTotal;
      totalItems += item.quantity;
    }
  });

  // Bulk discount: 20% off if order exceeds £10
  if (subtotal > 10) {
    bulkDiscount = subtotal * 0.2;
  }

  const totalDiscount = bogofDiscount + bulkDiscount;
  const totalPrice = subtotal - totalDiscount;

  return {
    subtotal,
    discounts: { bogofDiscount, bulkDiscount },
    totalDiscount,
    totalPrice,
    totalItems,
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      
      // Recalculate totals and discounts
      const calculations = calculateDiscounts(state.items);
      state.totalItems = calculations.totalItems;
      state.subtotal = calculations.subtotal;
      state.discounts = calculations.discounts;
      state.totalDiscount = calculations.totalDiscount;
      state.totalPrice = calculations.totalPrice;
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      
      const calculations = calculateDiscounts(state.items);
      state.totalItems = calculations.totalItems;
      state.subtotal = calculations.subtotal;
      state.discounts = calculations.discounts;
      state.totalDiscount = calculations.totalDiscount;
      state.totalPrice = calculations.totalPrice;
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      
      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId);
        } else {
          existingItem.quantity = quantity;
        }
      }
      
      const calculations = calculateDiscounts(state.items);
      state.totalItems = calculations.totalItems;
      state.subtotal = calculations.subtotal;
      state.discounts = calculations.discounts;
      state.totalDiscount = calculations.totalDiscount;
      state.totalPrice = calculations.totalPrice;
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.discounts = { bogofDiscount: 0, bulkDiscount: 0 };
      state.totalDiscount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
