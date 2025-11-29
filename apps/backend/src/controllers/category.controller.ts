import type { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { categoryService } from '../services/category.service';
import { successResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { CategoryInput, CategoryUpdateInput } from '../validations/category.validation';

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const categories = await categoryService.getCategories();
  return res.json(successResponse(categories));
=======
    const categories = await categoryService.getCategories();
    return res.json(successResponse(categories));
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/categories/root
 * @desc    Get root categories (no parent)
 * @access  Public
 */
export const getRootCategories = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const categories = await categoryService.getRootCategories();
  return res.json(successResponse(categories));
=======
    const categories = await categoryService.getRootCategories();
    return res.json(successResponse(categories));
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/categories/:idOrSlug
 * @desc    Get category by ID or slug
 * @access  Public
 */
export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const { idOrSlug } = req.params;
  const category = await categoryService.getCategoryByIdOrSlug(idOrSlug);
  return res.json(successResponse(category));
=======
    const { idOrSlug } = req.params;
    const category = await categoryService.getCategoryByIdOrSlug(idOrSlug);
    return res.json(successResponse(category));
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/admin/categories
 * @desc    Create a new category
 * @access  Admin
 */
export const createCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const input: CategoryInput = req.body;
  const category = await categoryService.createCategory(input);
  return res.status(201).json(successResponse(category, 'Category created successfully'));
=======
    const input: CategoryInput = req.body;
    const category = await categoryService.createCategory(input);
    return res.status(201).json(successResponse(category, 'Category created successfully'));
>>>>>>> Stashed changes
});

/**
 * @route   PUT /api/admin/categories/:id
 * @desc    Update a category
 * @access  Admin
 */
export const updateCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const { id } = req.params;
  const input: CategoryUpdateInput = req.body;
  const category = await categoryService.updateCategory(id, input);
  return res.json(successResponse(category, 'Category updated successfully'));
=======
    const { id } = req.params;
    const input: CategoryUpdateInput = req.body;
    const category = await categoryService.updateCategory(id, input);
    return res.json(successResponse(category, 'Category updated successfully'));
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/admin/categories/:id
 * @desc    Delete a category (soft delete)
 * @access  Admin
 */
export const deleteCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  return res.json(successResponse(null, 'Category deleted successfully'));
});

export const categoryController = {
  getCategories,
  getRootCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
=======
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    return res.json(successResponse(null, 'Category deleted successfully'));
});

export const categoryController = {
    getCategories,
    getRootCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
>>>>>>> Stashed changes
};

export default categoryController;
