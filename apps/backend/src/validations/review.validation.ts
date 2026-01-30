import { z } from 'zod';

// Base schemas for field definitions
const reviewBodySchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
    rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
    title: z.string().max(100, 'Title too long').optional().nullable(),
    comment: z.string().max(1000, 'Comment too long').optional().nullable(),
});

const reviewUpdateBodySchema = z.object({
    rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5').optional(),
    title: z.string().max(100, 'Title too long').optional().nullable(),
    comment: z.string().max(1000, 'Comment too long').optional().nullable(),
});

const reviewQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(50).optional().default(10),
    productId: z.string().cuid('Invalid product ID').optional(),
    sortBy: z.enum(['rating', 'createdAt']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

const reviewIdParamsSchema = z.object({
    id: z.string().cuid('Invalid review ID'),
});

/**
 * Review Create Schema (wrapped for validateRequest middleware)
 */
export const ReviewSchema = z.object({
    body: reviewBodySchema,
});

/**
 * Review Update Schema (wrapped for validateRequest middleware)
 */
export const ReviewUpdateSchema = z.object({
    body: reviewUpdateBodySchema,
});

/**
 * Review Query Schema (wrapped for validateRequest middleware)
 */
export const ReviewQuerySchema = z.object({
    query: reviewQuerySchema,
});

/**
 * Review ID Param Schema (wrapped for validateRequest middleware)
 */
export const ReviewIdSchema = z.object({
    params: reviewIdParamsSchema,
});

// Type exports (extract types for controller use)
export type ReviewInput = z.infer<typeof reviewBodySchema>;
export type ReviewUpdateInput = z.infer<typeof reviewUpdateBodySchema>;
export type ReviewQueryInput = z.infer<typeof reviewQuerySchema>;
