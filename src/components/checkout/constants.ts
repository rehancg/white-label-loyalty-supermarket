// Checkout constants and styles
export const CHECKOUT_STYLES = {
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
    layoutContainer: {
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: 4,
      mt: 4,
    },
    leftColumn: {
      flex: { lg: '2 1 0' },
    },
    formsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
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

  header: {
    container: {
      mb: 2,
    },
    title: {
      fontWeight: 700,
      mb: 2,
      fontSize: { xs: '1.75rem', md: '2.125rem' },
      color: 'text.primary',
    },
    subtitle: {
      fontSize: { xs: '1rem', md: '1.125rem' },
      fontWeight: 400,
      color: 'text.secondary',
      maxWidth: '600px',
    },
  },
  cartSummary: {
    container: {},
  },

  // Form sections styles
  formSection: {
    container: {
      borderRadius: 3,
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      backgroundColor: 'background.paper',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
    content: {
      p: 3,
    },
    title: {
      fontWeight: 600,
      mb: 3,
      color: 'text.primary',
      fontSize: '1.125rem',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    titleIcon: {
      fontSize: '1.25rem',
      color: 'primary.main',
    },
    welcomeContainer: {
      backgroundColor: 'success.light',
      borderRadius: 2,
      p: 3,
      mb: 3,
      border: '1px solid',
      borderColor: 'success.main',
    },
    welcomeTitle: {
      fontWeight: 600,
      color: 'success.dark',
      mb: 1,
    },
    welcomeText: {
      fontWeight: 500,
      color: 'text.primary',
      mb: 1,
    },
    welcomeSubtext: {
      color: 'text.secondary',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    rowContainer: {
      display: 'flex',
      gap: 2,
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
      },
    },
    button: {
      py: 1.5,
      fontWeight: 600,
      borderRadius: 2,
      fontSize: '0.875rem',
      boxShadow: 'none',
      textTransform: 'none',
      '&:hover': {
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      },
    },
    modeButtons: {
      display: 'flex',
      gap: 1,
      mb: 3,
    },
    modeButton: {
      flex: 1,
      py: 1.5,
      fontWeight: 600,
      borderRadius: 2,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    guestMessage: {
      textAlign: 'center',
      py: 2,
    },
    guestText: {
      color: 'text.secondary',
      fontSize: '0.875rem',
    },
  },

  // Order Success Modal styles
  orderSuccessModal: {
    dialog: {
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pb: 1,
    },
    titleContent: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    successIcon: {
      color: 'success.main',
      fontSize: 28,
    },
    titleText: {
      fontWeight: 600,
    },
    closeButton: {
      color: 'text.secondary',
    },
    content: {
      pt: 3,
      pb: 2,
    },
    messageContainer: {
      textAlign: 'center',
      mb: 3,
    },
    messageText: {
      mb: 2,
      lineHeight: 1.6,
    },
    orderIdContainer: {
      backgroundColor: 'grey.50',
      borderRadius: 1,
      p: 2,
      border: '1px solid',
      borderColor: 'grey.200',
    },
    orderIdLabel: {
      mb: 0.5,
    },
    orderIdValue: {
      fontFamily: 'monospace',
      fontWeight: 600,
      color: 'primary.main',
    },
    confirmationText: {
      textAlign: 'center',
      lineHeight: 1.5,
    },
    actions: {
      p: 3,
      pt: 2,
    },
    okButton: {
      py: 1.5,
      fontWeight: 600,
      borderRadius: 2,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },

  // Empty Cart styles
  emptyCart: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      gap: 3,
    },
    icon: {
      fontSize: 80,
      color: 'text.secondary',
      opacity: 0.5,
    },
    title: {
      fontWeight: 600,
      color: 'text.primary',
      mb: 2,
    },
    message: {
      color: 'text.secondary',
      maxWidth: '400px',
      mb: 3,
    },
    continueButton: {
      py: 1.5,
      px: 4,
      fontWeight: 600,
      borderRadius: 2,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
} as const;
