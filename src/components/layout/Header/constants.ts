// Header constants and static data
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
] as const;

export const MOBILE_DRAWER_WIDTH = 250;

// Common styles
export const HEADER_STYLES = {
  appBar: {
    backgroundColor: 'background.paper',
    color: 'text.primary',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  toolbar: {
    justifyContent: 'space-between',
    py: 1,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoIcon: {
    fontSize: 32,
    color: 'primary.main',
    mr: 1,
  },
  logoText: {
    fontWeight: 700,
    color: 'primary.main',
    lineHeight: 1.2,
  },
  logoSubtext: {
    color: 'text.secondary',
    fontSize: '0.7rem',
  },
  searchContainer: {
    flexGrow: 1,
    maxWidth: 600,
    mx: 4,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'grey.50',
    borderRadius: 2,
    px: 2,
    py: 1,
    border: '1px solid',
    borderColor: 'grey.200',
    '&:focus-within': {
      borderColor: 'primary.main',
      backgroundColor: 'background.paper',
    },
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  iconButton: {
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  languageButton: {
    color: 'text.primary',
    textTransform: 'none',
    minWidth: 'auto',
    px: 1,
  },
  drawer: {
    width: MOBILE_DRAWER_WIDTH,
  },
  drawerHeader: {
    p: 2,
    textAlign: 'center',
  },
  drawerLogo: {
    fontSize: 40,
    color: 'primary.main',
    mb: 1,
  },
  listItem: {
    cursor: 'pointer',
  },
} as const;
