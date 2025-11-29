import { prisma } from '../db/prisma';
import { NotFoundError } from '../middlewares/errorHandler.middleware';
import { createPaginationMeta } from '../utils/helpers';
import type { ReviewInput, ReviewUpdateInput, ReviewQueryInput } from '../validations/review.validation';

/**
 * Get reviews for a product
 */
export const getProductReviews = async (productId: string, query: ReviewQueryInput) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { page, limit, sortBy, sortOrder } = query;

  const where = { productId };

  const total = await prisma.review.count({ where });

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  // Calculate rating distribution
  const ratingDistribution = await prisma.review.groupBy({
    by: ['rating'],
    where: { productId },
    _count: true,
  });

  const distribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  ratingDistribution.forEach((r) => {
    distribution[r.rating as keyof typeof distribution] = r._count;
  });

  const avgRating = total > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return {
    data: reviews,
    stats: {
      averageRating: avgRating,
      totalReviews: total,
      distribution,
    },
    pagination: createPaginationMeta(total, page, limit),
  };
=======
=======
>>>>>>> Stashed changes
    const { page, limit, sortBy, sortOrder } = query;

    const where = { productId };

    const total = await prisma.review.count({ where });

    const reviews = await prisma.review.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    // Calculate rating distribution
    const ratingDistribution = await prisma.review.groupBy({
        by: ['rating'],
        where: { productId },
        _count: true,
    });

    const distribution = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    ratingDistribution.forEach((r) => {
        distribution[r.rating as keyof typeof distribution] = r._count;
    });

    const avgRating = total > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return {
        data: reviews,
        stats: {
            averageRating: avgRating,
            totalReviews: total,
            distribution,
        },
        pagination: createPaginationMeta(total, page, limit),
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Get user's reviews
 */
export const getUserReviews = async (userId: string, query: ReviewQueryInput) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { page, limit, sortBy, sortOrder } = query;

  const where = { userId };

  const total = await prisma.review.count({ where });

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          mainImageUrl: true,
        },
      },
    },
  });

  return {
    data: reviews,
    pagination: createPaginationMeta(total, page, limit),
  };
=======
=======
>>>>>>> Stashed changes
    const { page, limit, sortBy, sortOrder } = query;

    const where = { userId };

    const total = await prisma.review.count({ where });

    const reviews = await prisma.review.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    mainImageUrl: true,
                },
            },
        },
    });

    return {
        data: reviews,
        pagination: createPaginationMeta(total, page, limit),
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Create or update a review
 */
export const createOrUpdateReview = async (userId: string, input: ReviewInput) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { productId, rating, title, comment } = input;

  // Verify product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, deletedAt: true },
  });

  if (!product || product.deletedAt) {
    throw new NotFoundError('Product');
  }

  // Check if user has purchased this product (optional requirement)
  // Uncomment the following to require purchase before review:
  // const hasPurchased = await prisma.orderItem.findFirst({
  //   where: {
  //     productId,
  //     order: {
  //       userId,
  //       status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] },
  //     },
  //   },
  // });
  // if (!hasPurchased) {
  //   throw new BadRequestError('You must purchase this product before reviewing');
  // }

  // Upsert review
  const review = await prisma.review.upsert({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    create: {
      userId,
      productId,
      rating,
      title,
      comment,
    },
    update: {
      rating,
      title,
      comment,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return review;
=======
=======
>>>>>>> Stashed changes
    const { productId, rating, title, comment } = input;

    // Verify product exists
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true, deletedAt: true },
    });

    if (!product || product.deletedAt) {
        throw new NotFoundError('Product');
    }

    // Check if user has purchased this product (optional requirement)
    // Uncomment the following to require purchase before review:
    // const hasPurchased = await prisma.orderItem.findFirst({
    //   where: {
    //     productId,
    //     order: {
    //       userId,
    //       status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] },
    //     },
    //   },
    // });
    // if (!hasPurchased) {
    //   throw new BadRequestError('You must purchase this product before reviewing');
    // }

    // Upsert review
    const review = await prisma.review.upsert({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
        create: {
            userId,
            productId,
            rating,
            title,
            comment,
        },
        update: {
            rating,
            title,
            comment,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    return review;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Update a review
 */
export const updateReview = async (userId: string, reviewId: string, input: ReviewUpdateInput) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const review = await prisma.review.findFirst({
    where: { id: reviewId, userId },
  });

  if (!review) {
    throw new NotFoundError('Review');
  }

  const updated = await prisma.review.update({
    where: { id: reviewId },
    data: input,
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return updated;
=======
=======
>>>>>>> Stashed changes
    const review = await prisma.review.findFirst({
        where: { id: reviewId, userId },
    });

    if (!review) {
        throw new NotFoundError('Review');
    }

    const updated = await prisma.review.update({
        where: { id: reviewId },
        data: input,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    return updated;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

/**
 * Delete a review
 */
export const deleteReview = async (userId: string, reviewId: string, isAdmin = false) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const where = isAdmin ? { id: reviewId } : { id: reviewId, userId };

  const review = await prisma.review.findFirst({ where });

  if (!review) {
    throw new NotFoundError('Review');
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });

  return { success: true };
};

export const reviewService = {
  getProductReviews,
  getUserReviews,
  createOrUpdateReview,
  updateReview,
  deleteReview,
=======
=======
>>>>>>> Stashed changes
    const where = isAdmin ? { id: reviewId } : { id: reviewId, userId };

    const review = await prisma.review.findFirst({ where });

    if (!review) {
        throw new NotFoundError('Review');
    }

    await prisma.review.delete({
        where: { id: reviewId },
    });

    return { success: true };
};

export const reviewService = {
    getProductReviews,
    getUserReviews,
    createOrUpdateReview,
    updateReview,
    deleteReview,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

export default reviewService;
