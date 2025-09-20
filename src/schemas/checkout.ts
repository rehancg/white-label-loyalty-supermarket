import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { error: 'Password is required' })
    .min(6, { error: 'Password must be at least 6 characters' }),
});

// Shipping address validation schema
export const shippingSchema = z.object({
  firstName: z
    .string()
    .min(1, { error: 'First name is required' })
    .min(2, { error: 'First name must be at least 2 characters' })
    .max(50, { error: 'First name must be less than 50 characters' }),
  lastName: z
    .string()
    .min(1, { error: 'Last name is required' })
    .min(2, { error: 'Last name must be at least 2 characters' })
    .max(50, { error: 'Last name must be less than 50 characters' }),
  streetAddress: z
    .string()
    .min(1, { error: 'Street address is required' })
    .min(5, { error: 'Street address must be at least 5 characters' })
    .max(100, { error: 'Street address must be less than 100 characters' }),
  city: z
    .string()
    .min(1, { error: 'City is required' })
    .min(2, { error: 'City must be at least 2 characters' })
    .max(50, { error: 'City must be less than 50 characters' }),
  postalCode: z
    .string()
    .min(1, { error: 'Postal code is required' })
    .min(3, { error: 'Postal code must be at least 3 characters' })
    .max(10, { error: 'Postal code must be less than 10 characters' })
    .regex(/^[A-Za-z0-9\s-]+$/, { error: 'Postal code contains invalid characters' }),
  country: z
    .string()
    .min(1, { error: 'Country is required' }),
  state: z
    .string()
    .min(1, { error: 'State/Province is required' })
    .min(2, { error: 'State/Province must be at least 2 characters' })
    .max(50, { error: 'State/Province must be less than 50 characters' }),
});

// Payment form validation schema
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { error: 'Card number is required' })
    .regex(/^[0-9\s]+$/, { error: 'Card number must contain only numbers and spaces' })
    .refine((val) => {
      const cleaned = val.replace(/\s/g, '');
      return cleaned.length >= 13 && cleaned.length <= 19;
    }, { error: 'Card number must be between 13 and 19 digits' }),
  expiryDate: z
    .string()
    .min(1, { error: 'Expiry date is required' })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { error: 'Expiry date must be in MM/YY format' })
    .refine((val) => {
      const [month, year] = val.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      const expYear = parseInt(year);
      const expMonth = parseInt(month);
      
      if (expYear < currentYear) return false;
      if (expYear === currentYear && expMonth < currentMonth) return false;
      return true;
    }, { error: 'Card has expired' }),
  cvc: z
    .string()
    .min(1, { error: 'CVC is required' })
    .regex(/^[0-9]+$/, { error: 'CVC must contain only numbers' })
    .refine((val) => val.length >= 3 && val.length <= 4, { error: 'CVC must be 3 or 4 digits' }),
});

// Complete checkout form validation schema
export const checkoutSchema = z.object({
  checkoutMode: z.enum(['login', 'guest']),
  login: loginSchema.optional(),
  shipping: shippingSchema,
  payment: paymentSchema,
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
