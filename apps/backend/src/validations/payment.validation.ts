import { z } from 'zod';

/**
 * Dummy Payment Schema
 */
export const DummyPaymentSchema = z.object({
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

/**
 * Payment Query Schema
 */
export const PaymentQuerySchema = z.object({
    orderId: z.string().cuid('Invalid order ID').optional(),
    status: z.enum(['PENDING', 'SUCCESS', 'FAILED']).optional(),
});

// Type exports
export type DummyPaymentInput = z.infer<typeof DummyPaymentSchema>;
export type PaymentQueryInput = z.infer<typeof PaymentQuerySchema>;
