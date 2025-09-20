import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import HeroContent from './HeroContent';
import HeroIllustration from './HeroIllustration';
import { HERO_STYLES } from './constants';

const Hero: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...HERO_STYLES.container,
        ...(theme.palette.mode === 'dark' 
          ? HERO_STYLES.containerDark 
          : HERO_STYLES.containerLight
        ),
      }}
    >
      <Container maxWidth="lg">
        <Box sx={HERO_STYLES.contentWrapper}>
          <HeroContent />
          <HeroIllustration />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
