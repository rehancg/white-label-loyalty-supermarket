import React from 'react';
import { Typography, Box } from '@mui/material';
import { PRODUCT_CARD_STYLES } from './constants';
import { Product } from '../data';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <>
      <Typography
        variant="h6"
        component="h3"
        sx={PRODUCT_CARD_STYLES.title}
      >
        {product.name}
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={PRODUCT_CARD_STYLES.description}
      >
        {product.description}
      </Typography>
      
      <Box sx={PRODUCT_CARD_STYLES.priceContainer}>
        <Typography
          variant="h5"
          sx={PRODUCT_CARD_STYLES.price}
        >
          {product.currencySymbol}{product.price.toFixed(2)}
        </Typography>
      </Box>
    </>
  );
};

export default ProductInfo;
