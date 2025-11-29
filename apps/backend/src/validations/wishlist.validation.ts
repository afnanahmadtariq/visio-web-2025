import { z } from 'zod';

/**
 * Wishlist Add Schema
 */
export const WishlistAddSchema = z.object({
<<<<<<< Updated upstream
  productId: z.string().cuid('Invalid product ID'),
=======
    productId: z.string().cuid('Invalid product ID'),
>>>>>>> Stashed changes
});

/**
 * Wishlist Product ID Param Schema
 */
export const WishlistProductIdSchema = z.object({
<<<<<<< Updated upstream
  productId: z.string().cuid('Invalid product ID'),
=======
    productId: z.string().cuid('Invalid product ID'),
>>>>>>> Stashed changes
});

// Type exports
export type WishlistAddInput = z.infer<typeof WishlistAddSchema>;
