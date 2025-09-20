import React from 'react';
import { Box, Typography } from '@mui/material';
import { LANDING_PAGE_CONSTANTS, LANDING_PAGE_STYLES } from './constants';

const ProductsHeader: React.FC = () => {
  return (
    <Box sx={LANDING_PAGE_STYLES.productsHeader}>
      <Typography
        variant="h3"
        component="h2"
        sx={LANDING_PAGE_STYLES.productsTitle}
      >
        {LANDING_PAGE_CONSTANTS.productsSection.title}
      </Typography>
      
      <Typography
        variant="h6"
        sx={LANDING_PAGE_STYLES.productsSubtitle}
      >
        {LANDING_PAGE_CONSTANTS.productsSection.subtitle}
      </Typography>
    </Box>
  );
};

export default ProductsHeader;
