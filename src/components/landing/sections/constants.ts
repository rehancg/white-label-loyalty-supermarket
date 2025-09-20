// Landing page constants
export const LANDING_PAGE_CONSTANTS = {
  productsSection: {
    title: 'Shop Our Products',
    subtitle: 'Discover our carefully curated selection of premium products with loyalty rewards on every purchase.',
  },
} as const;

// Common styles
export const LANDING_PAGE_STYLES = {
  container: {
    py: 6,
  },
  productsHeader: {
    textAlign: 'center',
    mb: 6,
  },
  productsTitle: {
    fontWeight: 700,
    mb: 2,
    fontSize: { xs: '1.75rem', md: '2.125rem' },
    color: 'text.primary',
  },
  productsSubtitle: {
    fontSize: { xs: '1rem', md: '1.125rem' },
    fontWeight: 400,
    color: 'text.secondary',
    maxWidth: '600px',
    mx: 'auto',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
    },
    gap: 3,
  },
} as const;
