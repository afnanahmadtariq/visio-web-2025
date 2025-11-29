import { z } from 'zod';

/**
 * Product Create/Update Schema (Admin)
 */
export const ProductSchema = z.object({
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
});

/**
 * Product Update Schema (allows partial updates)
 */
export const ProductUpdateSchema = ProductSchema.partial();

/**
 * Product Image Schema
 */
export const ProductImageSchema = z.object({
<<<<<<< Updated upstream
  url: z.string().url('Invalid image URL'),
  publicId: z.string().min(1, 'Public ID is required'),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string().max(200).optional(),
  sortOrder: z.number().int().min(0).optional().default(0),
=======
    url: z.string().url('Invalid image URL'),
    publicId: z.string().min(1, 'Public ID is required'),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    alt: z.string().max(200).optional(),
    sortOrder: z.number().int().min(0).optional().default(0),
>>>>>>> Stashed changes
});

/**
 * Product Query Schema (for filtering/pagination)
 */
export const ProductQuerySchema = z.object({
<<<<<<< Updated upstream
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  category: z.string().optional(),
  search: z.string().max(100).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  onSale: z.coerce.boolean().optional(),
  sortBy: z.enum(['price', 'name', 'createdAt', 'rating']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
=======
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    category: z.string().optional(),
    search: z.string().max(100).optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    onSale: z.coerce.boolean().optional(),
    sortBy: z.enum(['price', 'name', 'createdAt', 'rating']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
>>>>>>> Stashed changes
});

/**
 * Product ID Param Schema
 */
export const ProductIdSchema = z.object({
<<<<<<< Updated upstream
  id: z.string().cuid('Invalid product ID'),
=======
    id: z.string().cuid('Invalid product ID'),
>>>>>>> Stashed changes
});

// Type exports
export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;
export type ProductImageInput = z.infer<typeof ProductImageSchema>;
export type ProductQueryInput = z.infer<typeof ProductQuerySchema>;
