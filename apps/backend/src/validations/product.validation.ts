import { z } from 'zod';

// Base schemas for field definitions
const productBodySchema = z.object({
    name: z
        .string()
        .min(2, 'Product name must be at least 2 characters')
        .max(200, 'Product name too long'),
    slug: z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(200, 'Slug too long')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(5000, 'Description too long'),
    price: z.number().min(0, 'Price must be non-negative'),
    stock: z.number().int().min(0, 'Stock must be non-negative'),
    salePercent: z
        .number()
        .int()
        .min(0, 'Sale percent must be non-negative')
        .max(100, 'Sale percent cannot exceed 100')
        .optional()
        .nullable(),
    isActive: z.boolean().optional().default(true),
    categories: z.array(z.string()).min(1, 'At least one category is required'),
    mainImageUrl: z.string().url('Invalid image URL').optional().nullable(),
    mainImagePublicId: z.string().optional().nullable(),
});

const productUpdateBodySchema = productBodySchema.partial();

const productImageBodySchema = z.object({
    url: z.string().url('Invalid image URL'),
    publicId: z.string().min(1, 'Public ID is required'),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    alt: z.string().max(200).optional(),
    sortOrder: z.number().int().min(0).optional().default(0),
});

const productQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    category: z.string().optional(),
    search: z.string().max(100).optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    onSale: z.coerce.boolean().optional(),
    sortBy: z.enum(['price', 'name', 'createdAt', 'rating']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

const productIdParamsSchema = z.object({
    id: z.string().cuid('Invalid product ID'),
});

/**
 * Product Create Schema (wrapped for validateRequest middleware)
 */
export const ProductSchema = z.object({
    body: productBodySchema,
});

/**
 * Product Update Schema (wrapped for validateRequest middleware)
 */
export const ProductUpdateSchema = z.object({
    body: productUpdateBodySchema,
});

/**
 * Product Image Schema (wrapped for validateRequest middleware)
 */
export const ProductImageSchema = z.object({
    body: productImageBodySchema,
});

/**
 * Product Query Schema (wrapped for validateRequest middleware)
 */
export const ProductQuerySchema = z.object({
    query: productQuerySchema,
});

/**
 * Product ID Param Schema (wrapped for validateRequest middleware)
 */
export const ProductIdSchema = z.object({
    params: productIdParamsSchema,
});

// Type exports (extract types for controller use)
export type ProductInput = z.infer<typeof productBodySchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateBodySchema>;
export type ProductImageInput = z.infer<typeof productImageBodySchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
