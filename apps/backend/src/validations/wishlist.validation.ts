import { z } from 'zod';

// Base schemas for field definitions
const wishlistAddBodySchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
});

const wishlistProductIdParamsSchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
});

/**
 * Wishlist Add Schema (wrapped for validateRequest middleware)
 */
export const WishlistAddSchema = z.object({
    body: wishlistAddBodySchema,
});

/**
 * Wishlist Product ID Param Schema (wrapped for validateRequest middleware)
 */
export const WishlistProductIdSchema = z.object({
    params: wishlistProductIdParamsSchema,
});

// Type exports (extract body types for controller use)
export type WishlistAddInput = z.infer<typeof wishlistAddBodySchema>;
