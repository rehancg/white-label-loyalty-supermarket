import React from 'react';
import { Box, Container } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import Copyright from './Copyright';
import FooterLinks from './FooterLinks';
import { FOOTER_STYLES } from './constants';

const BottomBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={FOOTER_STYLES.bottomBar}>
      <Container maxWidth="lg">
        <Box
          sx={
            isMobile
              ? FOOTER_STYLES.bottomContentMobile
              : FOOTER_STYLES.bottomContent
          }
        >
          <Copyright />
          <FooterLinks />
        </Box>
      </Container>
    </Box>
  );
};

export default BottomBar;
