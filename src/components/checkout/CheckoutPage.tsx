'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Button, Alert, Snackbar, Typography } from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import CheckoutHeader from './CheckoutHeader';
import LoginSection, { LoginSectionRef } from './LoginSection';
import ShippingSection, { ShippingSectionRef } from './ShippingSection';
import PaymentSection, { PaymentSectionRef } from './PaymentSection';
import CartSummary from './CartSummary';
import OrderSuccessModal from './OrderSuccessModal';
import { CHECKOUT_STYLES } from './constants';
import { LoginFormData, ShippingFormData, PaymentFormData } from '@/schemas/checkout';
import { CheckoutResponse } from '@/types/checkout';

const CheckoutPage: React.FC = () => {
  const [checkoutMode, setCheckoutMode] = useState<'login' | 'guest'>('login');
  const [loginData, setLoginData] = useState<LoginFormData | undefined>();
  const [shippingData, setShippingData] = useState<ShippingFormData | undefined>();
  const [paymentData, setPaymentData] = useState<PaymentFormData | undefined>();
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  // Refs to access form validation methods
  const loginFormRef = useRef<LoginSectionRef>(null);
  const shippingFormRef = useRef<ShippingSectionRef>(null);
  const paymentFormRef = useRef<PaymentSectionRef>(null);

  const handleBackToCart = () => {
    router.push('/cart');
  };

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // accept any valid email/password
      if (data.email && data.password) {
        setIsLoggedIn(true);
        setUserEmail(data.email);
        setLoginData(data);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleModeChange = (mode: 'login' | 'guest') => {
    setCheckoutMode(mode);
    if (mode === 'guest') {
      handleGuestCheckout();
    }
    else if (mode === 'login') {
      setIsLoggedIn(false);
      setUserEmail('');
      setLoginData(undefined);
    }
  };

  const handleGuestCheckout = () => {
    setIsLoggedIn(true);
    setUserEmail('');
  };

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentData(data);
  };

  const handleOrderPlaced = (response: CheckoutResponse) => {
    if (response.success) {
      setOrderId(response.orderId);
      setShowOrderSuccessModal(true);

      // Clear the cart after successful order
      dispatch(clearCart());
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setOrderSuccess(null);
  };

  const handleCloseOrderSuccessModal = () => {
    setShowOrderSuccessModal(false);
    setOrderId(undefined);
  };

  const handleNavigateHome = () => {
  };

  const validateAllForms = async (): Promise<boolean> => {
    const results = await Promise.all([
      checkoutMode === 'guest' ? Promise.resolve(true) : loginFormRef.current?.trigger() || false,
      shippingFormRef.current?.trigger() || false,
      paymentFormRef.current?.trigger() || false,
    ]);

    return results.every(result => result === true);
  };

  const canProceedToCheckout = () => {
    return isLoggedIn && (checkoutMode === 'guest' || (checkoutMode === 'login' && !!loginData));
  };

  const getFormData = () => {
    const loginData = checkoutMode === 'guest' ? undefined : loginFormRef.current?.getValues();
    const shippingData = shippingFormRef.current?.getValues();
    const paymentData = paymentFormRef.current?.getValues();
    
    return { loginData, shippingData, paymentData };
  };

  // Show empty cart message if cart is empty
  if (cart.items.length === 0) {
    return (
      <Box 
        sx={CHECKOUT_STYLES.page.pageContainer}
        role="main"
        aria-labelledby="empty-cart-title"
      >
        <Container maxWidth="lg" sx={CHECKOUT_STYLES.page.container}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/')}
            sx={CHECKOUT_STYLES.page.backButton}
            aria-label="Go back to home page"
          >
            Back to Home
          </Button>

          <Box sx={CHECKOUT_STYLES.emptyCart.container}>
            <ShoppingCart 
              sx={CHECKOUT_STYLES.emptyCart.icon}
              aria-hidden="true"
            />
            
            <Typography 
              variant="h4" 
              component="h1" 
              id="empty-cart-title"
              sx={CHECKOUT_STYLES.emptyCart.title}
            >
              Your cart is empty
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={CHECKOUT_STYLES.emptyCart.message}
            >
              You need to add items to your cart before proceeding to checkout.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/')}
              sx={CHECKOUT_STYLES.emptyCart.continueButton}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
        {/* Order Success Modal */}
        <OrderSuccessModal
          open={showOrderSuccessModal}
          orderId={orderId}
          onClose={handleCloseOrderSuccessModal}
          onNavigateHome={handleNavigateHome}
        />
      </Box>
    );
  }

  return (
    <Box 
      sx={CHECKOUT_STYLES.page.pageContainer}
      role="main"
      aria-labelledby="checkout-title"
    >
      <Container maxWidth="lg" sx={CHECKOUT_STYLES.page.container}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToCart}
          sx={CHECKOUT_STYLES.page.backButton}
          aria-label="Go back to cart page"
        >
          Back to Cart
        </Button>

        <CheckoutHeader />

        <Box 
          sx={CHECKOUT_STYLES.page.layoutContainer}
          role="region"
          aria-label="Checkout process"
        >
          <Box 
            sx={CHECKOUT_STYLES.page.leftColumn}
            role="region"
            aria-label="Checkout forms and information"
          >
            <Box sx={CHECKOUT_STYLES.page.formsContainer}>
              <LoginSection 
                ref={loginFormRef}
                mode={checkoutMode} 
                onModeChange={handleModeChange}
                onLoginSubmit={handleLoginSubmit}
                onGuestCheckout={handleGuestCheckout}
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
              />

              <ShippingSection 
                ref={shippingFormRef}
                onShippingSubmit={handleShippingSubmit}
              />

              <PaymentSection 
                ref={paymentFormRef}
                onPaymentSubmit={handlePaymentSubmit}
              />
            </Box>
          </Box>

          <Box 
            sx={CHECKOUT_STYLES.page.rightColumn}
            role="complementary"
            aria-label="Order summary and checkout"
          >
            <Box sx={CHECKOUT_STYLES.page.stickyContainer}>
              <CartSummary 
                checkoutMode={checkoutMode}
                loginData={loginData}
                shippingData={shippingData}
                paymentData={paymentData}
                onOrderPlaced={handleOrderPlaced}
                onValidateForms={validateAllForms}
                onGetFormData={getFormData}
                canProceedToCheckout={canProceedToCheckout()}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={!!orderSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccessSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {orderSuccess}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutPage;