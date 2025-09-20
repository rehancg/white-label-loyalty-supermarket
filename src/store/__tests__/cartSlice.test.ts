import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { Product, CartItem } from '@/types';

// Mock products for testing
const mockProduct1: Product = {
  id: '1',
  name: 'Apples',
  price: 2.50,
  description: 'Fresh red apples',
  category: 'Fruits',
  isBogof: true,
  inStock: true,
  currency: 'GBP',
  currencySymbol: '£',
};

const mockProduct2: Product = {
  id: '2',
  name: 'Bread',
  price: 1.80,
  description: 'Whole wheat bread',
  category: 'Bakery',
  isBogof: false,
  inStock: true,
  currency: 'GBP',
  currencySymbol: '£',
};

const mockProduct3: Product = {
  id: '3',
  name: 'Coffee',
  price: 4.50,
  description: 'Premium coffee beans',
  category: 'Beverages',
  isBogof: false,
  inStock: true,
  currency: 'GBP',
  currencySymbol: '£',
};

describe('Cart Slice', () => {
  const initialState = {
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

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addToCart', () => {
    it('should add a new product to empty cart', () => {
      const action = addToCart({ product: mockProduct1, quantity: 2 });
      const newState = cartReducer(initialState, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual({
        product: mockProduct1,
        quantity: 2,
      });
      expect(newState.totalItems).toBe(2);
      expect(newState.subtotal).toBe(5.0); // 2 * 2.50
    });

    it('should update quantity when adding existing product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        subtotal: 2.50,
      };

      const action = addToCart({ product: mockProduct1, quantity: 2 });
      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(3);
      expect(newState.totalItems).toBe(3);
      expect(newState.subtotal).toBe(7.50); // 3 * 2.50
    });

    it('should calculate BOGOF discount correctly', () => {
      const action = addToCart({ product: mockProduct1, quantity: 4 }); // BOGOF product
      const newState = cartReducer(initialState, action);

      expect(newState.items[0].quantity).toBe(4);
      expect(newState.subtotal).toBe(10.0); // 4 * 2.50
      expect(newState.discounts.bogofDiscount).toBe(5.0); // 2 free items * 2.50
      expect(newState.totalDiscount).toBe(5.0);
      expect(newState.totalPrice).toBe(5.0); // 10.0 - 5.0
    });

    it('should calculate bulk discount for orders over £10', () => {
      // Add products totaling more than £10
      let state = cartReducer(initialState, addToCart({ product: mockProduct2, quantity: 6 })); // 6 * 1.80 = 10.80
      state = cartReducer(state, addToCart({ product: mockProduct3, quantity: 1 })); // + 4.50 = 15.30

      expect(state.subtotal).toBe(15.30);
      expect(state.discounts.bulkDiscount).toBeCloseTo(3.06, 2); // 20% of 15.30
      expect(state.totalDiscount).toBeCloseTo(3.06, 2);
      expect(state.totalPrice).toBeCloseTo(12.24, 2); // 15.30 - 3.06
    });
  });

  describe('removeFromCart', () => {
    it('should remove product from cart', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        totalItems: 3,
        subtotal: 6.80,
      };

      const action = removeFromCart('1');
      const newState = cartReducer(stateWithItems, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].product.id).toBe('2');
      expect(newState.totalItems).toBe(1);
    });

    it('should handle removing non-existent product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        subtotal: 2.50,
      };

      const action = removeFromCart('999');
      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(1); // No change
    });
  });

  describe('updateQuantity', () => {
    it('should update product quantity', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 2 }],
        totalItems: 2,
        subtotal: 5.0,
      };

      const action = updateQuantity({ productId: '1', quantity: 5 });
      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(5);
      expect(newState.totalItems).toBe(5);
      expect(newState.subtotal).toBe(12.50); // 5 * 2.50
    });

    it('should remove product when quantity is 0', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 2 }],
        totalItems: 2,
        subtotal: 5.0,
      };

      const action = updateQuantity({ productId: '1', quantity: 0 });
      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(0);
      expect(newState.totalItems).toBe(0);
      expect(newState.subtotal).toBe(0);
    });

    it('should handle updating non-existent product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 2 }],
        totalItems: 2,
        subtotal: 5.0,
      };

      const action = updateQuantity({ productId: '999', quantity: 5 });
      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(1); // No change
      expect(newState.items[0].quantity).toBe(2); // No change
    });
  });

  describe('clearCart', () => {
    it('should clear all items and reset totals', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        totalItems: 3,
        subtotal: 6.80,
        discounts: { bogofDiscount: 2.50, bulkDiscount: 0 },
        totalDiscount: 2.50,
        totalPrice: 4.30,
      };

      const action = clearCart();
      const newState = cartReducer(stateWithItems, action);

      expect(newState).toEqual(initialState);
    });
  });
});
