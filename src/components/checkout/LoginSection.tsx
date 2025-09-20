import React from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { Login, Person } from '@mui/icons-material';
import { CHECKOUT_STYLES } from './constants';

interface LoginSectionProps {
  mode: 'login' | 'guest';
  onModeChange: (mode: 'login' | 'guest') => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ mode, onModeChange }) => {
  return (
    <Paper
      elevation={0}
      sx={CHECKOUT_STYLES.formSection.container}
      role="region"
      aria-labelledby="login-section-title"
    >
      <Box sx={CHECKOUT_STYLES.formSection.content}>
        <Typography
          variant="h6"
          sx={CHECKOUT_STYLES.formSection.title}
          id="login-section-title"
        >
          <Login sx={CHECKOUT_STYLES.formSection.titleIcon} aria-hidden="true" />
          Account & Login
        </Typography>

        {/* Mode Selection Buttons */}
        <Box 
          sx={CHECKOUT_STYLES.formSection.modeButtons}
          role="group"
          aria-label="Choose checkout method"
        >
          <Button
            variant={mode === 'login' ? 'contained' : 'outlined'}
            onClick={() => onModeChange('login')}
            sx={CHECKOUT_STYLES.formSection.modeButton}
            aria-pressed={mode === 'login'}
            aria-label="Login with existing account"
          >
            <Login sx={{ fontSize: '1rem', mr: 1 }} aria-hidden="true" />
            Login
          </Button>
          <Button
            variant={mode === 'guest' ? 'contained' : 'outlined'}
            onClick={() => onModeChange('guest')}
            sx={CHECKOUT_STYLES.formSection.modeButton}
            aria-pressed={mode === 'guest'}
            aria-label="Continue as guest without account"
          >
            <Person sx={{ fontSize: '1rem', mr: 1 }} aria-hidden="true" />
            Checkout as Guest
          </Button>
        </Box>

        {/* Login Form */}
        {mode === 'login' && (
          <Box 
            sx={CHECKOUT_STYLES.formSection.formContainer}
            role="form"
            aria-label="Login form"
          >
            <TextField
              fullWidth
              label="Email Address"
              placeholder="you@example.com"
              variant="outlined"
              type="email"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="email-help"
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="******"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="password-help"
            />
            
            <Button
              variant="contained"
              fullWidth
              sx={CHECKOUT_STYLES.formSection.button}
              aria-label="Login to your account"
            >
              Login
            </Button>
          </Box>
        )}

        {/* Guest Checkout Message */}
        {mode === 'guest' && (
          <Box 
            sx={CHECKOUT_STYLES.formSection.guestMessage}
            role="region"
            aria-label="Guest checkout information"
          >
            <Typography 
              variant="body2" 
              sx={CHECKOUT_STYLES.formSection.guestText}
            >
              Continue as guest to complete your purchase. You can create an account later.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default LoginSection;
