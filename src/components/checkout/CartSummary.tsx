import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import OrderSummary from '../shared/OrderSummary';
import { CHECKOUT_STYLES } from './constants';

const CartSummary: React.FC = () => {
  const cart = useAppSelector(state => state.cart);

  const handlePlaceOrder = () => {
    // TODO: Implement place order functionality
    console.log('Placing order...', cart);
  };

  return (
    <Box 
      sx={CHECKOUT_STYLES.cartSummary.container}
      role="region"
      aria-label="Order summary for checkout"
    >
      <OrderSummary
        cartItems={cart.items}
        subtotal={cart.subtotal}
        discounts={cart.discounts}
        totalDiscount={cart.totalDiscount}
        total={cart.totalPrice}
        buttonText="Place Order"
        showCartItems={true}
        onButtonClick={handlePlaceOrder}
      />
    </Box>
  );
};

export default CartSummary;