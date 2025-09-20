'use client';

import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import FeatureCards from './FeatureCards';
import ProductsSection from './sections/ProductsSection';
import { SAMPLE_PRODUCTS, Product } from './data';

const LandingPage: React.FC = () => {
  const handleAddToCart = (product: Product, quantity: number) => {
    // @TODO: Implement cart functionality
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <Box>
      <Hero />
      <FeatureCards />
      <ProductsSection products={SAMPLE_PRODUCTS} onAddToCart={handleAddToCart} />
    </Box>
  );
};

export default LandingPage;
