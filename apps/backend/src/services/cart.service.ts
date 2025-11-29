import { prisma } from '../db/prisma';
import { NotFoundError, BadRequestError } from '../middlewares/errorHandler.middleware';
import type { AddToCartInput, UpdateCartItemInput } from '../validations/cart.validation';

/**
 * Get or create user's cart
 */
const getOrCreateCart = async (userId: string) => {
<<<<<<< Updated upstream
  let cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              stock: true,
              salePercent: true,
              mainImageUrl: true,
              isActive: true,
              deletedAt: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                stock: true,
                salePercent: true,
                mainImageUrl: true,
                isActive: true,
                deletedAt: true,
              },
            },
          },
        },
      },
    });
  }

  return cart;
=======
    let cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            price: true,
                            stock: true,
                            salePercent: true,
                            mainImageUrl: true,
                            isActive: true,
                            deletedAt: true,
                        },
                    },
                },
            },
        },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                price: true,
                                stock: true,
                                salePercent: true,
                                mainImageUrl: true,
                                isActive: true,
                                deletedAt: true,
                            },
                        },
                    },
                },
            },
        });
    }

    return cart;
>>>>>>> Stashed changes
};

/**
 * Get user's cart with items
 */
export const getCart = async (userId: string) => {
<<<<<<< Updated upstream
  const cart = await getOrCreateCart(userId);

  // Filter out deleted/inactive products and transform
  const items = cart.items
    .filter((item) => item.product.isActive && !item.product.deletedAt)
    .map((item) => {
      const price = Number(item.product.price);
      const salePercent = item.product.salePercent || 0;
      const discountedPrice = price * (1 - salePercent / 100);

      return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        product: {
          ...item.product,
          price,
          discountedPrice,
        },
        subtotal: discountedPrice * item.quantity,
      };
    });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    id: cart.id,
    items,
    totalItems,
    totalAmount,
  };
=======
    const cart = await getOrCreateCart(userId);

    // Filter out deleted/inactive products and transform
    const items = cart.items
        .filter((item) => item.product.isActive && !item.product.deletedAt)
        .map((item) => {
            const price = Number(item.product.price);
            const salePercent = item.product.salePercent || 0;
            const discountedPrice = price * (1 - salePercent / 100);

            return {
                id: item.id,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: Number(item.unitPrice),
                product: {
                    ...item.product,
                    price,
                    discountedPrice,
                },
                subtotal: discountedPrice * item.quantity,
            };
        });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
        id: cart.id,
        items,
        totalItems,
        totalAmount,
    };
>>>>>>> Stashed changes
};

/**
 * Add item to cart
 */
export const addToCart = async (userId: string, input: AddToCartInput) => {
<<<<<<< Updated upstream
  const { productId, quantity } = input;

  // Get product and verify it's available
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      price: true,
      stock: true,
      isActive: true,
      deletedAt: true,
    },
  });

  if (!product || !product.isActive || product.deletedAt) {
    throw new NotFoundError('Product');
  }

  if (product.stock < quantity) {
    throw new BadRequestError(`Only ${product.stock} items available in stock`);
  }

  // Get or create cart
  const cart = await getOrCreateCart(userId);

  // Check if product already in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new BadRequestError(`Cannot add more. Only ${product.stock} items available.`);
    }

    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        unitPrice: product.price,
      },
    });
  }

  return getCart(userId);
=======
    const { productId, quantity } = input;

    // Get product and verify it's available
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
            id: true,
            price: true,
            stock: true,
            isActive: true,
            deletedAt: true,
        },
    });

    if (!product || !product.isActive || product.deletedAt) {
        throw new NotFoundError('Product');
    }

    if (product.stock < quantity) {
        throw new BadRequestError(`Only ${product.stock} items available in stock`);
    }

    // Get or create cart
    const cart = await getOrCreateCart(userId);

    // Check if product already in cart
    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
    });

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
            throw new BadRequestError(`Cannot add more. Only ${product.stock} items available.`);
        }

        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: newQuantity },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
                unitPrice: product.price,
            },
        });
    }

    return getCart(userId);
>>>>>>> Stashed changes
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (userId: string, itemId: string, input: UpdateCartItemInput) => {
<<<<<<< Updated upstream
  const { quantity } = input;

  // Get cart item and verify ownership
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: { userId },
    },
    include: {
      product: {
        select: { stock: true, isActive: true },
      },
    },
  });

  if (!cartItem) {
    throw new NotFoundError('Cart item');
  }

  if (!cartItem.product.isActive) {
    throw new BadRequestError('Product is no longer available');
  }

  if (quantity > cartItem.product.stock) {
    throw new BadRequestError(`Only ${cartItem.product.stock} items available`);
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  return getCart(userId);
=======
    const { quantity } = input;

    // Get cart item and verify ownership
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: itemId,
            cart: { userId },
        },
        include: {
            product: {
                select: { stock: true, isActive: true },
            },
        },
    });

    if (!cartItem) {
        throw new NotFoundError('Cart item');
    }

    if (!cartItem.product.isActive) {
        throw new BadRequestError('Product is no longer available');
    }

    if (quantity > cartItem.product.stock) {
        throw new BadRequestError(`Only ${cartItem.product.stock} items available`);
    }

    await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
    });

    return getCart(userId);
>>>>>>> Stashed changes
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (userId: string, itemId: string) => {
<<<<<<< Updated upstream
  // Verify cart item belongs to user
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: { userId },
    },
  });

  if (!cartItem) {
    throw new NotFoundError('Cart item');
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  return getCart(userId);
=======
    // Verify cart item belongs to user
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: itemId,
            cart: { userId },
        },
    });

    if (!cartItem) {
        throw new NotFoundError('Cart item');
    }

    await prisma.cartItem.delete({
        where: { id: itemId },
    });

    return getCart(userId);
>>>>>>> Stashed changes
};

/**
 * Clear cart
 */
export const clearCart = async (userId: string) => {
<<<<<<< Updated upstream
  const cart = await prisma.cart.findFirst({
    where: { userId },
    select: { id: true },
  });

  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }

  return { success: true };
};

export const cartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
=======
    const cart = await prisma.cart.findFirst({
        where: { userId },
        select: { id: true },
    });

    if (cart) {
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }

    return { success: true };
};

export const cartService = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
>>>>>>> Stashed changes
};

export default cartService;
