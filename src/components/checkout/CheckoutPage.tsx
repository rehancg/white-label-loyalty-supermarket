'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CheckoutHeader from './CheckoutHeader';
import LoginSection from './LoginSection';
import ShippingSection from './ShippingSection';
import PaymentSection from './PaymentSection';
import CartSummary from './CartSummary';
import { CHECKOUT_STYLES } from './constants';

const CheckoutPage: React.FC = () => {
  const [checkoutMode, setCheckoutMode] = useState<'login' | 'guest'>('login');
  const router = useRouter();

  const handleBackToCart = () => {
    router.push('/cart');
  };

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
                mode={checkoutMode} 
                onModeChange={setCheckoutMode} 
              />

              <ShippingSection />

              <PaymentSection />
            </Box>
          </Box>

          <Box 
            sx={CHECKOUT_STYLES.page.rightColumn}
            role="complementary"
            aria-label="Order summary and checkout"
          >
            <Box sx={CHECKOUT_STYLES.page.stickyContainer}>
              <CartSummary />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutPage;