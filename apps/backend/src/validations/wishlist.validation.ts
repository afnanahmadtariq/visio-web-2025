import { z } from 'zod';

/**
 * Wishlist Add Schema
 */
export const WishlistAddSchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
});

/**
 * Wishlist Product ID Param Schema
 */
export const WishlistProductIdSchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
});

// Type exports
export type WishlistAddInput = z.infer<typeof WishlistAddSchema>;
