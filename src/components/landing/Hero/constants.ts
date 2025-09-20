import { ArrowForward } from '@mui/icons-material';

// Hero content data
export const HERO_CONTENT = {
  title: 'Your Loyalty Platform, Now Powering Groceries',
  subtitle: 'Your white-label solution now powers grocery shopping with effortless ordering and intelligent rewards.',
  primaryButton: {
    text: 'Shop Now',
    icon: ArrowForward,
  },
} as const;

// Common styles
export const HERO_STYLES = {
  container: {
    py: { xs: 6, md: 8 },
    mb: 6,
  },
  containerLight: {
    backgroundColor: '#F8FAFC',
  },
  containerDark: {
    backgroundColor: 'grey.900',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    gap: 4,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontWeight: 700,
    mb: 3,
    fontSize: { xs: '2.5rem', md: '3.5rem' },
    lineHeight: 1.1,
    color: 'text.primary',
  },
  subtitle: {
    mb: 4,
    fontSize: { xs: '1.1rem', md: '1.25rem' },
    fontWeight: 400,
    lineHeight: 1.6,
    color: 'text.secondary',
  },
  buttonContainer: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  },
  primaryButton: {
    px: 3,
    py: 1.5,
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: 1.5,
    boxShadow: '0 2px 8px rgba(0,97,213,0.3)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,97,213,0.4)',
    },
    transition: 'all 0.2s ease',
    minWidth: '160px',
  },
  illustrationContainer: {
    flex: 1,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: { xs: '300px', md: '400px' },
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto'
  },
} as const;
