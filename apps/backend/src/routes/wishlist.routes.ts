import { Router } from 'express';
import { wishlistController } from '../controllers/wishlist.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

// All wishlist routes require authentication
router.use(isAuthenticated);

/**
 * @route   GET /api/wishlist
 * @desc    Get user's wishlist
 * @access  Private
 */
router.get('/', wishlistController.getWishlist);

/**
 * @route   POST /api/wishlist/:productId
 * @desc    Add product to wishlist
 * @access  Private
 */
router.post('/:productId', wishlistController.addToWishlist);

/**
 * @route   DELETE /api/wishlist/:productId
 * @desc    Remove product from wishlist
 * @access  Private
 */
router.delete('/:productId', wishlistController.removeFromWishlist);

/**
 * @route   GET /api/wishlist/check/:productId
 * @desc    Check if product is in wishlist
 * @access  Private
 */
router.get('/check/:productId', wishlistController.checkWishlist);

/**
 * @route   POST /api/wishlist/:productId/move-to-cart
 * @desc    Move wishlist item to cart
 * @access  Private
 */
router.post('/:productId/move-to-cart', wishlistController.moveToCart);

/**
 * @route   DELETE /api/wishlist
 * @desc    Clear wishlist
 * @access  Private
 */
router.delete('/', wishlistController.clearWishlist);

export default router;
