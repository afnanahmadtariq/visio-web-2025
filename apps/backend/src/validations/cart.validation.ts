import { z } from 'zod';

/**
 * Add to Cart Schema
 */
export const AddToCartSchema = z.object({
<<<<<<< Updated upstream
  productId: z.string().cuid('Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
=======
    productId: z.string().cuid('Invalid product ID'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
>>>>>>> Stashed changes
});

/**
 * Update Cart Item Schema
 */
export const UpdateCartItemSchema = z.object({
<<<<<<< Updated upstream
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
=======
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
>>>>>>> Stashed changes
});

/**
 * Cart Item ID Param Schema
 */
export const CartItemIdSchema = z.object({
<<<<<<< Updated upstream
  itemId: z.string().cuid('Invalid cart item ID'),
=======
    itemId: z.string().cuid('Invalid cart item ID'),
>>>>>>> Stashed changes
});

// Type exports
export type AddToCartInput = z.infer<typeof AddToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>;
