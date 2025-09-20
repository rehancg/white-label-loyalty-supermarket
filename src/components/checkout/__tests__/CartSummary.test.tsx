import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import CartSummary from '@/components/checkout/CartSummary';
import OrderService from '@/services/OrderService';
import cartReducer from '@/store/cartSlice';
import { CheckoutResponse } from '@/types/checkout';

// Mock OrderService
jest.mock('@/services/OrderService');
const mockOrderService = OrderService as jest.Mocked<typeof OrderService>;

// Mock store
const createMockStore = (initialState = {}) => {
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
        ...initialState,
      },
    },
  });
};

const mockProps = {
  checkoutMode: 'guest' as const,
  loginData: undefined,
  shippingData: {
    firstName: 'John',
    lastName: 'Doe',
    streetAddress: '123 Main St',
    city: 'London',
    postalCode: 'SW1A 1AA',
    country: 'UK',
    state: 'England',
  },
  paymentData: {
    cardNumber: '1234567890123456',
    expiryDate: '12/25',
    cvc: '123',
  },
  onOrderPlaced: jest.fn(),
  onValidateForms: jest.fn(),
  onGetFormData: jest.fn(),
  canProceedToCheckout: true,
};

const renderWithProvider = (props = {}, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <CartSummary {...mockProps} {...props} />
    </Provider>
  );
};

describe('CartSummary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOrderService.submitOrder.mockClear();
  });

  it('should render cart summary with order button', () => {
    renderWithProvider();

    expect(screen.getByText('Place Order')).toBeInTheDocument();
    expect(screen.getByText('Apples')).toBeInTheDocument();
    expect(screen.getByText('£2.50')).toBeInTheDocument();
  });

  it('should show loading state when submitting order', async () => {
    const user = userEvent.setup();
    mockOrderService.submitOrder.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        success: true,
        orderId: 'ORD-123',
        message: 'Order placed successfully!',
      }), 100))
    );
    mockProps.onValidateForms.mockResolvedValueOnce(true);
    mockProps.onGetFormData.mockReturnValueOnce({
      loginData: undefined,
      shippingData: mockProps.shippingData,
      paymentData: mockProps.paymentData,
    });

    renderWithProvider();

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText('Placing Order...')).toBeInTheDocument();
    });
    
    // The button should be disabled during loading
    const loadingButton = screen.getByText('Placing Order...');
    expect(loadingButton.closest('button')).toBeDisabled();
  });

  it('should successfully place order', async () => {
    const user = userEvent.setup();
    const mockResponse: CheckoutResponse = {
      success: true,
      orderId: 'ORD-123456789',
      message: 'Order placed successfully!',
    };

    mockOrderService.submitOrder.mockResolvedValueOnce(mockResponse);
    mockProps.onValidateForms.mockResolvedValueOnce(true);
    mockProps.onGetFormData.mockReturnValueOnce({
      loginData: undefined,
      shippingData: mockProps.shippingData,
      paymentData: mockProps.paymentData,
    });

    renderWithProvider();

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(mockOrderService.submitOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          checkoutMode: 'guest',
          shipping: mockProps.shippingData,
          cart: expect.objectContaining({
            items: expect.any(Array),
            totalPrice: 2.50,
          }),
        })
      );
    });

    expect(mockProps.onOrderPlaced).toHaveBeenCalledWith(mockResponse);
  });

  it('should show validation alert when forms are invalid', async () => {
    const user = userEvent.setup();
    mockProps.onValidateForms.mockResolvedValueOnce(false);

    renderWithProvider();

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText(/Please complete all required fields/)).toBeInTheDocument();
    });

    expect(mockOrderService.submitOrder).not.toHaveBeenCalled();
  });

  it('should disable button when cannot proceed to checkout', () => {
    renderWithProvider({ canProceedToCheckout: false });

    const placeOrderButton = screen.getByText('Place Order');
    expect(placeOrderButton).toBeDisabled();
  });

  it('should show validation alert when missing required data', async () => {
    const user = userEvent.setup();
    mockProps.onValidateForms.mockResolvedValueOnce(true);
    mockProps.onGetFormData.mockReturnValueOnce({
      loginData: undefined,
      shippingData: undefined, // Missing shipping data
      paymentData: mockProps.paymentData,
    });

    renderWithProvider();

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText(/Please complete all required fields/)).toBeInTheDocument();
    });

    expect(mockOrderService.submitOrder).not.toHaveBeenCalled();
  });

  it('should handle login mode checkout', async () => {
    const user = userEvent.setup();
    const mockResponse: CheckoutResponse = {
      success: true,
      orderId: 'ORD-123456789',
      message: 'Order placed successfully!',
    };

    mockOrderService.submitOrder.mockResolvedValueOnce(mockResponse);
    mockProps.onValidateForms.mockResolvedValueOnce(true);
    mockProps.onGetFormData.mockReturnValueOnce({
      loginData: { email: 'test@example.com', password: 'password123' },
      shippingData: mockProps.shippingData,
      paymentData: mockProps.paymentData,
    });

    renderWithProvider({ checkoutMode: 'login' });

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(mockOrderService.submitOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          checkoutMode: 'login',
          email: 'test@example.com',
        })
      );
    });
  });

  it('should close error alert when close button is clicked', async () => {
    const user = userEvent.setup();
    mockOrderService.submitOrder.mockRejectedValueOnce(new Error('Test error'));
    mockProps.onValidateForms.mockResolvedValueOnce(true);
    mockProps.onGetFormData.mockReturnValueOnce({
      loginData: undefined,
      shippingData: mockProps.shippingData,
      paymentData: mockProps.paymentData,
    });

    renderWithProvider();

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByText('Test error')).not.toBeInTheDocument();
  });
});
