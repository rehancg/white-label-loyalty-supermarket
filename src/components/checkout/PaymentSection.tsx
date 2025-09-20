import React, { forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CHECKOUT_STYLES } from './constants';
import { paymentSchema, PaymentFormData } from '@/schemas/checkout';

// Utility functions for card number formatting
const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Limit to 16 digits maximum
  const limited = cleaned.substring(0, 16);
  
  // Add spaces every 4 digits
  const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  return formatted;
};

const formatExpiryDate = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Add slash after 2 digits
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  }
  
  return cleaned;
};

interface PaymentSectionProps {
  onPaymentSubmit?: (data: PaymentFormData) => void;
}

export interface PaymentSectionRef {
  trigger: () => Promise<boolean>;
  getValues: () => PaymentFormData;
}

const PaymentSection = forwardRef<PaymentSectionRef, PaymentSectionProps>(({ onPaymentSubmit }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  useImperativeHandle(ref, () => ({
    trigger: async () => {
      return await trigger();
    },
    getValues: () => {
      return getValues();
    },
  }));

  const onSubmit = (data: PaymentFormData) => {
    if (onPaymentSubmit) {
      onPaymentSubmit(data);
    }
  };

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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={CHECKOUT_STYLES.formSection.formContainer}
          role="form"
          aria-label="Payment information form"
          noValidate
        >
          {/* Card Number */}
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                variant="outlined"
                sx={CHECKOUT_STYLES.formSection.textField}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                aria-required="true"
                aria-invalid={!!errors.cardNumber}
                aria-describedby={errors.cardNumber ? 'card-number-error' : 'card-number-help'}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  field.onChange(formatted);
                }}
                slotProps={{
                  htmlInput: {
                    'aria-label': 'Credit card number',
                    maxLength: 23, // Increased to accommodate spaces
                  },
                }}
              />
            )}
          />

          {/* Expiry and CVC */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                  aria-required="true"
                  aria-invalid={!!errors.expiryDate}
                  aria-describedby={errors.expiryDate ? 'expiry-error' : 'expiry-help'}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    field.onChange(formatted);
                  }}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'Card expiry date in MM/YY format',
                      maxLength: 5,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="cvc"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="CVC"
                  placeholder="123"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.cvc}
                  helperText={errors.cvc?.message}
                  aria-required="true"
                  aria-invalid={!!errors.cvc}
                  aria-describedby={errors.cvc ? 'cvc-error' : 'cvc-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'Card verification code',
                      maxLength: 4,
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
});

PaymentSection.displayName = 'PaymentSection';

export default PaymentSection;
