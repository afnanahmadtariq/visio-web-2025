import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';
import { getRedis, CACHE_KEYS, CACHE_TTL, invalidateProductCaches } from '../db/redis';
import { NotFoundError, BadRequestError } from '../middlewares/errorHandler.middleware';
import { createPaginationMeta } from '../utils/helpers';
import type { ProductInput, ProductUpdateInput, ProductQueryInput } from '../validations/product.validation';

export interface ProductWithDetails {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  salePercent: number | null;
  isActive: boolean;
  mainImageUrl: string | null;
  mainImagePublicId: string | null;
  createdAt: Date;
  updatedAt: Date;
  images: Array<{
    id: string;
    url: string;
    publicId: string;
    alt: string | null;
    sortOrder: number;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  averageRating?: number;
  reviewCount?: number;
=======
=======
>>>>>>> Stashed changes
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    salePercent: number | null;
    isActive: boolean;
    mainImageUrl: string | null;
    mainImagePublicId: string | null;
    createdAt: Date;
    updatedAt: Date;
    images: Array<{
        id: string;
        url: string;
        publicId: string;
        alt: string | null;
        sortOrder: number;
    }>;
    categories: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
    averageRating?: number;
    reviewCount?: number;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

/**
 * Get all products with filtering and pagination
 */
export const getProducts = async (query: ProductQueryInput) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { page, limit, category, search, minPrice, maxPrice, onSale, sortBy, sortOrder } = query;

  // Build where clause
  const where: Prisma.ProductWhereInput = {
    deletedAt: null,
    isActive: true,
  };

  if (category) {
    where.categories = {
      some: {
        category: {
          slug: category,
        },
      },
    };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (onSale) {
    where.salePercent = { gt: 0 };
  }

  // Build order by
  const orderBy: Prisma.ProductOrderByWithRelationInput = {};
  if (sortBy === 'price') {
    orderBy.price = sortOrder;
  } else if (sortBy === 'name') {
    orderBy.name = sortOrder;
  } else {
    orderBy.createdAt = sortOrder;
  }

  // Get total count
  const total = await prisma.product.count({ where });

  // Get products
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      stock: true,
      salePercent: true,
      isActive: true,
      mainImageUrl: true,
      createdAt: true,
      categories: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  // Transform products
  const transformedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    categories: product.categories.map((c) => c.category),
    averageRating:
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : null,
    reviewCount: product.reviews.length,
    reviews: undefined,
  }));

  return {
    data: transformedProducts,
    pagination: createPaginationMeta(total, page, limit),
  };
=======
=======
>>>>>>> Stashed changes
    const { page, limit, category, search, minPrice, maxPrice, onSale, sortBy, sortOrder } = query;

    // Build where clause
    const where: Prisma.ProductWhereInput = {
        deletedAt: null,
        isActive: true,
    };

    if (category) {
        where.categories = {
            some: {
                category: {
                    slug: category,
                },
            },
        };
    }

    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined) where.price.gte = minPrice;
        if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (onSale) {
        where.salePercent = { gt: 0 };
    }

    // Build order by
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sortBy === 'price') {
        orderBy.price = sortOrder;
    } else if (sortBy === 'name') {
        orderBy.name = sortOrder;
    } else {
        orderBy.createdAt = sortOrder;
    }

    // Get total count
    const total = await prisma.product.count({ where });

    // Get products
    const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            price: true,
            stock: true,
            salePercent: true,
            isActive: true,
            mainImageUrl: true,
            createdAt: true,
            categories: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });

    // Transform products
    const transformedProducts = products.map((product) => ({
        ...product,
        price: Number(product.price),
        categories: product.categories.map((c) => c.category),
        averageRating:
            product.reviews.length > 0
                ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
                : null,
        reviewCount: product.reviews.length,
        reviews: undefined,
    }));

    return {
        data: transformedProducts,
        pagination: createPaginationMeta(total, page, limit),
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Get product by ID or slug
 */
export const getProductById = async (idOrSlug: string): Promise<ProductWithDetails> => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const redis = getRedis();

  // Try cache first
  if (redis) {
    const cached = await redis.get<ProductWithDetails>(CACHE_KEYS.PRODUCT_BY_ID(idOrSlug));
    if (cached) return cached;
  }

  // Query database
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      deletedAt: null,
    },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          url: true,
          publicId: true,
          alt: true,
          sortOrder: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  if (!product) {
    throw new NotFoundError('Product');
  }

  const result: ProductWithDetails = {
    ...product,
    price: Number(product.price),
    categories: product.categories.map((c) => c.category),
    averageRating:
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : undefined,
    reviewCount: product.reviews.length,
  };

  // Cache result
  if (redis) {
    await redis.set(CACHE_KEYS.PRODUCT_BY_ID(idOrSlug), result, { ex: CACHE_TTL.PRODUCT_DETAIL });
  }

  return result;
