import { get, post, put, del } from "./client"

export interface CartItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  product: {
    id: string
    name: string
    slug: string
    price: number
    discountedPrice?: number
    salePercent?: number
    stock: number
    mainImageUrl?: string
  }
  subtotal: number
}

export interface Cart {
  id: string
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

// Get current cart
export async function getCart(): Promise<Cart> {
  return get<Cart>("/api/cart")
}

// Add item to cart
export async function addToCart(productId: string, quantity = 1): Promise<Cart> {
  return post<Cart>("/api/cart", { productId, quantity })
}

// Update cart item quantity
export async function updateCartItem(itemId: string, quantity: number): Promise<Cart> {
  return put<Cart>(`/api/cart/${itemId}`, { quantity })
}

// Remove item from cart
export async function removeFromCart(itemId: string): Promise<Cart> {
  return del<Cart>(`/api/cart/${itemId}`)
}

// Clear entire cart
export async function clearCart(): Promise<{ success: boolean }> {
  return del<{ success: boolean }>("/api/cart")
}
