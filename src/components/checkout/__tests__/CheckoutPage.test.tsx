import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import cartReducer from '@/store/cartSlice';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/checkout',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock components
jest.mock('@/components/checkout/CheckoutHeader', () => {
  return function MockCheckoutHeader() {
    return <div data-testid="checkout-header">Checkout Header</div>;
  };
});

jest.mock('@/components/checkout/LoginSection', () => {
  return React.forwardRef(function MockLoginSection(props: unknown, ref: unknown) {
    React.useImperativeHandle(ref, () => ({
      trigger: jest.fn().mockResolvedValue(true),
      getValues: jest.fn().mockReturnValue({
        email: 'test@example.com',
        password: 'password123',
      }),
    }));
    return <div data-testid="login-section">Login Section</div>;
  });
});

jest.mock('@/components/checkout/ShippingSection', () => {
  return React.forwardRef(function MockShippingSection(props: unknown, ref: unknown) {
    React.useImperativeHandle(ref, () => ({
      trigger: jest.fn().mockResolvedValue(true),
      getValues: jest.fn().mockReturnValue({
        firstName: 'John',
        lastName: 'Doe',
        streetAddress: '123 Main St',
        city: 'London',
        postalCode: 'SW1A 1AA',
        country: 'UK',
        state: 'England',
      }),
    }));
    return <div data-testid="shipping-section">Shipping Section</div>;
  });
});

jest.mock('@/components/checkout/PaymentSection', () => {
  return React.forwardRef(function MockPaymentSection(props: unknown, ref: unknown) {
    React.useImperativeHandle(ref, () => ({
      trigger: jest.fn().mockResolvedValue(true),
      getValues: jest.fn().mockReturnValue({
        cardNumber: '1234567890123456',
        expiryDate: '12/25',
        cvc: '123',
      }),
    }));
    return <div data-testid="payment-section">Payment Section</div>;
  });
});

jest.mock('@/components/checkout/CartSummary', () => {
  return function MockCartSummary(props: unknown) {
    return (
      <div data-testid="cart-summary">
        <button
          onClick={() => props.onOrderPlaced?.({
            success: true,
            orderId: 'ORD-123456789',
            message: 'Order placed successfully!',
          })}
        >
          Place Order
        </button>
      </div>
    );
  };
});

jest.mock('@/components/checkout/OrderSuccessModal', () => {
  return function MockOrderSuccessModal(props: unknown) {
    if (!props.open) return null;
    return (
      <div data-testid="order-success-modal">
        <button onClick={props.onClose}>Close Modal</button>
        <button onClick={props.onNavigateHome}>Return to Home</button>
      </div>
    );
  };
});

// Mock store
const createMockStore = (cartState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [
          {
            product: {
              id: '1',
              name: 'Apples',
              price: 2.50,
              description: 'Fresh red apples',
              category: 'Fruits',
              isBogof: true,
              inStock: true,
              currency: 'GBP',
              currencySymbol: '£',
            },
            quantity: 2,
          },
        ],
        totalItems: 2,
        subtotal: 5.0,
        discounts: {
          bogofDiscount: 2.50,
          bulkDiscount: 0,
        },
        totalDiscount: 2.50,
        totalPrice: 2.50,
        ...cartState,
      },
    },
  });
};

const renderWithProvider = (store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <CheckoutPage />
    </Provider>
  );
};

describe('CheckoutPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render checkout page with all sections', () => {
    renderWithProvider();

    expect(screen.getByTestId('checkout-header')).toBeInTheDocument();
    expect(screen.getByTestId('login-section')).toBeInTheDocument();
    expect(screen.getByTestId('shipping-section')).toBeInTheDocument();
    expect(screen.getByTestId('payment-section')).toBeInTheDocument();
    expect(screen.getByTestId('cart-summary')).toBeInTheDocument();
  });

  it('should show empty cart message when cart is empty', () => {
    const emptyCartStore = createMockStore({
      items: [],
      totalItems: 0,
      subtotal: 0,
      discounts: { bogofDiscount: 0, bulkDiscount: 0 },
      totalDiscount: 0,
      totalPrice: 0,
    });

    renderWithProvider(emptyCartStore);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
    expect(screen.queryByTestId('checkout-header')).not.toBeInTheDocument();
  });

  it('should navigate to home when continue shopping is clicked', async () => {
    const user = userEvent.setup();
    const emptyCartStore = createMockStore({
      items: [],
      totalItems: 0,
      subtotal: 0,
      discounts: { bogofDiscount: 0, bulkDiscount: 0 },
      totalDiscount: 0,
      totalPrice: 0,
    });

    renderWithProvider(emptyCartStore);

    const continueShoppingButton = screen.getByText('Continue Shopping');
    await user.click(continueShoppingButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should navigate back to cart when back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    const backButton = screen.getByText('Back to Cart');
    await user.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  it('should show order success modal when order is placed', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByTestId('order-success-modal')).toBeInTheDocument();
    });
  });

  it('should close order success modal when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    // Place order to show modal
    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByTestId('order-success-modal')).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByText('Close Modal');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('order-success-modal')).not.toBeInTheDocument();
    });
  });

  it('should handle guest checkout mode', () => {
    renderWithProvider();

    // Should render all sections for guest checkout
    expect(screen.getByTestId('login-section')).toBeInTheDocument();
    expect(screen.getByTestId('shipping-section')).toBeInTheDocument();
    expect(screen.getByTestId('payment-section')).toBeInTheDocument();
  });

  it('should handle login checkout mode', () => {
    renderWithProvider();

    // Should render all sections for login checkout
    expect(screen.getByTestId('login-section')).toBeInTheDocument();
    expect(screen.getByTestId('shipping-section')).toBeInTheDocument();
    expect(screen.getByTestId('payment-section')).toBeInTheDocument();
  });

  it('should clear cart after successful order', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    renderWithProvider(store);

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByTestId('order-success-modal')).toBeInTheDocument();
    });

    // Verify that clearCart action was dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'cart/clearCart',
      })
    );
  });
});
