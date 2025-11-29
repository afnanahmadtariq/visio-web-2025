import { prisma } from '../db/prisma';
import { NotFoundError, BadRequestError } from '../middlewares/errorHandler.middleware';
import type { AddressInput, AddressUpdateInput } from '../validations/address.validation';

/**
 * Get user's addresses
 */
export const getAddresses = async (userId: string) => {
  const addresses = await prisma.userAddress.findMany({
    where: { userId, deletedAt: null },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });

  return addresses;
};

/**
 * Get address by ID
 */
export const getAddressById = async (userId: string, addressId: string) => {
  const address = await prisma.userAddress.findFirst({
    where: { id: addressId, userId, deletedAt: null },
  });

  if (!address) {
    throw new NotFoundError('Address');
  }

  return address;
};

/**
 * Create a new address
 */
export const createAddress = async (userId: string, input: AddressInput) => {
  // If this is set as default, unset other defaults
  if (input.isDefault) {
    await prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  // If this is the first address, make it default
  const existingCount = await prisma.userAddress.count({
    where: { userId, deletedAt: null },
  });

  const address = await prisma.userAddress.create({
    data: {
      userId,
      ...input,
      isDefault: input.isDefault || existingCount === 0,
    },
  });

  return address;
};

/**
 * Update an address
 */
export const updateAddress = async (userId: string, addressId: string, input: AddressUpdateInput) => {
  const existing = await prisma.userAddress.findFirst({
    where: { id: addressId, userId, deletedAt: null },
  });

  if (!existing) {
    throw new NotFoundError('Address');
  }

  // If setting as default, unset other defaults
  if (input.isDefault) {
    await prisma.userAddress.updateMany({
      where: { userId, isDefault: true, id: { not: addressId } },
      data: { isDefault: false },
    });
  }

  const address = await prisma.userAddress.update({
    where: { id: addressId },
    data: input,
  });

  return address;
};

/**
 * Delete an address (soft delete)
 */
export const deleteAddress = async (userId: string, addressId: string) => {
  const address = await prisma.userAddress.findFirst({
    where: { id: addressId, userId, deletedAt: null },
  });

  if (!address) {
    throw new NotFoundError('Address');
  }

  // Check if address is used in any pending orders
  const pendingOrders = await prisma.order.count({
    where: {
      OR: [{ shippingAddressId: addressId }, { billingAddressId: addressId }],
      status: { in: ['PENDING', 'PAID', 'SHIPPED'] },
    },
  });

  if (pendingOrders > 0) {
    throw new BadRequestError('Cannot delete address used in pending orders');
  }

  await prisma.userAddress.update({
    where: { id: addressId },
    data: { deletedAt: new Date(), isDefault: false },
  });

  // If deleted address was default, set another one as default
  if (address.isDefault) {
    const firstAddress = await prisma.userAddress.findFirst({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (firstAddress) {
      await prisma.userAddress.update({
        where: { id: firstAddress.id },
        data: { isDefault: true },
      });
    }
  }

  return { success: true };
};

/**
 * Set address as default
 */
export const setDefaultAddress = async (userId: string, addressId: string) => {
  const address = await prisma.userAddress.findFirst({
    where: { id: addressId, userId, deletedAt: null },
  });

  if (!address) {
    throw new NotFoundError('Address');
  }

  await prisma.$transaction([
    prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    }),
    prisma.userAddress.update({
      where: { id: addressId },
      data: { isDefault: true },
    }),
  ]);

  return getAddresses(userId);
};

export const addressService = {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};

export default addressService;
