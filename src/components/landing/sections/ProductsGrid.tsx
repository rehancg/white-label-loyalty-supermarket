import React from 'react';
import { Box } from '@mui/material';
import ProductCard from '../ProductCard';
import { LANDING_PAGE_STYLES } from './constants';
import { Product } from '../data';

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, onAddToCart }) => {
  return (
    <Box sx={LANDING_PAGE_STYLES.productsGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </Box>
  );
};

export default ProductsGrid;
