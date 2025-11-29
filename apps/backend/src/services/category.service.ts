import { prisma } from '../db/prisma';
import { NotFoundError, BadRequestError, ConflictError } from '../middlewares/errorHandler.middleware';
import type { CategoryInput, CategoryUpdateInput } from '../validations/category.validation';

/**
 * Get all categories (with hierarchy)
 */
export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
      parent: {
        select: { id: true, name: true, slug: true },
      },
      children: {
        where: { deletedAt: null },
        select: { id: true, name: true, slug: true },
      },
    },
  });

  return categories.map((cat) => ({
    ...cat,
    productCount: cat._count.products,
    _count: undefined,
  }));
};

/**
 * Get category by ID or slug
 */
export const getCategoryByIdOrSlug = async (idOrSlug: string) => {
  const category = await prisma.category.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      deletedAt: null,
    },
    include: {
      parent: {
        select: { id: true, name: true, slug: true },
      },
      children: {
        where: { deletedAt: null },
        select: { id: true, name: true, slug: true },
      },
      _count: {
        select: { products: true },
      },
    },
  });

  if (!category) {
    throw new NotFoundError('Category');
  }

  return {
    ...category,
    productCount: category._count.products,
    _count: undefined,
  };
};

/**
 * Get root categories (no parent)
 */
export const getRootCategories = async () => {
  const categories = await prisma.category.findMany({
    where: { parentId: null, deletedAt: null },
    orderBy: { name: 'asc' },
    include: {
      children: {
        where: { deletedAt: null },
        select: { id: true, name: true, slug: true },
      },
      _count: {
        select: { products: true },
      },
    },
  });

  return categories.map((cat) => ({
    ...cat,
    productCount: cat._count.products,
    _count: undefined,
  }));
};

/**
 * Create a new category (Admin)
 */
export const createCategory = async (input: CategoryInput) => {
  // Check if slug exists
  const existingSlug = await prisma.category.findUnique({
    where: { slug: input.slug },
    select: { id: true },
  });

  if (existingSlug) {
    throw new ConflictError('Category slug already exists');
  }

  // Verify parent exists if provided
  if (input.parentId) {
    const parent = await prisma.category.findUnique({
      where: { id: input.parentId },
      select: { id: true, deletedAt: true },
    });

    if (!parent || parent.deletedAt) {
      throw new NotFoundError('Parent category');
    }
  }

  const category = await prisma.category.create({
    data: input,
  });

  return category;
};

/**
 * Update a category (Admin)
 */
export const updateCategory = async (id: string, input: CategoryUpdateInput) => {
  const existing = await prisma.category.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError('Category');
  }

  // Check slug uniqueness if being changed
  if (input.slug) {
    const existingSlug = await prisma.category.findFirst({
      where: { slug: input.slug, id: { not: id } },
      select: { id: true },
    });

    if (existingSlug) {
      throw new ConflictError('Category slug already exists');
    }
  }

  // Prevent circular parent reference
  if (input.parentId === id) {
    throw new BadRequestError('Category cannot be its own parent');
  }

  // Verify parent exists if provided
  if (input.parentId) {
    const parent = await prisma.category.findUnique({
      where: { id: input.parentId },
      select: { id: true, deletedAt: true },
    });

    if (!parent || parent.deletedAt) {
      throw new NotFoundError('Parent category');
    }
  }

  const category = await prisma.category.update({
    where: { id },
    data: input,
  });

  return category;
};

/**
 * Delete a category (Admin - soft delete)
 */
export const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: { select: { products: true, children: true } },
    },
  });

  if (!category) {
    throw new NotFoundError('Category');
  }

  if (category._count.products > 0) {
    throw new BadRequestError('Cannot delete category with products. Remove products first.');
  }

  if (category._count.children > 0) {
    throw new BadRequestError('Cannot delete category with subcategories. Remove subcategories first.');
  }

  await prisma.category.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return { success: true };
};

export const categoryService = {
  getCategories,
  getCategoryByIdOrSlug,
  getRootCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
