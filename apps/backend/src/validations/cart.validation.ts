import { z } from 'zod';

// Base schemas for field definitions
const addToCartBodySchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
});

const updateCartItemBodySchema = z.object({
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
});

const cartItemIdParamsSchema = z.object({
    itemId: z.string().cuid('Invalid cart item ID'),
});

/**
 * Add to Cart Schema (wrapped for validateRequest middleware)
 */
export const AddToCartSchema = z.object({
    body: addToCartBodySchema,
});

/**
 * Update Cart Item Schema (wrapped for validateRequest middleware)
 */
export const UpdateCartItemSchema = z.object({
    body: updateCartItemBodySchema,
});

/**
 * Cart Item ID Param Schema (wrapped for validateRequest middleware)
 */
export const CartItemIdSchema = z.object({
    params: cartItemIdParamsSchema,
});

// Type exports (extract body types for controller use)
export type AddToCartInput = z.infer<typeof addToCartBodySchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemBodySchema>;
