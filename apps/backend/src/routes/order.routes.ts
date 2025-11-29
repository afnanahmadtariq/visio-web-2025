import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { CheckoutSchema } from '../validations/order.validation';

const router = Router();

// All order routes require authentication
router.use(isAuthenticated);

/**
 * @route   POST /api/orders/checkout
 * @desc    Checkout and create order
 * @access  Private
 */
router.post('/checkout', validateRequest(CheckoutSchema), orderController.checkout);

/**
 * @route   GET /api/orders
 * @desc    Get user's orders
 * @access  Private
 */
router.get('/', orderController.getOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', orderController.getOrderById);

/**
 * @route   POST /api/orders/:id/cancel
 * @desc    Cancel an order
 * @access  Private
 */
router.post('/:id/cancel', orderController.cancelOrder);

export default router;
