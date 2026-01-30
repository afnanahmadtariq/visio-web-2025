import { z } from 'zod';

// Base schemas for field definitions
const dummyPaymentBodySchema = z.object({
    orderId: z.string().cuid('Invalid order ID'),
    cardNumber: z
        .string()
        .regex(/^\d{16}$/, 'Card number must be 16 digits')
        .optional(),
    expiryMonth: z.coerce.number().int().min(1).max(12).optional(),
    expiryYear: z.coerce.number().int().min(2024).max(2099).optional(),
    cvv: z
        .string()
        .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
        .optional(),
});

const paymentQuerySchema = z.object({
    orderId: z.string().cuid('Invalid order ID').optional(),
    status: z.enum(['PENDING', 'SUCCESS', 'FAILED']).optional(),
});

/**
 * Dummy Payment Schema (wrapped for validateRequest middleware)
 */
export const DummyPaymentSchema = z.object({
    body: dummyPaymentBodySchema,
});

/**
 * Payment Query Schema (wrapped for validateRequest middleware)
 */
export const PaymentQuerySchema = z.object({
    query: paymentQuerySchema,
});

// Type exports (extract types for controller use)
export type DummyPaymentInput = z.infer<typeof dummyPaymentBodySchema>;
export type PaymentQueryInput = z.infer<typeof paymentQuerySchema>;
