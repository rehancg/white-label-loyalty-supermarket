import React from 'react';
import { Box, Typography, TextField, Paper, MenuItem } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { CHECKOUT_STYLES } from './constants';

const ShippingSection: React.FC = () => {
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
          sx={CHECKOUT_STYLES.formSection.formContainer}
          role="form"
          aria-label="Shipping address form"
        >
          {/* Name Fields */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="first-name-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'First name',
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="last-name-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'Last name',
                },
              }}
            />
          </Box>

          {/* Street Address */}
          <TextField
            fullWidth
            label="Street Address"
            variant="outlined"
            sx={CHECKOUT_STYLES.formSection.textField}
            aria-required="true"
            aria-describedby="street-address-help"
            slotProps={{
              htmlInput: {
                'aria-label': 'Street address',
              },
            }}
          />

          {/* City and Postal Code */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="city-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'City',
                },
              }}
            />
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="postal-code-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'Postal code',
                },
              }}
            />
          </Box>

          {/* Country and State */}
          <Box sx={CHECKOUT_STYLES.formSection.rowContainer}>
            <TextField
              fullWidth
              select
              label="Country"
              defaultValue="US"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="country-help"
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
            <TextField
              fullWidth
              label="State/Province"
              variant="outlined"
              sx={CHECKOUT_STYLES.formSection.textField}
              aria-required="true"
              aria-describedby="state-help"
              slotProps={{
                htmlInput: {
                  'aria-label': 'State or province',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ShippingSection;
