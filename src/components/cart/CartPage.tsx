'use client';

import React from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CartHeader from './CartHeader';
import ProductSummary from './ProductSummary';
import OrderSummary from '../shared/OrderSummary';
import { useAppSelector } from '@/store/hooks';
import { CART_STYLES } from './constants';

const CartPage: React.FC = () => {
  const router = useRouter();
  const cart = useAppSelector(state => state.cart);

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  const handleBackToProducts = () => {
    router.push('/');
  };

  const isEmpty = cart.items.length === 0;

  if (isEmpty) {
    return (
      <Box 
        sx={CART_STYLES.page.pageContainer}
        role="main"
        aria-labelledby="empty-cart-title"
      >
        <Container maxWidth="lg" sx={CART_STYLES.page.container}>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            sx={CART_STYLES.page.backButton}
            onClick={handleBackToProducts}
            aria-label="Go back to products page"
          >
            Back to Products
          </Button>

          {/* Empty Cart State */}
          <Box 
            sx={CART_STYLES.page.emptyCartContainer}
            role="region"
            aria-labelledby="empty-cart-title"
            aria-describedby="empty-cart-description"
          >
            <ShoppingCart 
              sx={CART_STYLES.page.emptyCartIcon}
              aria-hidden="true"
            />
            <Typography 
              variant="h5" 
              sx={CART_STYLES.page.emptyCartTitle}
              id="empty-cart-title"
            >
              Your cart is empty
            </Typography>
            <Typography 
              variant="body1" 
              sx={CART_STYLES.page.emptyCartSubtitle}
              id="empty-cart-description"
            >
              Add some products to get started
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleBackToProducts}
              sx={CART_STYLES.page.continueShoppingButton}
              aria-label="Continue shopping to add products to cart"
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box 
      sx={CART_STYLES.page.pageContainer}
      role="main"
      aria-labelledby="cart-title"
    >
      <Container maxWidth="lg" sx={CART_STYLES.page.container}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          sx={CART_STYLES.page.backButton}
          onClick={handleBackToProducts}
          aria-label="Go back to products page"
        >
          Back to Products
        </Button>

        {/* Header */}
        <CartHeader />

        <Box 
          sx={CART_STYLES.page.layoutContainer}
          role="region"
          aria-label="Cart contents and checkout"
        >
          {/* Left Column - Product Summary */}
          <Box 
            sx={CART_STYLES.page.leftColumn}
            role="region"
            aria-label="Cart items"
          >
            <ProductSummary cartItems={cart.items} />
          </Box>

          {/* Right Column - Order Summary */}
          <Box 
            sx={CART_STYLES.page.rightColumn}
            role="complementary"
            aria-label="Order summary and checkout"
          >
            <Box sx={CART_STYLES.page.stickyContainer}>
              <OrderSummary
                cartItems={cart.items}
                subtotal={cart.subtotal}
                discounts={cart.discounts}
                totalDiscount={cart.totalDiscount}
                total={cart.totalPrice}
                buttonText="Proceed to Checkout"
                onButtonClick={handleProceedToCheckout}
                showCartItems={false}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
