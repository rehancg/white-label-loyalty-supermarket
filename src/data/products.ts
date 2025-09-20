import { Product } from '@/types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'CA6',
    name: 'Cake',
    price: 2.00,
    currency: 'GBP',
    currencySymbol: '£',
    description: 'Delicious homemade cake perfect for celebrations and special occasions.',
    category: 'Bakery',
    inStock: true,
    isBogof: false,
  },
  {
    id: 'A21',
    name: 'Kitty Litter',
    price: 18.99,
    currency: 'GBP',
    currencySymbol: '£',
    description: 'Premium clumping cat litter for superior odor control and easy cleanup.',
    category: 'Pet Care',
    inStock: true,
    isBogof: false,
  },
  {
    id: 'G95',
    name: 'Asparagus',
    price: 0.83,
    currency: 'GBP',
    currencySymbol: '£',
    description: 'Fresh green asparagus spears, perfect for healthy cooking and grilling.',
    category: 'Vegetables',
    inStock: true,
    isBogof: true,
  },
] as const;