=======
=======
>>>>>>> Stashed changes
    const redis = getRedis();

    // Try cache first
    if (redis) {
        const cached = await redis.get<ProductWithDetails>(CACHE_KEYS.PRODUCT_BY_ID(idOrSlug));
        if (cached) return cached;
    }

    // Query database
    const product = await prisma.product.findFirst({
        where: {
            OR: [{ id: idOrSlug }, { slug: idOrSlug }],
            deletedAt: null,
        },
        include: {
            images: {
                orderBy: { sortOrder: 'asc' },
                select: {
                    id: true,
                    url: true,
                    publicId: true,
                    alt: true,
                    sortOrder: true,
                },
            },
            categories: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });

    if (!product) {
        throw new NotFoundError('Product');
    }

    const result: ProductWithDetails = {
        ...product,
        price: Number(product.price),
        categories: product.categories.map((c) => c.category),
        averageRating:
            product.reviews.length > 0
                ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
                : undefined,
        reviewCount: product.reviews.length,
    };

    // Cache result
    if (redis) {
        await redis.set(CACHE_KEYS.PRODUCT_BY_ID(idOrSlug), result, { ex: CACHE_TTL.PRODUCT_DETAIL });
    }

    return result;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Get products on sale
 */
export const getSaleProducts = async (page = 1, limit = 20) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return getProducts({
    page,
    limit,
    onSale: true,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
=======
=======
>>>>>>> Stashed changes
    return getProducts({
        page,
        limit,
        onSale: true,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categorySlug: string, page = 1, limit = 20) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return getProducts({
    page,
    limit,
    category: categorySlug,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
=======
=======
>>>>>>> Stashed changes
    return getProducts({
        page,
        limit,
        category: categorySlug,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Create a new product (Admin)
 */
export const createProduct = async (input: ProductInput, adminId: string) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { categories, ...productData } = input;

  // Check if slug exists
  const existingSlug = await prisma.product.findUnique({
    where: { slug: productData.slug },
    select: { id: true },
  });

  if (existingSlug) {
    throw new BadRequestError('Product slug already exists');
  }

  // Verify all categories exist
  const categoryRecords = await prisma.category.findMany({
    where: { id: { in: categories } },
    select: { id: true },
  });

  if (categoryRecords.length !== categories.length) {
    throw new BadRequestError('One or more categories not found');
  }

  const product = await prisma.product.create({
    data: {
      ...productData,
      categories: {
        create: categories.map((categoryId) => ({
          categoryId,
        })),
      },
    },
    include: {
      categories: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  // Invalidate caches
  await invalidateProductCaches();

  return {
    ...product,
    price: Number(product.price),
    categories: product.categories.map((c) => c.category),
  };
=======
=======
>>>>>>> Stashed changes
    const { categories, ...productData } = input;

    // Check if slug exists
    const existingSlug = await prisma.product.findUnique({
        where: { slug: productData.slug },
        select: { id: true },
    });

    if (existingSlug) {
        throw new BadRequestError('Product slug already exists');
    }

    // Verify all categories exist
    const categoryRecords = await prisma.category.findMany({
        where: { id: { in: categories } },
        select: { id: true },
    });

    if (categoryRecords.length !== categories.length) {
        throw new BadRequestError('One or more categories not found');
    }

    const product = await prisma.product.create({
        data: {
            ...productData,
            categories: {
                create: categories.map((categoryId) => ({
                    categoryId,
                })),
            },
        },
        include: {
            categories: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
        },
    });

    // Invalidate caches
    await invalidateProductCaches();

    return {
        ...product,
        price: Number(product.price),
        categories: product.categories.map((c) => c.category),
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Update a product (Admin)
 */
export const updateProduct = async (id: string, input: ProductUpdateInput, adminId: string) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { categories, ...productData } = input;

  // Check product exists
  const existing = await prisma.product.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError('Product');
  }

  // Check slug uniqueness if being changed
  if (productData.slug) {
    const existingSlug = await prisma.product.findFirst({
      where: { slug: productData.slug, id: { not: id } },
      select: { id: true },
    });

    if (existingSlug) {
      throw new BadRequestError('Product slug already exists');
    }
  }

  // Update product and categories in transaction
  const product = await prisma.$transaction(async (tx) => {
    // Update categories if provided
    if (categories) {
      // Remove existing categories
      await tx.productCategory.deleteMany({
        where: { productId: id },
      });

      // Add new categories
      await tx.productCategory.createMany({
        data: categories.map((categoryId) => ({
          productId: id,
          categoryId,
        })),
      });
    }

    // Update product
    return tx.product.update({
      where: { id },
      data: productData,
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  });

  // Invalidate caches
  await invalidateProductCaches(id);

  return {
    ...product,
    price: Number(product.price),
    categories: product.categories.map((c) => c.category),
  };
=======
=======
>>>>>>> Stashed changes
    const { categories, ...productData } = input;

    // Check product exists
    const existing = await prisma.product.findUnique({
        where: { id },
        select: { id: true },
    });

    if (!existing) {
        throw new NotFoundError('Product');
    }

    // Check slug uniqueness if being changed
    if (productData.slug) {
        const existingSlug = await prisma.product.findFirst({
            where: { slug: productData.slug, id: { not: id } },
            select: { id: true },
        });

        if (existingSlug) {
            throw new BadRequestError('Product slug already exists');
        }
    }

    // Update product and categories in transaction
    const product = await prisma.$transaction(async (tx) => {
        // Update categories if provided
        if (categories) {
            // Remove existing categories
            await tx.productCategory.deleteMany({
                where: { productId: id },
            });

            // Add new categories
            await tx.productCategory.createMany({
                data: categories.map((categoryId) => ({
                    productId: id,
                    categoryId,
                })),
            });
        }

        // Update product
        return tx.product.update({
            where: { id },
            data: productData,
            include: {
                categories: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                            },
                        },
                    },
                },
            },
        });
    });

    // Invalidate caches
    await invalidateProductCaches(id);

    return {
        ...product,
        price: Number(product.price),
        categories: product.categories.map((c) => c.category),
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Delete a product (Admin - soft delete)
 */
export const deleteProduct = async (id: string, adminId: string) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const product = await prisma.product.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!product) {
    throw new NotFoundError('Product');
  }

  await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date(), isActive: false },
  });

  // Invalidate caches
  await invalidateProductCaches(id);

  return { success: true };
};

export const productService = {
  getProducts,
  getProductById,
  getSaleProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
=======
=======
>>>>>>> Stashed changes
    const product = await prisma.product.findUnique({
        where: { id },
        select: { id: true },
    });

    if (!product) {
        throw new NotFoundError('Product');
    }

    await prisma.product.update({
        where: { id },
        data: { deletedAt: new Date(), isActive: false },
    });

    // Invalidate caches
    await invalidateProductCaches(id);

    return { success: true };
};

export const productService = {
    getProducts,
    getProductById,
    getSaleProducts,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

export default productService;
