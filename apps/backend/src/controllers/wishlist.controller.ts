import type { Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { wishlistService } from '../services/wishlist.service';
import { successResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';

/**
 * @route   GET /api/wishlist
 * @desc    Get user's wishlist
 * @access  Private
 */
export const getWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const wishlist = await wishlistService.getWishlist(userId);
  return res.json(successResponse(wishlist));
=======
    const userId = req.user!.id;
    const wishlist = await wishlistService.getWishlist(userId);
    return res.json(successResponse(wishlist));
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/wishlist/:productId
 * @desc    Add product to wishlist
 * @access  Private
 */
export const addToWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { productId } = req.params;

  const wishlist = await wishlistService.addToWishlist(userId, productId);
  return res.json(successResponse(wishlist, 'Added to wishlist'));
=======
    const userId = req.user!.id;
    const { productId } = req.params;

    const wishlist = await wishlistService.addToWishlist(userId, productId);
    return res.json(successResponse(wishlist, 'Added to wishlist'));
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/wishlist/:productId
 * @desc    Remove product from wishlist
 * @access  Private
 */
export const removeFromWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { productId } = req.params;

  const wishlist = await wishlistService.removeFromWishlist(userId, productId);
  return res.json(successResponse(wishlist, 'Removed from wishlist'));
=======
    const userId = req.user!.id;
    const { productId } = req.params;

    const wishlist = await wishlistService.removeFromWishlist(userId, productId);
    return res.json(successResponse(wishlist, 'Removed from wishlist'));
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/wishlist/check/:productId
 * @desc    Check if product is in wishlist
 * @access  Private
 */
export const checkWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { productId } = req.params;

  const isInWishlist = await wishlistService.isInWishlist(userId, productId);
  return res.json(successResponse({ isInWishlist }));
=======
    const userId = req.user!.id;
    const { productId } = req.params;

    const isInWishlist = await wishlistService.isInWishlist(userId, productId);
    return res.json(successResponse({ isInWishlist }));
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/wishlist/:productId/move-to-cart
 * @desc    Move wishlist item to cart
 * @access  Private
 */
export const moveToCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { productId } = req.params;

  await wishlistService.moveToCart(userId, productId);
  return res.json(successResponse(null, 'Moved to cart'));
=======
    const userId = req.user!.id;
    const { productId } = req.params;

    await wishlistService.moveToCart(userId, productId);
    return res.json(successResponse(null, 'Moved to cart'));
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/wishlist
 * @desc    Clear wishlist
 * @access  Private
 */
export const clearWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const userId = req.user!.id;
  await wishlistService.clearWishlist(userId);
  return res.json(successResponse(null, 'Wishlist cleared'));
});

export const wishlistController = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  moveToCart,
  clearWishlist,
=======
    const userId = req.user!.id;
    await wishlistService.clearWishlist(userId);
    return res.json(successResponse(null, 'Wishlist cleared'));
});

export const wishlistController = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkWishlist,
    moveToCart,
    clearWishlist,
>>>>>>> Stashed changes
};

export default wishlistController;
