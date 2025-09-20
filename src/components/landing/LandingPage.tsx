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
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';

const LandingPage: React.FC = () => {
  const { data: products = [], isLoading: loading, error, refetch } = useProducts();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleShopNowClick = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Box>
      <Hero onShopNowClick={handleShopNowClick} />
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
