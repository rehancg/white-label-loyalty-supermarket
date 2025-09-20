import React from 'react';
import { Alert, Typography, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  sx?: object;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, sx }) => {
  return (
    <Box sx={{ p: 3, ...sx }}>
      <Alert 
        severity="error" 
        action={
          onRetry && (
            <Typography 
              component="button" 
              onClick={onRetry}
              sx={{ 
                textDecoration: 'underline', 
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                color: 'inherit'
              }}
            >
              Retry
            </Typography>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
