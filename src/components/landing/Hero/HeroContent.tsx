import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { HERO_CONTENT, HERO_STYLES } from './constants';

const HeroContent: React.FC = () => {
  const PrimaryButtonIcon = HERO_CONTENT.primaryButton.icon;

  return (
    <Box sx={HERO_STYLES.textContent}>
      <Typography
        variant="h1"
        component="h1"
        sx={HERO_STYLES.title}
      >
        {HERO_CONTENT.title}
      </Typography>
      
      <Typography
        variant="h5"
        sx={HERO_STYLES.subtitle}
      >
        {HERO_CONTENT.subtitle}
      </Typography>
      
      <Box sx={HERO_STYLES.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          endIcon={<PrimaryButtonIcon />}
          sx={HERO_STYLES.primaryButton}
        >
          {HERO_CONTENT.primaryButton.text}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroContent;
