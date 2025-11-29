import { prisma } from '../db/prisma';
import { NotFoundError, ConflictError } from '../middlewares/errorHandler.middleware';

/**
 * Get user's wishlist
 */
export const getWishlist = async (userId: string) => {
<<<<<<< Updated upstream
  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          salePercent: true,
          stock: true,
          mainImageUrl: true,
          isActive: true,
          deletedAt: true,
        },
      },
    },
  });

  // Filter out deleted/inactive products and transform
  const wishlistItems = items
    .filter((item) => item.product.isActive && !item.product.deletedAt)
    .map((item) => {
      const price = Number(item.product.price);
      const salePercent = item.product.salePercent || 0;
      const discountedPrice = price * (1 - salePercent / 100);

      return {
        id: item.id,
        productId: item.productId,
        addedAt: item.createdAt,
        product: {
          ...item.product,
          price,
          discountedPrice,
          inStock: item.product.stock > 0,
        },
      };
    });

  return {
    items: wishlistItems,
    totalItems: wishlistItems.length,
  };
=======
    const items = await prisma.wishlistItem.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    price: true,
                    salePercent: true,
                    stock: true,
                    mainImageUrl: true,
                    isActive: true,
                    deletedAt: true,
                },
            },
        },
    });

    // Filter out deleted/inactive products and transform
    const wishlistItems = items
        .filter((item) => item.product.isActive && !item.product.deletedAt)
        .map((item) => {
            const price = Number(item.product.price);
            const salePercent = item.product.salePercent || 0;
            const discountedPrice = price * (1 - salePercent / 100);

            return {
                id: item.id,
                productId: item.productId,
                addedAt: item.createdAt,
                product: {
                    ...item.product,
                    price,
                    discountedPrice,
                    inStock: item.product.stock > 0,
                },
            };
        });

    return {
        items: wishlistItems,
        totalItems: wishlistItems.length,
    };
>>>>>>> Stashed changes
};

/**
 * Add product to wishlist
 */
export const addToWishlist = async (userId: string, productId: string) => {
<<<<<<< Updated upstream
  // Verify product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, isActive: true, deletedAt: true },
  });

  if (!product || !product.isActive || product.deletedAt) {
    throw new NotFoundError('Product');
  }

  // Check if already in wishlist
  const existing = await prisma.wishlistItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existing) {
    throw new ConflictError('Product already in wishlist');
  }

  await prisma.wishlistItem.create({
    data: {
      userId,
      productId,
    },
  });

  return getWishlist(userId);
=======
    // Verify product exists
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true, isActive: true, deletedAt: true },
    });

    if (!product || !product.isActive || product.deletedAt) {
        throw new NotFoundError('Product');
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });

    if (existing) {
        throw new ConflictError('Product already in wishlist');
    }

    await prisma.wishlistItem.create({
        data: {
            userId,
            productId,
        },
    });

    return getWishlist(userId);
>>>>>>> Stashed changes
};

/**
 * Remove product from wishlist
 */
export const removeFromWishlist = async (userId: string, productId: string) => {
<<<<<<< Updated upstream
  const item = await prisma.wishlistItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!item) {
    throw new NotFoundError('Wishlist item');
  }

  await prisma.wishlistItem.delete({
    where: { id: item.id },
  });

  return getWishlist(userId);
=======
    const item = await prisma.wishlistItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });

    if (!item) {
        throw new NotFoundError('Wishlist item');
    }

    await prisma.wishlistItem.delete({
        where: { id: item.id },
    });

    return getWishlist(userId);
>>>>>>> Stashed changes
};

/**
 * Check if product is in user's wishlist
 */
export const isInWishlist = async (userId: string, productId: string): Promise<boolean> => {
<<<<<<< Updated upstream
  const item = await prisma.wishlistItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    select: { id: true },
  });

  return !!item;
=======
    const item = await prisma.wishlistItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
        select: { id: true },
    });

    return !!item;
>>>>>>> Stashed changes
};

/**
 * Move wishlist item to cart
 */
export const moveToCart = async (userId: string, productId: string) => {
<<<<<<< Updated upstream
  // This would integrate with cart service
  // For now, just remove from wishlist
  await removeFromWishlist(userId, productId);
  return { success: true };
=======
    // This would integrate with cart service
    // For now, just remove from wishlist
    await removeFromWishlist(userId, productId);
    return { success: true };
>>>>>>> Stashed changes
};

/**
 * Clear wishlist
 */
export const clearWishlist = async (userId: string) => {
<<<<<<< Updated upstream
  await prisma.wishlistItem.deleteMany({
    where: { userId },
  });

  return { success: true };
};

export const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  moveToCart,
  clearWishlist,
=======
    await prisma.wishlistItem.deleteMany({
        where: { userId },
    });

    return { success: true };
};

export const wishlistService = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    clearWishlist,
>>>>>>> Stashed changes
};

export default wishlistService;
