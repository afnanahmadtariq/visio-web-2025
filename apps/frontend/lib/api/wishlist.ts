import { get, post, del } from "./client"

export interface WishlistItem {
  id: string
  productId: string
  addedAt: string
  product: {
    id: string
    name: string
    slug: string
    price: number
    discountedPrice?: number
    salePercent?: number
    stock: number
    mainImageUrl?: string
    inStock: boolean
  }
}

export interface Wishlist {
  items: WishlistItem[]
  totalItems: number
}

// Get wishlist
export async function getWishlist(): Promise<Wishlist> {
  return get<Wishlist>("/api/wishlist")
}

// Add product to wishlist
export async function addToWishlist(productId: string): Promise<Wishlist> {
  return post<Wishlist>(`/api/wishlist/${productId}`)
}

// Remove product from wishlist
export async function removeFromWishlist(productId: string): Promise<Wishlist> {
  return del<Wishlist>(`/api/wishlist/${productId}`)
}

// Check if product is in wishlist
export async function isInWishlist(productId: string): Promise<{ inWishlist: boolean }> {
  return get<{ inWishlist: boolean }>(`/api/wishlist/${productId}/check`)
}

// Move wishlist item to cart
export async function moveToCart(productId: string): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/api/wishlist/${productId}/move-to-cart`)
}

// Clear entire wishlist
export async function clearWishlist(): Promise<{ success: boolean }> {
  return del<{ success: boolean }>("/api/wishlist")
}
