import { get } from "./client"

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  productCount: number
  parent?: { id: string; name: string; slug: string }
  children?: { id: string; name: string; slug: string }[]
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  return get<Category[]>("/api/categories", { skipAuth: true })
}

// Get root categories only
export async function getRootCategories(): Promise<Category[]> {
  return get<Category[]>("/api/categories/root", { skipAuth: true })
}

// Get single category by ID or slug
export async function getCategory(idOrSlug: string): Promise<Category> {
  return get<Category>(`/api/categories/${idOrSlug}`, { skipAuth: true })
}
