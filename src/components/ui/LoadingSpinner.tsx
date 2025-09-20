import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  sx?: object;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, sx }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, ...sx }}>
      <CircularProgress />
      {message && (
        <Box sx={{ mt: 2, color: 'text.secondary' }}>
          {message}
        </Box>
      )}
    </Box>
  );
};

export default LoadingSpinner;
