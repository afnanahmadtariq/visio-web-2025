/**
 * Mock data for products
 * 
 * NOTE: In production, this data should come from the backend API.
 * Never trust client-side data for prices, stock, etc.
 * Backend should be the single source of truth.
 */

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  colors?: string[]
  sizes?: string[]
  featured?: boolean
  salePercent?: number
}

// Mock products data - in production, fetch from backend
const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "Premium cotton t-shirt with a comfortable fit",
    price: 29.99,
    category: "Clothing",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 50,
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality audio with noise cancellation",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    stockCount: 25,
    featured: true,
    salePercent: 25,
  },
  {
    id: "3",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots",
    price: 49.99,
    category: "Accessories",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    stockCount: 100,
    colors: ["Brown", "Black"],
  },
  {
    id: "4",
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes",
    price: 89.99,
    category: "Footwear",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    stockCount: 30,
    sizes: ["7", "8", "9", "10", "11", "12"],
    featured: true,
  },
  {
    id: "5",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 299.99,
    originalPrice: 349.99,
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    reviewCount: 445,
    inStock: true,
    stockCount: 15,
    salePercent: 14,
  },
]

/**
 * Get all products
 * In production, this should fetch from backend API
 */
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return products
}

/**
 * Get a single product by ID
 * In production, this should fetch from backend API
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return products.find(p => p.id === id)
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return products.filter(p => p.featured)
}

/**
 * Get products on sale
 */
export async function getSaleProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return products.filter(p => p.salePercent && p.salePercent > 0)
}
