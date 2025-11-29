/**
 * Security utilities for preventing common frontend attacks
 */

/**
 * Validate that a request is not sending sensitive data that should come from backend
 * Use this before sending checkout/order data
 */
export function validateCheckoutData(items: Array<{ productId: string; quantity: number }>) {
  // Ensure no price data is being sent
  for (const item of items) {
    const itemKeys = Object.keys(item)
    const forbiddenKeys = ["price", "salePercent", "stock", "originalPrice", "discount"]
    
    for (const key of forbiddenKeys) {
      if (itemKeys.includes(key)) {
        console.warn(
          `Security Warning: Attempted to send "${key}" in checkout data. ` +
          `This field will be ignored - prices are calculated on the backend.`
        )
      }
    }
  }
  
  // Return only safe data
  return items.map(({ productId, quantity }) => ({
    productId,
    quantity: Math.max(1, Math.floor(quantity)), // Ensure positive integer
  }))
}

/**
 * Check if the current user has admin role
 * NOTE: This is for UI only. Backend MUST enforce RBAC independently.
 */
export function hasAdminAccess(userRole?: string | null): boolean {
  return userRole === "ADMIN"
}

/**
 * Rate limiting helper for frontend actions
 * Helps prevent abuse but backend MUST also implement rate limiting
 */
export function createRateLimiter(maxAttempts: number, windowMs: number) {
  const attempts: number[] = []
  
  return {
    canAttempt(): boolean {
      const now = Date.now()
      // Remove old attempts outside the window
      while (attempts.length > 0 && attempts[0] < now - windowMs) {
        attempts.shift()
      }
      return attempts.length < maxAttempts
    },
    
    recordAttempt(): void {
      attempts.push(Date.now())
    },
    
    getRemainingAttempts(): number {
      const now = Date.now()
      while (attempts.length > 0 && attempts[0] < now - windowMs) {
        attempts.shift()
      }
      return Math.max(0, maxAttempts - attempts.length)
    },
    
    getTimeUntilReset(): number {
      if (attempts.length === 0) return 0
      const oldestAttempt = attempts[0]
      return Math.max(0, windowMs - (Date.now() - oldestAttempt))
    },
  }
}

/**
 * Secure storage utilities
 * For non-sensitive data only - sensitive data should be in memory (Zustand)
 */
export const secureStorage = {
  /**
   * Store non-sensitive preference data
   */
  setItem(key: string, value: string): void {
    try {
      // Only store non-sensitive data
      const sensitiveKeys = ["token", "password", "secret", "jwt", "auth"]
      const lowerKey = key.toLowerCase()
      
      if (sensitiveKeys.some((sk) => lowerKey.includes(sk))) {
        console.warn(
          `Security Warning: Attempted to store sensitive data ("${key}") in localStorage. ` +
          `Use Zustand auth store for tokens and sensitive data.`
        )
        return
      }
      
      localStorage.setItem(key, value)
    } catch {
      // localStorage might not be available (SSR, private mode)
    }
  },
  
  /**
   * Get non-sensitive preference data
   */
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  
  /**
   * Remove item from storage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // Ignore errors
    }
  },
}
