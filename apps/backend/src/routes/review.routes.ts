import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { ReviewSchema, ReviewUpdateSchema } from '../validations/review.validation';

const router = Router();

/**
 * @route   GET /api/reviews/my-reviews
 * @desc    Get user's reviews
 * @access  Private
 */
router.get('/my-reviews', isAuthenticated, reviewController.getMyReviews);

/**
 * @route   POST /api/reviews
 * @desc    Create or update a review
 * @access  Private
 */
router.post('/', isAuthenticated, validateRequest(ReviewSchema), reviewController.createReview);

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update a review
 * @access  Private
 */
router.put('/:id', isAuthenticated, validateRequest(ReviewUpdateSchema), reviewController.updateReview);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete a review
 * @access  Private/Admin
 */
router.delete('/:id', isAuthenticated, reviewController.deleteReview);

export default router;
