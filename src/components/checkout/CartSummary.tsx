import React from 'react';
import { Box, Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import OrderSummary from '../shared/OrderSummary';
import { CHECKOUT_STYLES } from './constants';
import { CheckoutRequest, CheckoutResponse } from '@/types/checkout';
import { LoginFormData, ShippingFormData, PaymentFormData } from '@/schemas/checkout';
import OrderService from '@/services/OrderService';

interface CartSummaryProps {
  checkoutMode: 'login' | 'guest';
  loginData?: LoginFormData;
  shippingData?: ShippingFormData;
  paymentData?: PaymentFormData;
  onOrderPlaced?: (response: CheckoutResponse) => void;
  onValidateForms?: () => Promise<boolean>;
  onGetFormData?: () => { loginData?: LoginFormData; shippingData?: ShippingFormData; paymentData?: PaymentFormData };
  canProceedToCheckout?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  checkoutMode, 
  loginData, 
  shippingData, 
  paymentData, 
  onOrderPlaced,
  onValidateForms,
  onGetFormData,
  canProceedToCheckout = false
}) => {
  const cart = useAppSelector(state => state.cart);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [showValidationAlert, setShowValidationAlert] = React.useState(false);
  
  const validateAllForms = async (): Promise<boolean> => {
    if (onValidateForms) {
      return await onValidateForms();
    }
    return false;
  };

  const prepareCheckoutPayload = (formData: { loginData?: LoginFormData; shippingData?: ShippingFormData; paymentData?: PaymentFormData }): CheckoutRequest => {
    return {
      checkoutMode,
      email: checkoutMode === 'login' && formData.loginData ?formData.loginData.email : '',
      shipping: {
        firstName: formData.shippingData!.firstName,
        lastName: formData.shippingData!.lastName,
        streetAddress: formData.shippingData!.streetAddress,
        city: formData.shippingData!.city,
        postalCode: formData.shippingData!.postalCode,
        country: formData.shippingData!.country,
        state: formData.shippingData!.state,
      },
      payment_method: 'card',
      cart: {
        items: cart.items,
        subtotal: cart.subtotal,
        discounts: cart.discounts,
        totalDiscount: cart.totalDiscount,
        totalPrice: cart.totalPrice,
      },
    };
  };

  const submitOrder = async (payload: CheckoutRequest): Promise<CheckoutResponse> => {
    return await OrderService.submitOrder(payload);
  };

  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setShowValidationAlert(false);

      // Validate all forms
      const isValid = await validateAllForms();

      if (!isValid) {
        setShowValidationAlert(true);
        return;
      }

      const currentFormData = onGetFormData ? onGetFormData() : { loginData, shippingData, paymentData };
      
      // Check if we have all required data
      if (!currentFormData.shippingData || !currentFormData.paymentData || (checkoutMode === 'login' && !currentFormData.loginData)) {
        setShowValidationAlert(true);
        return;
      }

      const payload = prepareCheckoutPayload(currentFormData);      
      const response = await submitOrder(payload);
      
      if (response.success) {
        if (onOrderPlaced) {
          onOrderPlaced(response);
        }
      } else {
        setSubmitError(response.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Box 
      sx={CHECKOUT_STYLES.cartSummary.container}
      role="region"
      aria-label="Order summary for checkout"
    >
      {submitError && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setSubmitError(null)}
        >
          {submitError}
        </Alert>
      )}
      
      <OrderSummary
        cartItems={cart.items}
        subtotal={cart.subtotal}
        discounts={cart.discounts}
        totalDiscount={cart.totalDiscount}
        total={cart.totalPrice}
        buttonText={isSubmitting ? "Placing Order..." : "Place Order"}
        showCartItems={true}
        onButtonClick={handlePlaceOrder}
        disabled={isSubmitting || !canProceedToCheckout}
        loading={isSubmitting}
      />
      
      {/* Validation Alert Snackbar */}
      <Snackbar
        open={showValidationAlert}
        autoHideDuration={6000}
        onClose={() => setShowValidationAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowValidationAlert(false)} 
          severity="warning"
          sx={{ width: '100%' }}
        >
          Please complete all required fields before placing your order. Missing fields have been highlighted.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartSummary;