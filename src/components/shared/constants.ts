// OrderSummary constants and styles
export const ORDER_SUMMARY_STYLES = {
  container: {
    borderRadius: 3,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    backgroundColor: 'background.paper',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    },
  },
  header: {
    p: 2.5,
    borderBottom: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.default',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '1.125rem',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  headerIcon: {
    fontSize: '1.25rem',
    color: 'primary.main',
  },
  content: {
    p: 2.5,
  },
  cartItemsContainer: {
    mb: 2,
  },
  cartItem: {
    mb: 1.5,
    p: 1.5,
    borderRadius: 2,
    backgroundColor: 'background.default',
    border: '1px solid',
    borderColor: 'divider',
  },
  cartItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0.5,
  },
  cartItemName: {
    fontWeight: 500,
    fontSize: '0.875rem',
    color: 'text.primary',
  },
  cartItemPrice: {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'text.primary',
  },
  cartItemQuantity: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    fontWeight: 500,
  },
  divider: {
    my: 2,
    borderColor: 'divider',
  },
  summaryContainer: {
    mb: 2,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
    py: 0.5,
  },
  summaryLabel: {
    fontSize: '0.875rem',
    color: 'text.secondary',
    fontWeight: 500,
  },
  summaryValue: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'text.primary',
  },
  discountLabel: {
    fontSize: '0.875rem',
    color: 'success.main',
    fontWeight: 500,
  },
  discountValue: {
    fontSize: '0.875rem',
    color: 'success.main',
    fontWeight: 500,
  },
  totalDiscountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
    pb: 1,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  totalDiscountLabel: {
    fontSize: '0.875rem',
    color: 'success.main',
    fontWeight: 600,
  },
  totalDiscountValue: {
    fontSize: '0.875rem',
    color: 'success.main',
    fontWeight: 600,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    pt: 1,
    borderTop: '2px solid',
    borderColor: 'primary.main',
  },
  totalLabel: {
    fontWeight: 700,
    fontSize: '1.125rem',
    color: 'text.primary',
  },
  totalValue: {
    fontWeight: 700,
    color: 'primary.main',
    fontSize: '1.25rem',
  },
  actionButton: {
    py: 1.5,
    fontWeight: 600,
    borderRadius: 2,
    fontSize: '1rem',
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
} as const;
