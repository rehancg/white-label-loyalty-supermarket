'use client';

import React from 'react';
import { Box } from '@mui/material';
import BottomBar from './BottomBar';
import { FOOTER_STYLES } from './constants';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <Box
      component="footer"
      className={className}
      sx={FOOTER_STYLES.footer}
    >
      <BottomBar />
    </Box>
  );
};

export default Footer;
