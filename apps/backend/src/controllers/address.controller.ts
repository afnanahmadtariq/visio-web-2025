import type { Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { addressService } from '../services/address.service';
import { successResponse } from '../utils/response';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import type { AddressInput, AddressUpdateInput } from '../validations/address.validation';

/**
 * @route   GET /api/addresses
 * @desc    Get user's addresses
 * @access  Private
 */
export const getAddresses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const addresses = await addressService.getAddresses(userId);
    return res.json(successResponse(addresses));
});

/**
 * @route   GET /api/addresses/:id
 * @desc    Get address by ID
 * @access  Private
 */
export const getAddressById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const address = await addressService.getAddressById(userId, id);
    return res.json(successResponse(address));
});

/**
 * @route   POST /api/addresses
 * @desc    Create a new address
 * @access  Private
 */
export const createAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const input: AddressInput = req.body;

    const address = await addressService.createAddress(userId, input);
    return res.status(201).json(successResponse(address, 'Address created successfully'));
});

/**
 * @route   PUT /api/addresses/:id
 * @desc    Update an address
 * @access  Private
 */
export const updateAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const input: AddressUpdateInput = req.body;

    const address = await addressService.updateAddress(userId, id, input);
    return res.json(successResponse(address, 'Address updated successfully'));
});

/**
 * @route   DELETE /api/addresses/:id
 * @desc    Delete an address (soft delete)
 * @access  Private
 */
export const deleteAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    await addressService.deleteAddress(userId, id);
    return res.json(successResponse(null, 'Address deleted successfully'));
});

/**
 * @route   PUT /api/addresses/:id/default
 * @desc    Set address as default
 * @access  Private
 */
export const setDefaultAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const addresses = await addressService.setDefaultAddress(userId, id);
    return res.json(successResponse(addresses, 'Default address updated'));
});

export const addressController = {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};

export default addressController;
