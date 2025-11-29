import { z } from 'zod';

/**
 * Review Create/Update Schema
 */
export const ReviewSchema = z.object({
  productId: z.string().cuid('Invalid product ID'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  title: z.string().max(100, 'Title too long').optional().nullable(),
  comment: z.string().max(1000, 'Comment too long').optional().nullable(),
});

/**
 * Review Update Schema
 */
export const ReviewUpdateSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5').optional(),
  title: z.string().max(100, 'Title too long').optional().nullable(),
  comment: z.string().max(1000, 'Comment too long').optional().nullable(),
});

/**
 * Review Query Schema
 */
export const ReviewQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  productId: z.string().cuid('Invalid product ID').optional(),
  sortBy: z.enum(['rating', 'createdAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

/**
 * Review ID Param Schema
 */
export const ReviewIdSchema = z.object({
  id: z.string().cuid('Invalid review ID'),
});

// Type exports
export type ReviewInput = z.infer<typeof ReviewSchema>;
export type ReviewUpdateInput = z.infer<typeof ReviewUpdateSchema>;
export type ReviewQueryInput = z.infer<typeof ReviewQuerySchema>;
