'use client';

import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import FeatureCards from './FeatureCards';
import ProductsSection from './sections/ProductsSection';
import ErrorMessage from '../ui/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Product } from '@/types';
import { useProducts } from '@/hooks/useProducts';

const LandingPage: React.FC = () => {
  const { data: products = [], isLoading: loading, error, refetch } = useProducts();

  const handleAddToCart = (product: Product, quantity: number) => {
    // @TODO: Implement cart functionality
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <Box>
      <Hero />
      <FeatureCards />
      
      {loading && (
        <LoadingSpinner message="Loading products..." />
      )}
      
      {error && (
        <ErrorMessage message={error.message} onRetry={refetch} />
      )}
      
      {!loading && !error && (
        <ProductsSection products={products} onAddToCart={handleAddToCart} />
      )}
    </Box>
  );
};

export default LandingPage;
