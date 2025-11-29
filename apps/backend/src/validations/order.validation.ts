import { z } from 'zod';

/**
 * Checkout Schema
 */
export const CheckoutSchema = z.object({
    shippingAddressId: z.string().cuid('Invalid shipping address ID'),
    billingAddressId: z.string().cuid('Invalid billing address ID').optional(),
    paymentMethod: z.enum(['CREDIT', 'DUMMY', 'CASH'], {
        errorMap: () => ({ message: 'Invalid payment method' }),
    }),
    useSameAddressForBilling: z.boolean().optional().default(true),
});

/**
 * Order Status Update Schema (Admin)
 */
export const OrderStatusUpdateSchema = z.object({
    status: z.enum(['PENDING', 'PAID', 'FAILED', 'CANCELLED', 'SHIPPED', 'COMPLETED'], {
        errorMap: () => ({ message: 'Invalid order status' }),
    }),
});

/**
 * Order Query Schema
 */
export const OrderQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(50).optional().default(10),
    status: z
        .enum(['PENDING', 'PAID', 'FAILED', 'CANCELLED', 'SHIPPED', 'COMPLETED'])
        .optional(),
});

/**
 * Order ID Param Schema
 */
export const OrderIdSchema = z.object({
    id: z.string().cuid('Invalid order ID'),
});

// Type exports
export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type OrderStatusUpdateInput = z.infer<typeof OrderStatusUpdateSchema>;
export type OrderQueryInput = z.infer<typeof OrderQuerySchema>;
