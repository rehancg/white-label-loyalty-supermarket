import React from 'react';
import { Box, Container } from '@mui/material';
import FeatureCard from './FeatureCard';
import { FEATURES, FEATURE_CARDS_STYLES } from './constants';

const FeatureCards: React.FC = () => {
  return (
    <Box sx={FEATURE_CARDS_STYLES.container}>
      <Container maxWidth="lg">
        <Box sx={FEATURE_CARDS_STYLES.grid}>
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureCards;
