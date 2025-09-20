import OrderService from '@/services/OrderService';
import { CheckoutRequest, CheckoutResponse } from '@/types/checkout';

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('OrderService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  const mockCheckoutRequest: CheckoutRequest = {
    checkoutMode: 'guest',
    email: '',
    shipping: {
      firstName: 'John',
      lastName: 'Doe',
      streetAddress: '123 Main St',
      city: 'London',
      postalCode: 'SW1A 1AA',
      country: 'UK',
      state: 'England',
    },
    payment_method: 'card',
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
      subtotal: 5.0,
      discounts: {
        bogofDiscount: 2.50,
        bulkDiscount: 0,
      },
      totalDiscount: 2.50,
      totalPrice: 2.50,
    },
  };

  describe('submitOrder', () => {
    it('should successfully submit order and return response', async () => {
      const mockResponse: CheckoutResponse = {
        success: true,
        orderId: 'ORD-123456789',
        message: 'Order placed successfully!',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await OrderService.submitOrder(mockCheckoutRequest);

      expect(mockFetch).toHaveBeenCalledWith('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockCheckoutRequest),
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle API error response', async () => {
      const mockErrorResponse = {
        success: false,
        message: 'Shipping information is incomplete',
        errors: [
          {
            field: 'shipping.firstName',
            message: 'firstName is required',
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse,
      } as Response);

      await expect(OrderService.submitOrder(mockCheckoutRequest)).rejects.toThrow(
        'Shipping information is incomplete'
      );
    });

    it('should handle generic error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(OrderService.submitOrder(mockCheckoutRequest)).rejects.toThrow(
        'Something went wrong'
      );
    });

    it('should handle response without error message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(OrderService.submitOrder(mockCheckoutRequest)).rejects.toThrow(
        'Failed to place order'
      );
    });
  });
});
