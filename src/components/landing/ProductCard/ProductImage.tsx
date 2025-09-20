import React from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { getProductIcon, PRODUCT_CARD_STYLES } from './constants';
import { Product } from '@/types';

interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...PRODUCT_CARD_STYLES.imageContainer,
        ...(theme.palette.mode === 'dark' 
          ? PRODUCT_CARD_STYLES.imageContainerDark 
          : PRODUCT_CARD_STYLES.imageContainerLight
        ),
      }}
    >
      <Typography sx={PRODUCT_CARD_STYLES.productIcon}>
        {getProductIcon(product.category)}
      </Typography>
      {product.isBogof && (
        <Chip
          label="By One Get One Free"
          size="small"
          sx={PRODUCT_CARD_STYLES.categoryChip}
        />
      )}
    </Box>
  );
};

export default ProductImage;
