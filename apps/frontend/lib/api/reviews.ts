import { get, post, put, del } from "./client"

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  title?: string
  comment?: string
  createdAt: string
  user: { id: string; username: string }
  product?: {
    id: string
    name: string
    slug: string
    mainImageUrl?: string
  }
}

export interface ReviewsResponse {
  data: Review[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface CreateReviewData {
  productId: string
  rating: number
  title?: string
  comment?: string
}

// Get user's reviews
export async function getMyReviews(
  page = 1,
  limit = 10,
  sortBy: "rating" | "createdAt" = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Promise<ReviewsResponse> {
  return get<ReviewsResponse>(
    `/api/reviews?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  )
}

// Create a new review
export async function createReview(data: CreateReviewData): Promise<Review> {
  return post<Review>("/api/reviews", data)
}

// Update a review
export async function updateReview(
  reviewId: string,
  data: Partial<Omit<CreateReviewData, "productId">>
): Promise<Review> {
  return put<Review>(`/api/reviews/${reviewId}`, data)
}

// Delete a review
export async function deleteReview(reviewId: string): Promise<{ success: boolean }> {
  return del<{ success: boolean }>(`/api/reviews/${reviewId}`)
}
