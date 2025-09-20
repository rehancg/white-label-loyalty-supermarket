import { CheckoutRequest, CheckoutResponse } from '@/types/checkout';

export class OrderService {
  private static readonly API_BASE_URL = '/api';

  /**
   * Submit a checkout order
   * @param checkoutData - The checkout request data
   * @returns Promise<CheckoutResponse> - The checkout response
   * @throws Error if the request fails
   */
  static async submitOrder(checkoutData: CheckoutRequest): Promise<CheckoutResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const result: CheckoutResponse = await response.json();
      return result;
    } catch (error) {      
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
      }
      
      throw error;
    }
  }
}

export default OrderService;
