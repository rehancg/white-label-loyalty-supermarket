import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { HERO_CONTENT, HERO_STYLES } from './constants';

interface HeroContentProps {
  onShopNowClick?: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onShopNowClick }) => {
  const PrimaryButtonIcon = HERO_CONTENT.primaryButton.icon;

  const handleShopNowClick = () => {
    if (onShopNowClick) {
      onShopNowClick();
    } else {
      // Fallback: scroll to products section
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

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
          onClick={handleShopNowClick}
        >
          {HERO_CONTENT.primaryButton.text}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroContent;
