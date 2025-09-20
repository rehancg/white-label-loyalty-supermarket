export const CART_STYLES = {
  header: {
    container: {
      textAlign: 'center',
      mb: 4,
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 2,
    },
    cartIcon: {
      fontSize: '2.5rem',
      color: 'primary.main',
      mr: 2,
    },
    title: {
      fontWeight: 700,
      fontSize: { xs: '1.75rem', md: '2.125rem' },
      color: 'text.primary',
    },
    subtitle: {
      fontSize: { xs: '1rem', md: '1.125rem' },
      fontWeight: 400,
      color: 'text.secondary',
      maxWidth: '600px',
      mx: 'auto',
      mb: 2,
    },
    itemCountChip: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  page: {
    pageContainer: {
      backgroundColor: 'background.default',
      minHeight: '100vh',
    },
    container: {
      py: 4,
    },
    backButton: {
      mb: 3,
      color: 'text.secondary',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    },
    emptyCartContainer: {
      textAlign: 'center',
      py: 8,
    },
    emptyCartIcon: {
      fontSize: '4rem',
      color: 'text.disabled',
      mb: 2,
    },
    emptyCartTitle: {
      fontWeight: 600,
      mb: 2,
      color: 'text.primary',
    },
    emptyCartSubtitle: {
      color: 'text.secondary',
      mb: 4,
    },
    continueShoppingButton: {
      px: 4,
    },
    layoutContainer: {
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: 4,
      mt: 2,
    },
    leftColumn: {
      flex: { lg: '2 1 0' },
    },
    rightColumn: {
      flex: { lg: '1 1 0' },
      minWidth: { lg: '350px' },
    },
    stickyContainer: {
      position: 'sticky',
      top: 24,
    },
  },

  // ProductSummary styles
  productSummary: {
    container: {
      // Container styles
    },
    sectionTitle: {
      fontWeight: 600,
      mb: 3,
      color: 'text.primary',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    sectionIcon: {
      fontSize: '1.5rem',
      color: 'primary.main',
    },
    itemsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    },
    productCard: {
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        borderColor: 'primary.light',
      },
    },
    cardContent: {
      p: 3,
    },
    productLayout: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 3,
    },
    productIcon: {
      width: 90,
      height: 90,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      flexShrink: 0,
      border: '2px solid',
      borderColor: 'divider',
    },
    productIconText: {
      fontSize: '2.5rem',
    },
    bogofChip: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: 'secondary.main',
      color: 'white',
      fontWeight: 600,
      fontSize: '0.7rem',
      borderRadius: 1,
      boxShadow: 2,
    },
    productDetails: {
      flexGrow: 1,
      minWidth: 0,
    },
    productHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      mb: 1,
    },
    productName: {
      fontWeight: 600,
      color: 'text.primary',
      fontSize: '1.125rem',
      lineHeight: 1.3,
    },
    productPrice: {
      fontWeight: 700,
      color: 'primary.main',
      fontSize: '1.25rem',
    },
    productDescription: {
      mb: 2,
      lineHeight: 1.5,
      fontSize: '0.875rem',
      color: 'text.secondary',
    },
    quantityAndTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    quantitySection: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    },
    quantityLabel: {
      fontSize: '0.875rem',
      color: 'text.secondary',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      border: '2px solid',
      borderColor: 'divider',
      borderRadius: 2,
      backgroundColor: 'background.paper',
      overflow: 'hidden',
    },
    quantityButton: {
      p: 1,
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'error.light',
        color: 'error.contrastText',
      },
    },
    quantityButtonIncrease: {
      p: 1,
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'success.light',
        color: 'success.contrastText',
      },
    },
    quantityDisplay: {
      px: 2,
      minWidth: '40px',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: '1rem',
      backgroundColor: 'background.default',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: 'divider',
    },
    totalSection: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    },
    itemTotal: {
      fontWeight: 700,
      color: 'text.primary',
      fontSize: '1.125rem',
    },
    removeButton: {
      color: 'error.main',
      '&:hover': {
        backgroundColor: 'error.light',
        color: 'error.contrastText',
      },
    },
  },
} as const;
