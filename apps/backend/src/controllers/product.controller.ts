import type { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { productService } from '../services/product.service';
import { successResponse, paginatedResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { ProductInput, ProductUpdateInput, ProductQueryInput } from '../validations/product.validation';

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering and pagination
 * @access  Public
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const query: ProductQueryInput = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
    category: req.query.category as string,
    search: req.query.search as string,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    onSale: req.query.onSale === 'true',
    sortBy: (req.query.sortBy as 'price' | 'name' | 'createdAt') || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const result = await productService.getProducts(query);
  return res.json(paginatedResponse(result.data, result.pagination));
=======
    const query: ProductQueryInput = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 20,
        category: req.query.category as string,
        search: req.query.search as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        onSale: req.query.onSale === 'true',
        sortBy: (req.query.sortBy as 'price' | 'name' | 'createdAt') || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await productService.getProducts(query);
    return res.json(paginatedResponse(result.data, result.pagination));
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/products/sale
 * @desc    Get products on sale
 * @access  Public
 */
export const getSaleProducts = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const result = await productService.getSaleProducts(page, limit);
  return res.json(paginatedResponse(result.data, result.pagination));
=======
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await productService.getSaleProducts(page, limit);
    return res.json(paginatedResponse(result.data, result.pagination));
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/products/category/:categorySlug
 * @desc    Get products by category
 * @access  Public
 */
export const getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const { categorySlug } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const result = await productService.getProductsByCategory(categorySlug, page, limit);
  return res.json(paginatedResponse(result.data, result.pagination));
=======
    const { categorySlug } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await productService.getProductsByCategory(categorySlug, page, limit);
    return res.json(paginatedResponse(result.data, result.pagination));
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/products/:idOrSlug
 * @desc    Get product by ID or slug
 * @access  Public
 */
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const { idOrSlug } = req.params;
  const product = await productService.getProductById(idOrSlug);
  return res.json(successResponse(product));
=======
    const { idOrSlug } = req.params;
    const product = await productService.getProductById(idOrSlug);
    return res.json(successResponse(product));
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/admin/products
 * @desc    Create a new product
 * @access  Admin
 */
export const createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const input: ProductInput = req.body;
  const adminId = req.user!.id;

  const product = await productService.createProduct(input, adminId);
  return res.status(201).json(successResponse(product, 'Product created successfully'));
=======
    const input: ProductInput = req.body;
    const adminId = req.user!.id;

    const product = await productService.createProduct(input, adminId);
    return res.status(201).json(successResponse(product, 'Product created successfully'));
>>>>>>> Stashed changes
});

/**
 * @route   PUT /api/admin/products/:id
 * @desc    Update a product
 * @access  Admin
 */
export const updateProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const { id } = req.params;
  const input: ProductUpdateInput = req.body;
  const adminId = req.user!.id;

  const product = await productService.updateProduct(id, input, adminId);
  return res.json(successResponse(product, 'Product updated successfully'));
=======
    const { id } = req.params;
    const input: ProductUpdateInput = req.body;
    const adminId = req.user!.id;

    const product = await productService.updateProduct(id, input, adminId);
    return res.json(successResponse(product, 'Product updated successfully'));
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/admin/products/:id
 * @desc    Delete a product (soft delete)
 * @access  Admin
 */
export const deleteProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
  const { id } = req.params;
  const adminId = req.user!.id;

  await productService.deleteProduct(id, adminId);
  return res.json(successResponse(null, 'Product deleted successfully'));
});

export const productController = {
  getProducts,
  getSaleProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
=======
    const { id } = req.params;
    const adminId = req.user!.id;

    await productService.deleteProduct(id, adminId);
    return res.json(successResponse(null, 'Product deleted successfully'));
});

export const productController = {
    getProducts,
    getSaleProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
>>>>>>> Stashed changes
};

export default productController;
