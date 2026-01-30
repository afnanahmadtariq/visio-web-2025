import { Router, RequestHandler } from 'express';
import { addressController } from '../controllers/address.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { AddressSchema, AddressUpdateSchema } from '../validations/address.validation';

const router = Router();

// All address routes require authentication
router.use(isAuthenticated as unknown as RequestHandler);

/**
 * @route   GET /api/addresses
 * @desc    Get user's addresses
 * @access  Private
 */
router.get('/', addressController.getAddresses);

/**
 * @route   GET /api/addresses/:id
 * @desc    Get address by ID
 * @access  Private
 */
router.get('/:id', addressController.getAddressById);

/**
 * @route   POST /api/addresses
 * @desc    Create a new address
 * @access  Private
 */
router.post('/', validateRequest(AddressSchema), addressController.createAddress);

/**
 * @route   PUT /api/addresses/:id
 * @desc    Update an address
 * @access  Private
 */
router.put('/:id', validateRequest(AddressUpdateSchema), addressController.updateAddress);

/**
 * @route   DELETE /api/addresses/:id
 * @desc    Delete an address (soft delete)
 * @access  Private
 */
router.delete('/:id', addressController.deleteAddress);

/**
 * @route   PUT /api/addresses/:id/default
 * @desc    Set address as default
 * @access  Private
 */
router.put('/:id/default', addressController.setDefaultAddress);

export default router;
