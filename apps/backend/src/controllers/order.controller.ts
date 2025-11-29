import type { Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { orderService } from '../services/order.service';
import { successResponse, paginatedResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { CheckoutInput, OrderQueryInput, OrderStatusUpdateInput } from '../validations/order.validation';

/**
 * @route   POST /api/orders/checkout
 * @desc    Checkout and create order
 * @access  Private
 */
export const checkout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const input: CheckoutInput = req.body;

  const order = await orderService.checkout(userId, input);
  return res.status(201).json(successResponse(order, 'Order placed successfully'));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const input: CheckoutInput = req.body;

    const order = await orderService.checkout(userId, input);
    return res.status(201).json(successResponse(order, 'Order placed successfully'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/orders
 * @desc    Get user's orders
 * @access  Private
 */
export const getOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const query: OrderQueryInput = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    status: req.query.status as any,
  };

  const result = await orderService.getOrders(userId, query);
  return res.json(paginatedResponse(result.data, result.pagination));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const query: OrderQueryInput = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        status: req.query.status as any,
    };

    const result = await orderService.getOrders(userId, query);
    return res.json(paginatedResponse(result.data, result.pagination));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { id } = req.params;
  const isAdmin = req.user!.role === 'ADMIN';

  const order = await orderService.getOrderById(userId, id, isAdmin);
  return res.json(successResponse(order));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const { id } = req.params;
    const isAdmin = req.user!.role === 'ADMIN';

    const order = await orderService.getOrderById(userId, id, isAdmin);
    return res.json(successResponse(order));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   PUT /api/admin/orders/:id/status
 * @desc    Update order status
 * @access  Admin
 */
export const updateOrderStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { id } = req.params;
  const input: OrderStatusUpdateInput = req.body;

  const order = await orderService.updateOrderStatus(id, input);
  return res.json(successResponse(order, 'Order status updated'));
=======
=======
>>>>>>> Stashed changes
    const { id } = req.params;
    const input: OrderStatusUpdateInput = req.body;

    const order = await orderService.updateOrderStatus(id, input);
    return res.json(successResponse(order, 'Order status updated'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/orders/:id/cancel
 * @desc    Cancel an order
 * @access  Private
 */
export const cancelOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { id } = req.params;

  await orderService.cancelOrder(userId, id);
  return res.json(successResponse(null, 'Order cancelled successfully'));
});

export const orderController = {
  checkout,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const { id } = req.params;

    await orderService.cancelOrder(userId, id);
    return res.json(successResponse(null, 'Order cancelled successfully'));
});

export const orderController = {
    checkout,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

export default orderController;
