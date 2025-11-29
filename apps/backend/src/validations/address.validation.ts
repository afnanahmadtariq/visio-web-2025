import { z } from 'zod';

/**
 * User Address Create/Update Schema
 */
export const AddressSchema = z.object({
  label: z.string().max(50, 'Label too long').optional().nullable(),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name too long'),
  line1: z
    .string()
    .min(5, 'Address line 1 must be at least 5 characters')
    .max(200, 'Address line 1 too long'),
  line2: z.string().max(200, 'Address line 2 too long').optional().nullable(),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City name too long'),
  state: z.string().max(100, 'State name too long').optional().nullable(),
  postalCode: z.string().max(20, 'Postal code too long').optional().nullable(),
  country: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country name too long'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional()
    .nullable(),
  isDefault: z.boolean().optional().default(false),
});

/**
 * Address Update Schema
 */
export const AddressUpdateSchema = AddressSchema.partial();

/**
 * Address ID Param Schema
 */
export const AddressIdSchema = z.object({
  id: z.string().cuid('Invalid address ID'),
});

// Type exports
export type AddressInput = z.infer<typeof AddressSchema>;
export type AddressUpdateInput = z.infer<typeof AddressUpdateSchema>;
