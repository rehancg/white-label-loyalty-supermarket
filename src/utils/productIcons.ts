// Shared product icons mapping
export const PRODUCT_ICONS = {
  bakery: '🍰',
  'pet care': '🐱',
  vegetables: '🥬',
  fruits: '🍎',
  beverages: '☕',
  default: '📦',
} as const;

// Helper function to get product icon based on category
export const getProductIcon = (category: string): string => {
  const normalizedCategory = category.toLowerCase();
  return PRODUCT_ICONS[normalizedCategory as keyof typeof PRODUCT_ICONS] || PRODUCT_ICONS.default;
};
