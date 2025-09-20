import { createTheme } from '@mui/material/styles';

export const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: 'var(--font-open-sans), "Open Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
  },
} as const;

export const COMPONENT_OVERRIDES = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 12,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: '0 12px 12px 0',
      },
    },
  },
} as const;

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0061D5',   // a strong, professional blue (similar to what their CTAs likely use)
      light: '#338AF2',
      dark: '#004FB5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00C4CC',   // a teal-cyan accent for secondary (subtle, modern)
      light: '#6FF7FC',
      dark: '#0098A0',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2ECC71',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E74C3C',
      light: '#F1948A',
      dark: '#C0392B',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F1C40F',
      light: '#F7DC6F',
      dark: '#B7950B',
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F7FAFC',  // very light grey-blue hint
    },
    text: {
      primary: '#121212',  // dark but soft
      secondary: '#4A4A4A',
    },
    divider: '#E5E8EB',   // light grey-blue
  },
  breakpoints: BREAKPOINTS,
  typography: TYPOGRAPHY,
  shape: {
    borderRadius: 8,
  },
  components: COMPONENT_OVERRIDES,
});


// Dark Theme (revised)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#338AF2',
      light: '#5AAEFF',
      dark: '#0061D5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00A5AD',
      light: '#33C9D0',
      dark: '#008189',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2ECC71',
      contrastText: '#000000',
    },
    error: {
      main: '#E74C3C',
      light: '#F1948A',
      dark: '#C0392B',
      contrastText: '#000000',
    },
    warning: {
      main: '#F1C40F',
      light: '#F7DC6F',
      dark: '#B7950B',
      contrastText: '#000000',
    },
    background: {
      default: '#121A26',   // very dark navy/charcoal
      paper: '#1E2733',     // slightly lighter surface
    },
    text: {
      primary: '#E5E5E5',
      secondary: '#A0A0A0',
    },
    divider: '#2A3545',
  },
  breakpoints: BREAKPOINTS,
  typography: TYPOGRAPHY,
  shape: {
    borderRadius: 8,
  },
  components: COMPONENT_OVERRIDES,
});
