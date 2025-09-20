import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FEATURE_CARDS_STYLES } from './constants';

interface FeatureCardProps {
  icon: React.ComponentType<{ sx?: any }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: IconComponent, title, description }) => {
  const theme = useTheme();

  return (
    <Box sx={FEATURE_CARDS_STYLES.card}>
      <Box
        sx={{
          ...FEATURE_CARDS_STYLES.iconContainer,
          ...(theme.palette.mode === 'dark' 
            ? FEATURE_CARDS_STYLES.iconContainerDark 
            : FEATURE_CARDS_STYLES.iconContainerLight
          ),
        }}
      >
        <IconComponent
          sx={{
            ...FEATURE_CARDS_STYLES.icon,
            ...(theme.palette.mode === 'dark' 
              ? FEATURE_CARDS_STYLES.iconDark 
              : FEATURE_CARDS_STYLES.iconLight
            ),
          }}
        />
      </Box>
      
      <Typography
        variant="h6"
        sx={FEATURE_CARDS_STYLES.title}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        sx={FEATURE_CARDS_STYLES.description}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
