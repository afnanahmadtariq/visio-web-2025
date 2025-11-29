import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';

const router = Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', categoryController.getCategories);

/**
 * @route   GET /api/categories/root
 * @desc    Get root categories (no parent)
 * @access  Public
 */
router.get('/root', categoryController.getRootCategories);

/**
 * @route   GET /api/categories/:idOrSlug
 * @desc    Get category by ID or slug
 * @access  Public
 */
router.get('/:idOrSlug', categoryController.getCategoryById);

export default router;
