import { z } from 'zod';

// Base schemas for field definitions
const checkoutBodySchema = z.object({
    shippingAddressId: z.string().cuid('Invalid shipping address ID'),
    billingAddressId: z.string().cuid('Invalid billing address ID').optional(),
    paymentMethod: z.enum(['CREDIT', 'DUMMY', 'CASH'], {
        errorMap: () => ({ message: 'Invalid payment method' }),
    }),
    useSameAddressForBilling: z.boolean().optional().default(true),
});

const orderStatusUpdateBodySchema = z.object({
    status: z.enum(['PENDING', 'PAID', 'FAILED', 'CANCELLED', 'SHIPPED', 'COMPLETED'], {
        errorMap: () => ({ message: 'Invalid order status' }),
    }),
});

const orderQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(50).optional().default(10),
    status: z
        .enum(['PENDING', 'PAID', 'FAILED', 'CANCELLED', 'SHIPPED', 'COMPLETED'])
        .optional(),
});

const orderIdParamsSchema = z.object({
    id: z.string().cuid('Invalid order ID'),
});

/**
 * Checkout Schema (wrapped for validateRequest middleware)
 */
export const CheckoutSchema = z.object({
    body: checkoutBodySchema,
});

/**
 * Order Status Update Schema (Admin) (wrapped for validateRequest middleware)
 */
export const OrderStatusUpdateSchema = z.object({
    body: orderStatusUpdateBodySchema,
});

/**
 * Order Query Schema (wrapped for validateRequest middleware)
 */
export const OrderQuerySchema = z.object({
    query: orderQuerySchema,
});

/**
 * Order ID Param Schema (wrapped for validateRequest middleware)
 */
export const OrderIdSchema = z.object({
    params: orderIdParamsSchema,
});

// Type exports (extract types for controller use)
export type CheckoutInput = z.infer<typeof checkoutBodySchema>;
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateBodySchema>;
export type OrderQueryInput = z.infer<typeof orderQuerySchema>;
