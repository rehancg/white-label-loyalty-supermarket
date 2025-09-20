'use client';

import { useQuery } from '@tanstack/react-query';
import { Product, ProductsResponse } from '@/types';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  const result: ProductsResponse = await response.json();
  
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to fetch products');
  }
  
  return result.data || [];
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};