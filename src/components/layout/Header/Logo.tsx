import React from 'react';
import { Box, Typography } from '@mui/material';
import { LocalGroceryStore } from '@mui/icons-material';
import { HEADER_STYLES } from './constants';

const Logo: React.FC = () => {
  return (
    <Box sx={HEADER_STYLES.logoContainer}>
      <LocalGroceryStore sx={HEADER_STYLES.logoIcon} />
      <Box>
        <Typography 
          variant="h6" 
          component="div" 
          sx={HEADER_STYLES.logoText}
        >
          White Label Loyalty
        </Typography>
        <Typography 
          variant="caption" 
          sx={HEADER_STYLES.logoSubtext}
        >
          Supermarket
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
