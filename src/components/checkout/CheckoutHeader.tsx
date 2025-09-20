import React from 'react';
import { Box, Typography } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { CHECKOUT_STYLES } from './constants';

const CheckoutHeader: React.FC = () => {
  return (
    <Box 
      sx={CHECKOUT_STYLES.header.container}
      role="banner"
      aria-labelledby="checkout-title"
    >
      <Typography
        variant="h4"
        component="h1"
        sx={CHECKOUT_STYLES.header.title}
        id="checkout-title"
      >
        <CreditCard sx={{ fontSize: '2rem', color: 'primary.main', mr: 1 }} aria-hidden="true" />
        Checkout
      </Typography>
      
      <Typography
        variant="h6"
        sx={CHECKOUT_STYLES.header.subtitle}
        id="checkout-description"
      >
        Login, continue as guest, and enter your shipping details to complete your purchase.
      </Typography>
    </Box>
  );
};

export default CheckoutHeader;