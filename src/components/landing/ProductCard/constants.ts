export const PRODUCT_ICONS = {
  bakery: '🍰',
  'pet care': '🐱',
  vegetables: '🥬',
  fruits: '🍎',
  beverages: '☕',
  default: '📦',
} as const;

// Common styles
export const PRODUCT_CARD_STYLES = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  imageContainer: {
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainerLight: {
    backgroundColor: '#F8FAFC',
  },
  imageContainerDark: {
    backgroundColor: 'grey.800',
  },
  productIcon: {
    fontSize: '3rem',
  },
  categoryChip: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'primary.main',
    color: 'white',
    fontWeight: 500,
    fontSize: '0.75rem',
    borderRadius: 1,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    p: 3,
  },
  title: {
    fontWeight: 600,
    mb: 1.5,
    color: 'text.primary',
    lineHeight: 1.3,
    fontSize: '1.125rem',
  },
  description: {
    mb: 2,
    flexGrow: 1,
    lineHeight: 1.5,
    fontSize: '0.875rem',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  price: {
    fontWeight: 700,
    color: 'text.primary',
    fontSize: '1.25rem',
  },
  addButton: {
    borderRadius: 1.5,
    py: 1.25,
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.875rem',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
  },
} as const;

export const getProductIcon = (category: string): string => {
  const normalizedCategory = category.toLowerCase();
  return PRODUCT_ICONS[normalizedCategory as keyof typeof PRODUCT_ICONS] || PRODUCT_ICONS.default;
};
