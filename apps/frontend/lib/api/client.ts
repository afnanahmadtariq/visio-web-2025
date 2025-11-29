import { useAuthStore } from "@/lib/stores/auth-store"

// API Base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000"

// Request options type
interface RequestOptions extends RequestInit {
  skipAuth?: boolean
  skipCSRF?: boolean
}

// API Error class
export class APIError extends Error {
  status: number
  data?: unknown
  
  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.data = data
  }
}

/**
 * Creates an API client with automatic auth and CSRF token handling
 * This is the ONLY way to make authenticated API calls
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuth = false, skipCSRF = false, ...fetchOptions } = options
  
  // Get auth state
  const authStore = useAuthStore.getState()
  const accessToken = authStore.accessToken
  const csrfToken = authStore.csrfToken
  
  // Build headers
  const headers = new Headers(fetchOptions.headers)
  
  // Set content type if not set
  if (!headers.has("Content-Type") && fetchOptions.body) {
    headers.set("Content-Type", "application/json")
  }
  
  // Add Authorization header if authenticated and not skipped
  if (!skipAuth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  }
  
  // Add CSRF token if available and not skipped
  // Backend should validate this for state-changing requests
  if (!skipCSRF && csrfToken) {
    headers.set("X-CSRF-Token", csrfToken)
  }
  
  // Build full URL
  const url = endpoint.startsWith("http") 
    ? endpoint 
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      // Include credentials for cookie-based auth if needed
      credentials: "include",
    })
    
    // Handle 401 Unauthorized - clear auth state
    if (response.status === 401) {
      authStore.clearAuth()
      throw new APIError("Unauthorized", 401)
    }
    
    // Handle 403 Forbidden
    if (response.status === 403) {
      throw new APIError("Forbidden", 403)
    }
    
    // Handle other error responses
    if (!response.ok) {
      let errorData: unknown
      try {
        errorData = await response.json()
      } catch {
        errorData = await response.text()
      }
      throw new APIError(
        (errorData as { message?: string })?.message || "Request failed",
        response.status,
        errorData
      )
    }
    
    // Handle empty responses
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return {} as T
    }
    
    return response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError(
      error instanceof Error ? error.message : "Network error",
      0
    )
  }
}

/**
 * GET request helper
 */
export function get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: "GET" })
}

/**
 * POST request helper
 */
export function post<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT request helper
 */
export function put<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PATCH request helper
 */
export function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE request helper
 */
export function del<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: "DELETE" })
}

// Fetch CSRF token from backend
export async function fetchCSRFToken(): Promise<void> {
  try {
    const response = await get<{ csrfToken: string }>("/api/csrf-token", {
      skipAuth: true,
      skipCSRF: true,
    })
    if (response.csrfToken) {
      useAuthStore.getState().setCSRFToken(response.csrfToken)
    }
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error)
  }
}
