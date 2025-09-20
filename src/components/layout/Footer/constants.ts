// Footer constants and static data
export const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/' },
  { label: 'Terms of Service', href: '/' },
] as const;

export const COMPANY_INFO = {
  name: 'White Label Loyalty Supermarket',
  year: new Date().getFullYear(),
} as const;

export const FOOTER_STYLES = {
  footer: {
    backgroundColor: 'background.paper',
    color: 'grey.100',
    mt: 'auto',
  },
  bottomBar: {
    py: 3,
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  bottomContentMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 2,
  },
  linksContainer: {
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap',
  },
  link: {
    color: 'grey.800',
    textDecoration: 'none',
    fontSize: '0.875rem',
    '&:hover': {
      color: 'primary.main',
    },
  },
  copyright: {
    color: 'grey.800',
  },
} as const;
