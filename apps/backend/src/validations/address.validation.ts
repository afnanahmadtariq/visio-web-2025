import { z } from 'zod';

// Base schemas for field definitions
const addressBodySchema = z.object({
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

const addressUpdateBodySchema = addressBodySchema.partial();

const addressIdParamsSchema = z.object({
    id: z.string().cuid('Invalid address ID'),
});

/**
 * User Address Create Schema (wrapped for validateRequest middleware)
 */
export const AddressSchema = z.object({
    body: addressBodySchema,
});

/**
 * Address Update Schema (wrapped for validateRequest middleware)
 */
export const AddressUpdateSchema = z.object({
    body: addressUpdateBodySchema,
});

/**
 * Address ID Param Schema (wrapped for validateRequest middleware)
 */
export const AddressIdSchema = z.object({
    params: addressIdParamsSchema,
});

// Type exports (extract body types for controller use)
export type AddressInput = z.infer<typeof addressBodySchema>;
export type AddressUpdateInput = z.infer<typeof addressUpdateBodySchema>;
