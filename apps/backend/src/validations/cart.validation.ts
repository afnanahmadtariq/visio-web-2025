import { z } from 'zod';

/**
 * Add to Cart Schema
 */
export const AddToCartSchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
});

/**
 * Update Cart Item Schema
 */
export const UpdateCartItemSchema = z.object({
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
});

/**
 * Cart Item ID Param Schema
 */
export const CartItemIdSchema = z.object({
    itemId: z.string().cuid('Invalid cart item ID'),
});

// Type exports
export type AddToCartInput = z.infer<typeof AddToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>;
