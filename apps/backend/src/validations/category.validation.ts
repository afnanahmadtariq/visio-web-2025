import { z } from 'zod';

/**
 * Category Create Schema
 */
export const CategorySchema = z.object({
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

/**
 * Category Update Schema
 */
export const CategoryUpdateSchema = CategorySchema.partial();

/**
 * Category ID Param Schema
 */
export const CategoryIdSchema = z.object({
  id: z.string().cuid('Invalid category ID'),
});

/**
 * Category Slug Param Schema
 */
export const CategorySlugSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
});

// Type exports
export type CategoryInput = z.infer<typeof CategorySchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
