import { get, post } from "./client"

export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "SHIPPED" | "COMPLETED"
export type PaymentMethod = "CREDIT" | "DUMMY" | "CASH"

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  salePercent?: number
  product: {
    name: string
    mainImageUrl?: string
  }
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  totalAmount: number
  createdAt: string
  items: OrderItem[]
  payment?: {
    id: string
    status: string
    provider: string
    amount: number
  }
  shippingAddress?: Address
  billingAddress?: Address
}

export interface Address {
  id: string
  label?: string
  fullName: string
  line1: string
  line2?: string
  city: string
  state?: string
  postalCode?: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface OrdersResponse {
  data: Order[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface CreateOrderData {
  shippingAddressId: string
  billingAddressId?: string
  paymentMethod: PaymentMethod
  useSameAddressForBilling?: boolean
}

// Create a new order
export async function createOrder(data: CreateOrderData): Promise<Order> {
  return post<Order>("/api/orders", data)
}

// Get user's orders
export async function getOrders(
  page = 1,
  limit = 10,
  status?: OrderStatus
): Promise<OrdersResponse> {
  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("limit", String(limit))
  if (status) params.set("status", status)
  
  return get<OrdersResponse>(`/api/orders?${params.toString()}`)
}

// Get single order
export async function getOrder(orderId: string): Promise<Order> {
  return get<Order>(`/api/orders/${orderId}`)
}

// Cancel an order
export async function cancelOrder(orderId: string): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/api/orders/${orderId}/cancel`)
}
