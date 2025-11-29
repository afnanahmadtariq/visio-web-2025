import type { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { reviewService } from '../services/review.service';
import { successResponse, paginatedResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { ReviewInput, ReviewUpdateInput, ReviewQueryInput } from '../validations/review.validation';

/**
 * @route   GET /api/products/:productId/reviews
 * @desc    Get reviews for a product
 * @access  Public
 */
export const getProductReviews = asyncHandler(async (req: Request, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { productId } = req.params;
  const query: ReviewQueryInput = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as 'createdAt' | 'rating') || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const result = await reviewService.getProductReviews(productId, query);
  return res.json({
    success: true,
    ...paginatedResponse(result.data, result.pagination),
    stats: result.stats,
  });
=======
=======
>>>>>>> Stashed changes
    const { productId } = req.params;
    const query: ReviewQueryInput = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sortBy: (req.query.sortBy as 'createdAt' | 'rating') || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await reviewService.getProductReviews(productId, query);
    return res.json({
        success: true,
        ...paginatedResponse(result.data, result.pagination),
        stats: result.stats,
    });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   GET /api/reviews/my-reviews
 * @desc    Get user's reviews
 * @access  Private
 */
export const getMyReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const query: ReviewQueryInput = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as 'createdAt' | 'rating') || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const result = await reviewService.getUserReviews(userId, query);
  return res.json(paginatedResponse(result.data, result.pagination));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const query: ReviewQueryInput = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sortBy: (req.query.sortBy as 'createdAt' | 'rating') || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await reviewService.getUserReviews(userId, query);
    return res.json(paginatedResponse(result.data, result.pagination));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   POST /api/reviews
 * @desc    Create or update a review
 * @access  Private
 */
export const createReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const input: ReviewInput = req.body;

  const review = await reviewService.createOrUpdateReview(userId, input);
  return res.status(201).json(successResponse(review, 'Review submitted successfully'));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const input: ReviewInput = req.body;

    const review = await reviewService.createOrUpdateReview(userId, input);
    return res.status(201).json(successResponse(review, 'Review submitted successfully'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update a review
 * @access  Private
 */
export const updateReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { id } = req.params;
  const input: ReviewUpdateInput = req.body;

  const review = await reviewService.updateReview(userId, id, input);
  return res.json(successResponse(review, 'Review updated successfully'));
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const { id } = req.params;
    const input: ReviewUpdateInput = req.body;

    const review = await reviewService.updateReview(userId, id, input);
    return res.json(successResponse(review, 'Review updated successfully'));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete a review
 * @access  Private/Admin
 */
export const deleteReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const userId = req.user!.id;
  const { id } = req.params;
  const isAdmin = req.user!.role === 'ADMIN';

  await reviewService.deleteReview(userId, id, isAdmin);
  return res.json(successResponse(null, 'Review deleted successfully'));
});

export const reviewController = {
  getProductReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
=======
=======
>>>>>>> Stashed changes
    const userId = req.user!.id;
    const { id } = req.params;
    const isAdmin = req.user!.role === 'ADMIN';

    await reviewService.deleteReview(userId, id, isAdmin);
    return res.json(successResponse(null, 'Review deleted successfully'));
});

export const reviewController = {
    getProductReviews,
    getMyReviews,
    createReview,
    updateReview,
    deleteReview,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

export default reviewController;
