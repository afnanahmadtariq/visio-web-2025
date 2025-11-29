import { get } from "./client"

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock: number
  salePercent?: number
  isActive: boolean
  mainImageUrl?: string
  createdAt: string
  categories: { id: string; name: string; slug: string }[]
  averageRating?: number
  reviewCount?: number
  images?: { id: string; url: string; alt?: string; sortOrder: number }[]
}

export interface ProductsResponse {
  data: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ProductFilters {
  page?: number
  limit?: number
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  onSale?: boolean
  sortBy?: "price" | "name" | "createdAt" | "rating"
  sortOrder?: "asc" | "desc"
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  distribution: { [key: string]: number }
}

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  title?: string
  comment?: string
  createdAt: string
  user: { id: string; username: string }
}

export interface ReviewsResponse {
  data: Review[]
  stats: ReviewStats
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Get all products with filters
export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams()
  
  if (filters.page) params.set("page", String(filters.page))
  if (filters.limit) params.set("limit", String(filters.limit))
  if (filters.category) params.set("category", filters.category)
  if (filters.search) params.set("search", filters.search)
  if (filters.minPrice) params.set("minPrice", String(filters.minPrice))
  if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice))
  if (filters.onSale) params.set("onSale", "true")
  if (filters.sortBy) params.set("sortBy", filters.sortBy)
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder)
  
  const query = params.toString()
  return get<ProductsResponse>(`/api/products${query ? `?${query}` : ""}`, { skipAuth: true })
}

// Get products on sale
export async function getSaleProducts(page = 1, limit = 20): Promise<ProductsResponse> {
  return get<ProductsResponse>(`/api/products/sale?page=${page}&limit=${limit}`, { skipAuth: true })
}

// Get products by category
export async function getProductsByCategory(
  categorySlug: string,
  page = 1,
  limit = 20
): Promise<ProductsResponse> {
  return get<ProductsResponse>(
    `/api/products/category/${categorySlug}?page=${page}&limit=${limit}`,
    { skipAuth: true }
  )
}

// Get single product by ID or slug
export async function getProduct(idOrSlug: string): Promise<Product> {
  return get<Product>(`/api/products/${idOrSlug}`, { skipAuth: true })
}

// Get product reviews
export async function getProductReviews(
  productId: string,
  page = 1,
  limit = 10,
  sortBy: "rating" | "createdAt" = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Promise<ReviewsResponse> {
  return get<ReviewsResponse>(
    `/api/products/${productId}/reviews?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    { skipAuth: true }
  )
}

// Search products (for autocomplete)
export async function searchProducts(query: string, limit = 5): Promise<ProductsResponse> {
  return get<ProductsResponse>(`/api/products?search=${encodeURIComponent(query)}&limit=${limit}`, {
    skipAuth: true,
  })
}

// Helper to calculate discounted price
export function getDiscountedPrice(product: Product): number {
  if (product.salePercent && product.salePercent > 0) {
    return product.price * (1 - product.salePercent / 100)
  }
  return product.price
}
