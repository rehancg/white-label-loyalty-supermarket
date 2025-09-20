import { CheckCircle, Refresh, BarChart } from '@mui/icons-material';

// Feature data
export const FEATURES = [
  {
    icon: CheckCircle,
    title: 'Smart Checkout Discounts',
    description: 'Automated BOGOF deals and tier-based rewards.',
  },
  {
    icon: Refresh,
    title: 'Loyalty Integration',
    description: 'Seamlessly merge loyalty points into every transaction.',
  },
  {
    icon: BarChart,
    title: 'More than points',
    description: 'Now real products, discounts and a shopping experience you will love..',
  },
] as const;

// Common styles
export const FEATURE_CARDS_STYLES = {
  container: {
    py: 6,
    backgroundColor: 'background.default',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      md: 'repeat(3, 1fr)',
    },
    gap: 4,
  },
  card: {
    backgroundColor: 'background.paper',
    borderRadius: 2,
    p: 3,
    height: '100%',
    border: '1px solid',
    borderColor: 'divider',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2,
  },
  iconContainerLight: {
    backgroundColor: '#F1F5F9',
  },
  iconContainerDark: {
    backgroundColor: 'grey.800',
  },
  icon: {
    fontSize: 32,
  },
  iconLight: {
    color: '#60A5FA',
  },
  iconDark: {
    color: 'primary.light',
  },
  title: {
    fontWeight: 600,
    mb: 1.5,
    color: 'text.primary',
    fontSize: '1.125rem',
  },
  description: {
    color: 'text.secondary',
    lineHeight: 1.6,
    fontSize: '0.875rem',
  },
} as const;
