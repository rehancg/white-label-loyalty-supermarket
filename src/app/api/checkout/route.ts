import { NextRequest, NextResponse } from 'next/server';
import { CheckoutRequest, CheckoutResponse } from '@/types/checkout';

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    // Validate required fields
    if (!body.shipping || !body.cart) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: shipping and cart are required',
          errors: [
            {
              field: 'general',
              message: 'Missing required fields: shipping and cart are required',
            },
          ],
        } as CheckoutResponse,
        { status: 400 }
      );
    }

    // Validate shipping information
    const shippingErrors: { field: string; message: string }[] = [];
    const requiredShippingFields = [
      'firstName',
      'lastName',
      'streetAddress',
      'city',
      'postalCode',
      'country',
    ];

    requiredShippingFields.forEach((field) => {
      if (!body.shipping[field as keyof typeof body.shipping]) {
        shippingErrors.push({
          field: `shipping.${field}`,
          message: `${field} is required`,
        });
      }
    });

    if (shippingErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Shipping information is incomplete',
          errors: shippingErrors,
        } as CheckoutResponse,
        { status: 400 }
      );
    }

    // Validate cart
    if (!body.cart.items || body.cart.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cart is empty',
          errors: [
            {
              field: 'cart',
              message: 'Cart cannot be empty',
            },
          ],
        } as CheckoutResponse,
        { status: 400 }
      );
    }

    // Validate checkout mode
    if (!['login', 'guest'].includes(body.checkoutMode)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid checkout mode',
          errors: [
            {
              field: 'checkoutMode',
              message: 'Checkout mode must be either "login" or "guest"',
            },
          ],
        } as CheckoutResponse,
        { status: 400 }
      );
    }

    // For login mode, validate email
    if (body.checkoutMode === 'login' && !body.email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required for login checkout',
          errors: [
            {
              field: 'email',
              message: 'Email is required for login checkout',
            },
          ],
        } as CheckoutResponse,
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Order processed:', {
      orderId,
      checkoutMode: body.checkoutMode,
      email: body.email,
      shipping: body.shipping,
      cartItems: body.cart.items.length,
      totalPrice: body.cart.totalPrice,
      timestamp: new Date().toISOString(),
    });

    const response: CheckoutResponse = {
      success: true,
      orderId,
      message: 'Order placed successfully! Your items will be processed and shipped soon.',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Checkout API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing your order',
        errors: [
          {
            field: 'general',
            message: 'An unexpected error occurred while processing your order',
          },
        ],
      } as CheckoutResponse,
      { status: 500 }
    );
  }
}
