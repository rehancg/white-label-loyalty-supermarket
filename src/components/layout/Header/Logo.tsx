import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { HEADER_STYLES } from './constants';

const Logo: React.FC = () => {
  return (
    <Box sx={HEADER_STYLES.logoContainer}>
      <Image
        src="/logo.png"
        alt="White Label Loyalty Supermarket Logo"
        width={100}
        height={40}
        style={HEADER_STYLES.logoImage}
      />
    </Box>
  );
};

export default Logo;
