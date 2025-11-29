import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { AddToCartSchema, UpdateCartItemSchema } from '../validations/cart.validation';

const router = Router();

// All cart routes require authentication
router.use(isAuthenticated);

/**
 * @route   GET /api/cart
 * @desc    Get user's cart
 * @access  Private
 */
router.get('/', cartController.getCart);

/**
 * @route   POST /api/cart
 * @desc    Add item to cart
 * @access  Private
 */
router.post('/', validateRequest(AddToCartSchema), cartController.addToCart);

/**
 * @route   PUT /api/cart/:itemId
 * @desc    Update cart item quantity
 * @access  Private
 */
router.put('/:itemId', validateRequest(UpdateCartItemSchema), cartController.updateCartItem);

/**
 * @route   DELETE /api/cart/:itemId
 * @desc    Remove item from cart
 * @access  Private
 */
router.delete('/:itemId', cartController.removeFromCart);

/**
 * @route   DELETE /api/cart
 * @desc    Clear cart
 * @access  Private
 */
router.delete('/', cartController.clearCart);

export default router;
