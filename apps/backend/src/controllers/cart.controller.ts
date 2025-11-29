import type { Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { cartService } from '../services/cart.service';
import { successResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { AddToCartInput, UpdateCartItemInput } from '../validations/cart.validation';

/**
 * @route   GET /api/cart
 * @desc    Get user's cart
 * @access  Private
 */
export const getCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const cart = await cartService.getCart(userId);
  return res.json(successResponse(cart));
=======
    const userId = req.user!.id;
    const cart = await cartService.getCart(userId);
    return res.json(successResponse(cart));
>>>>>>> Stashed changes
=======
    const userId = req.user!.id;
    const cart = await cartService.getCart(userId);
    return res.json(successResponse(cart));
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/cart
 * @desc    Add item to cart
 * @access  Private
 */
export const addToCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const input: AddToCartInput = req.body;

  const cart = await cartService.addToCart(userId, input);
  return res.json(successResponse(cart, 'Item added to cart'));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const input: AddToCartInput = req.body;

    const cart = await cartService.addToCart(userId, input);
    return res.json(successResponse(cart, 'Item added to cart'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   PUT /api/cart/:itemId
 * @desc    Update cart item quantity
 * @access  Private
 */
export const updateCartItem = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { itemId } = req.params;
  const input: UpdateCartItemInput = req.body;

  const cart = await cartService.updateCartItem(userId, itemId, input);
  return res.json(successResponse(cart, 'Cart updated'));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const { itemId } = req.params;
    const input: UpdateCartItemInput = req.body;

    const cart = await cartService.updateCartItem(userId, itemId, input);
    return res.json(successResponse(cart, 'Cart updated'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/cart/:itemId
 * @desc    Remove item from cart
 * @access  Private
 */
export const removeFromCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { itemId } = req.params;

  const cart = await cartService.removeFromCart(userId, itemId);
  return res.json(successResponse(cart, 'Item removed from cart'));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const { itemId } = req.params;

    const cart = await cartService.removeFromCart(userId, itemId);
    return res.json(successResponse(cart, 'Item removed from cart'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/cart
 * @desc    Clear cart
 * @access  Private
 */
export const clearCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  await cartService.clearCart(userId);
  return res.json(successResponse(null, 'Cart cleared'));
});

export const cartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    await cartService.clearCart(userId);
    return res.json(successResponse(null, 'Cart cleared'));
});

export const cartController = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

export default cartController;
