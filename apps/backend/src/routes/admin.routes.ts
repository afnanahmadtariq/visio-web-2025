import { Router, RequestHandler } from 'express';
import { productController } from '../controllers/product.controller';
import { categoryController } from '../controllers/category.controller';
import { orderController } from '../controllers/order.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware';
import { adminRateLimiter } from '../middlewares/security.middleware';
import { ProductSchema, ProductUpdateSchema } from '../validations/product.validation';
import { CategorySchema, CategoryUpdateSchema } from '../validations/category.validation';
import { OrderStatusUpdateSchema } from '../validations/order.validation';

const router = Router();

// All admin routes require authentication and admin role
router.use(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    adminRateLimiter
);

// ============ Product Management ============

/**
 * @route   POST /api/admin/products
 * @desc    Create a new product
 * @access  Admin
 */
router.post('/products', validateRequest(ProductSchema), productController.createProduct);

/**
 * @route   PUT /api/admin/products/:id
 * @desc    Update a product
 * @access  Admin
 */
router.put('/products/:id', validateRequest(ProductUpdateSchema), productController.updateProduct);

/**
 * @route   DELETE /api/admin/products/:id
 * @desc    Delete a product (soft delete)
 * @access  Admin
 */
router.delete('/products/:id', productController.deleteProduct);

// ============ Category Management ============

/**
 * @route   POST /api/admin/categories
 * @desc    Create a new category
 * @access  Admin
 */
router.post('/categories', validateRequest(CategorySchema), categoryController.createCategory);

/**
 * @route   PUT /api/admin/categories/:id
 * @desc    Update a category
 * @access  Admin
 */
router.put('/categories/:id', validateRequest(CategoryUpdateSchema), categoryController.updateCategory);

/**
 * @route   DELETE /api/admin/categories/:id
 * @desc    Delete a category (soft delete)
 * @access  Admin
 */
router.delete('/categories/:id', categoryController.deleteCategory);

// ============ Order Management ============

/**
 * @route   PUT /api/admin/orders/:id/status
 * @desc    Update order status
 * @access  Admin
 */
router.put('/orders/:id/status', validateRequest(OrderStatusUpdateSchema), orderController.updateOrderStatus);

export default router;
