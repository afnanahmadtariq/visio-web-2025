import { z } from 'zod';

// Base schemas for field definitions
const categoryBodySchema = z.object({
    name: z
        .string()
        .min(2, 'Category name must be at least 2 characters')
        .max(100, 'Category name too long'),
    slug: z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(100, 'Slug too long')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z.string().max(500, 'Description too long').optional().nullable(),
    parentId: z.string().cuid('Invalid parent category ID').optional().nullable(),
});

const categoryUpdateBodySchema = categoryBodySchema.partial();

const categoryIdParamsSchema = z.object({
    id: z.string().cuid('Invalid category ID'),
});

const categorySlugParamsSchema = z.object({
    slug: z.string().min(1, 'Slug is required'),
});

/**
 * Category Create Schema (wrapped for validateRequest middleware)
 */
export const CategorySchema = z.object({
    body: categoryBodySchema,
});

/**
 * Category Update Schema (wrapped for validateRequest middleware)
 */
export const CategoryUpdateSchema = z.object({
    body: categoryUpdateBodySchema,
});

/**
 * Category ID Param Schema (wrapped for validateRequest middleware)
 */
export const CategoryIdSchema = z.object({
    params: categoryIdParamsSchema,
});

/**
 * Category Slug Param Schema (wrapped for validateRequest middleware)
 */
export const CategorySlugSchema = z.object({
    params: categorySlugParamsSchema,
});

// Type exports (extract body types for controller use)
export type CategoryInput = z.infer<typeof categoryBodySchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateBodySchema>;
