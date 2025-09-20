import React from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { CHECKOUT_STYLES } from './constants';

const PaymentSection: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={CHECKOUT_STYLES.formSection.container}
      role="region"
      aria-labelledby="payment-section-title"
    >
      <Box sx={CHECKOUT_STYLES.formSection.content}>
        <Typography
          variant="h6"
          sx={CHECKOUT_STYLES.formSection.title}
          id="payment-section-title"
        >
          <CreditCard sx={CHECKOUT_STYLES.formSection.titleIcon} aria-hidden="true" />
          Payment Details
        </Typography>

        <Box 
          sx={CHECKOUT_STYLES.formSection.formContainer}
          role="form"
          aria-label="Payment information form"
        >
          {/* Card Number */}
          <TextField
            fullWidth
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            variant="outlined"
            sx={CHECKOUT_STYLES.formSection.textField}
            aria-required="true"
            aria-describedby="card-number-help"
            slotProps={{
              htmlInput: {
                'aria-label': 'Credit card number',
              },
            }}
          />

          {/* Expiry and CVC */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <TextField
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="expiry-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'Card expiry date in MM/YY format',
                  maxLength: 5,
                },
              }}
            />
            <TextField
              fullWidth
              label="CVC"
              placeholder="123"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="cvc-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'Card verification code',
                  maxLength: 4,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PaymentSection;
