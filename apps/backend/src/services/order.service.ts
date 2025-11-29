import { prisma } from '../db/prisma';
import { PaymentLog } from '../db/models';
import { isMongoConnected } from '../db/mongo';
import { NotFoundError, BadRequestError } from '../middlewares/errorHandler.middleware';
import { createPaginationMeta } from '../utils/helpers';
import { cartService } from './cart.service';
import type { CheckoutInput, OrderQueryInput, OrderStatusUpdateInput } from '../validations/order.validation';

/**
 * Process checkout and create order
 */
export const checkout = async (userId: string, input: CheckoutInput) => {
  const { shippingAddressId, billingAddressId, paymentMethod, useSameAddressForBilling } = input;

  // Get user's cart
  const cart = await cartService.getCart(userId);

  if (cart.items.length === 0) {
    throw new BadRequestError('Cart is empty');
  }

  // Verify shipping address
  const shippingAddress = await prisma.userAddress.findFirst({
    where: { id: shippingAddressId, userId, deletedAt: null },
  });

  if (!shippingAddress) {
    throw new NotFoundError('Shipping address');
  }

  // Determine billing address
  const finalBillingAddressId = useSameAddressForBilling
    ? shippingAddressId
    : billingAddressId || shippingAddressId;

  // Verify billing address if different
  if (finalBillingAddressId !== shippingAddressId) {
    const billingAddress = await prisma.userAddress.findFirst({
      where: { id: finalBillingAddressId, userId, deletedAt: null },
    });

    if (!billingAddress) {
      throw new NotFoundError('Billing address');
    }
  }

  // Get user for credit check
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditBalance: true },
  });

  if (!user) {
    throw new NotFoundError('User');
  }

  // Check credit balance if paying with credit
  if (paymentMethod === 'CREDIT') {
    if (Number(user.creditBalance) < cart.totalAmount) {
      throw new BadRequestError(
        `Insufficient credit balance. Available: $${Number(user.creditBalance).toFixed(2)}, Required: $${cart.totalAmount.toFixed(2)}`
      );
    }
  }

  // Verify stock for all items
  for (const item of cart.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      select: { stock: true, name: true },
    });

    if (!product || product.stock < item.quantity) {
      throw new BadRequestError(
        `Insufficient stock for ${product?.name || 'product'}. Available: ${product?.stock || 0}`
      );
    }
  }

  // Create order in transaction
  const order = await prisma.$transaction(async (tx) => {
    // Create order
    const newOrder = await tx.order.create({
      data: {
        userId,
        status: paymentMethod === 'CREDIT' ? 'PAID' : 'PENDING',
        totalAmount: cart.totalAmount,
        shippingAddressId,
        billingAddressId: finalBillingAddressId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.product.discountedPrice,
            salePercent: item.product.salePercent,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, mainImageUrl: true },
            },
          },
        },
      },
    });

    // Create payment record
    await tx.payment.create({
      data: {
        orderId: newOrder.id,
        status: paymentMethod === 'CREDIT' ? 'SUCCESS' : 'PENDING',
        provider: paymentMethod,
        amount: cart.totalAmount,
      },
    });

    // Deduct stock
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // If paying with credit, deduct balance
    if (paymentMethod === 'CREDIT') {
      await tx.user.update({
        where: { id: userId },
        data: { creditBalance: { decrement: cart.totalAmount } },
      });

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -cart.totalAmount,
          type: 'PURCHASE_DEBIT',
          referenceId: newOrder.id,
          note: `Order #${newOrder.id}`,
        },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { cart: { userId } },
    });

    return newOrder;
  });

  // Log payment
  if (isMongoConnected()) {
    await PaymentLog.create({
      orderId: order.id,
      userId,
      status: paymentMethod === 'CREDIT' ? 'SUCCESS' : 'PENDING',
      amount: cart.totalAmount,
      provider: paymentMethod,
    });
  }

  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    items: order.items.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
    })),
  };
};

/**
 * Get user's orders
 */
export const getOrders = async (userId: string, query: OrderQueryInput) => {
  const { page, limit, status } = query;

  const where = {
    userId,
    ...(status && { status }),
  };

  const total = await prisma.order.count({ where });

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      items: {
        include: {
          product: {
            select: { name: true, mainImageUrl: true, slug: true },
          },
        },
      },
      payment: {
        select: { status: true, provider: true },
      },
    },
  });

  return {
    data: orders.map((order) => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      items: order.items.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
      })),
    })),
    pagination: createPaginationMeta(total, page, limit),
  };
};

/**
 * Get order by ID
 */
export const getOrderById = async (userId: string, orderId: string, isAdmin = false) => {
  const where = isAdmin ? { id: orderId } : { id: orderId, userId };

  const order = await prisma.order.findFirst({
    where,
    include: {
      items: {
        include: {
          product: {
            select: { name: true, mainImageUrl: true, slug: true },
          },
        },
      },
      payment: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });

  if (!order) {
    throw new NotFoundError('Order');
  }

  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    items: order.items.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
    })),
    payment: order.payment
      ? { ...order.payment, amount: Number(order.payment.amount) }
      : null,
  };
};

/**
 * Update order status (Admin)
 */
export const updateOrderStatus = async (orderId: string, input: OrderStatusUpdateInput) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true },
  });

  if (!order) {
    throw new NotFoundError('Order');
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: input.status },
  });

  return {
    ...updated,
    totalAmount: Number(updated.totalAmount),
  };
};

/**
 * Cancel order
 */
export const cancelOrder = async (userId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      items: true,
      payment: true,
    },
  });

  if (!order) {
    throw new NotFoundError('Order');
  }

  if (!['PENDING', 'PAID'].includes(order.status)) {
    throw new BadRequestError('Cannot cancel order in current status');
  }

  await prisma.$transaction(async (tx) => {
    // Update order status
    await tx.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });

    // Restore stock
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    // Refund credit if paid with credit
    if (order.payment?.provider === 'CREDIT' && order.payment.status === 'SUCCESS') {
      await tx.user.update({
        where: { id: userId },
        data: { creditBalance: { increment: Number(order.totalAmount) } },
      });

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: Number(order.totalAmount),
          type: 'REFUND_CREDIT',
          referenceId: orderId,
          note: `Refund for cancelled order #${orderId}`,
        },
      });

      await tx.payment.update({
        where: { id: order.payment.id },
        data: { status: 'FAILED' },
      });
    }
  });

  // Log refund
  if (isMongoConnected()) {
    await PaymentLog.create({
      orderId,
      userId,
      status: 'REFUNDED',
      amount: Number(order.totalAmount),
      provider: order.payment?.provider || 'UNKNOWN',
    });
  }

  return { success: true };
};

export const orderService = {
  checkout,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};

export default orderService;
