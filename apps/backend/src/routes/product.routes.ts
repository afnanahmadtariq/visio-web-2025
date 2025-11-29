import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { reviewController } from '../controllers/review.controller';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering and pagination
 * @access  Public
 */
router.get('/', productController.getProducts);

/**
 * @route   GET /api/products/sale
 * @desc    Get products on sale
 * @access  Public
 */
router.get('/sale', productController.getSaleProducts);

/**
 * @route   GET /api/products/category/:categorySlug
 * @desc    Get products by category
 * @access  Public
 */
router.get('/category/:categorySlug', productController.getProductsByCategory);

/**
 * @route   GET /api/products/:idOrSlug
 * @desc    Get product by ID or slug
 * @access  Public
 */
router.get('/:idOrSlug', productController.getProductById);

/**
 * @route   GET /api/products/:productId/reviews
 * @desc    Get reviews for a product
 * @access  Public
 */
router.get('/:productId/reviews', reviewController.getProductReviews);

export default router;
