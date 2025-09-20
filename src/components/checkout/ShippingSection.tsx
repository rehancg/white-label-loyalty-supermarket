import React, { forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Paper, MenuItem } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CHECKOUT_STYLES } from './constants';
import { shippingSchema, ShippingFormData } from '@/schemas/checkout';

interface ShippingSectionProps {
  onShippingSubmit?: (data: ShippingFormData) => void;
}

export interface ShippingSectionRef {
  trigger: () => Promise<boolean>;
  getValues: () => ShippingFormData;
}

const ShippingSection = forwardRef<ShippingSectionRef, ShippingSectionProps>(({ onShippingSubmit }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      country: 'UK',
      state: '',
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

  const onSubmit = (data: ShippingFormData) => {
    if (onShippingSubmit) {
      onShippingSubmit(data);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={CHECKOUT_STYLES.formSection.container}
      role="region"
      aria-labelledby="shipping-section-title"
    >
      <Box sx={CHECKOUT_STYLES.formSection.content}>
        <Typography
          variant="h6"
          sx={CHECKOUT_STYLES.formSection.title}
          id="shipping-section-title"
        >
          <LocalShipping sx={CHECKOUT_STYLES.formSection.titleIcon} aria-hidden="true" />
          Shipping Address
        </Typography>

        <Box 
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={CHECKOUT_STYLES.formSection.formContainer}
          role="form"
          aria-label="Shipping address form"
          noValidate
        >
          {/* Name Fields */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'first-name-error' : 'first-name-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'First name',
                    },
                  }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'last-name-error' : 'last-name-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'Last name',
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Street Address */}
          <Controller
            name="streetAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Street Address"
                variant="outlined"
                sx={CHECKOUT_STYLES.formSection.textField}
                error={!!errors.streetAddress}
                helperText={errors.streetAddress?.message}
                aria-required="true"
                aria-invalid={!!errors.streetAddress}
                aria-describedby={errors.streetAddress ? 'street-address-error' : 'street-address-help'}
                slotProps={{
                  htmlInput: {
                    'aria-label': 'Street address',
                  },
                }}
              />
            )}
          />

          {/* City and Postal Code */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  aria-required="true"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'city-error' : 'city-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'City',
                    },
                  }}
                />
              )}
            />
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                  aria-required="true"
                  aria-invalid={!!errors.postalCode}
                  aria-describedby={errors.postalCode ? 'postal-code-error' : 'postal-code-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'Postal code',
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Country and State */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Country"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  aria-required="true"
                  aria-invalid={!!errors.country}
                  aria-describedby={errors.country ? 'country-error' : 'country-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'Country',
                    },
                  }}
                >
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State/Province"
                  variant="outlined"
                  sx={CHECKOUT_STYLES.formSection.textField}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  aria-required="true"
                  aria-invalid={!!errors.state}
                  aria-describedby={errors.state ? 'state-error' : 'state-help'}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'State or province',
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

ShippingSection.displayName = 'ShippingSection';

export default ShippingSection;
