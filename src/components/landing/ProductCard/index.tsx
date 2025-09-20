import React from 'react';
import { Card, CardContent } from '@mui/material';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';
import { PRODUCT_CARD_STYLES } from './constants';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card sx={PRODUCT_CARD_STYLES.card}>
      <ProductImage product={product} />
      
      <CardContent sx={PRODUCT_CARD_STYLES.content}>
        <ProductInfo product={product} />
        <ProductActions product={product} onAddToCart={onAddToCart} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
