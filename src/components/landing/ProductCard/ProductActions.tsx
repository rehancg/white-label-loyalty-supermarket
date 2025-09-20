import React from 'react';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { PRODUCT_CARD_STYLES } from './constants';
import { Product } from '@/types';

interface ProductActionsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product, product.isBogof ? 2 : 1);
  };

  return (
    <Button
      variant="contained"
      startIcon={<ShoppingCart />}
      onClick={handleAddToCart}
      disabled={!product.inStock}
      fullWidth
      sx={PRODUCT_CARD_STYLES.addButton}
    >
      Add to Cart
    </Button>
  );
};

export default ProductActions;
