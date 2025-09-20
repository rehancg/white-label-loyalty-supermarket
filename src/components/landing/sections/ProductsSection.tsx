import React from 'react';
import { Container } from '@mui/material';
import ProductsHeader from './ProductsHeader';
import ProductsGrid from './ProductsGrid';
import { LANDING_PAGE_STYLES } from './constants';
import { Product } from '@/types';

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products, onAddToCart }) => {
  return (
    <Container maxWidth="lg" sx={LANDING_PAGE_STYLES.container}>
      <ProductsHeader />
      <ProductsGrid products={products} onAddToCart={onAddToCart} />
    </Container>
  );
};

export default ProductsSection;
