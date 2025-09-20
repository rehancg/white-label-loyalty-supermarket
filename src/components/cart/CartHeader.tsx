import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '@/store/hooks';
import { CART_STYLES } from './constants';

const CartHeader: React.FC = () => {
  const cart = useAppSelector(state => state.cart);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box 
      sx={CART_STYLES.header.container}
      role="banner"
      aria-labelledby="cart-title"
    >
      <Box sx={CART_STYLES.header.headerContent}>
        <ShoppingCart 
          sx={CART_STYLES.header.cartIcon}
          aria-hidden="true"
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={CART_STYLES.header.title}
          id="cart-title"
        >
          Shopping Cart
        </Typography>
      </Box>
      
      <Typography 
        variant="h6" 
        sx={CART_STYLES.header.subtitle}
        id="cart-description"
      >
        Review your items and proceed to checkout
      </Typography>

      {itemCount > 0 && (
        <Chip
          label={`${itemCount} ${itemCount === 1 ? 'item' : 'items'} in cart`}
          color="primary"
          variant="outlined"
          sx={CART_STYLES.header.itemCountChip}
          aria-label={`Cart contains ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          role="status"
          aria-live="polite"
        />
      )}
    </Box>
  );
};

export default CartHeader;
