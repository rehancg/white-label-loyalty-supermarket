import React from 'react';
import { Box, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HEADER_STYLES } from './constants';

const Logo: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleLogoClick = () => {
    router.push('/');
  };

  const logoSrc = theme.palette.mode === 'dark' ? '/logo_dark.png' : '/logo.png';

  return (
    <Box 
      sx={HEADER_STYLES.logoContainer}
      onClick={handleLogoClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label="Go to home page"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleLogoClick();
        }
      }}
    >
      <Image
        src={logoSrc}
        alt="White Label Loyalty Supermarket Logo"
        width={100}
        height={40}
        style={HEADER_STYLES.logoImage}
      />
    </Box>
  );
};

export default Logo;
