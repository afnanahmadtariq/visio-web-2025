import { create } from "zustand"

// User roles enum
export type UserRole = "USER" | "ADMIN"

// User type with role for RBAC
export type AuthUser = {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

// Auth state interface
interface AuthState {
  // User state
  user: AuthUser | null
  
  // Token stored in memory only (safest approach)
  // NEVER store JWT in localStorage for sensitive apps
  accessToken: string | null
  
  // CSRF token for requests
  csrfToken: string | null
  
  // Loading states
  isLoading: boolean
  isInitialized: boolean
  
  // Actions
  setAuth: (user: AuthUser, accessToken: string) => void
  setCSRFToken: (token: string) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void
  
  // Computed getters
  isAuthenticated: () => boolean
  isAdmin: () => boolean
  getAccessToken: () => string | null
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  csrfToken: null,
  isLoading: true,
  isInitialized: false,
  
  // Set authentication data
  setAuth: (user, accessToken) => {
    set({ 
      user, 
      accessToken,
      isLoading: false,
    })
  },
  
  // Set CSRF token
  setCSRFToken: (token) => {
    set({ csrfToken: token })
  },
  
  // Clear all auth data (logout)
  clearAuth: () => {
    set({ 
      user: null, 
      accessToken: null,
      // Keep CSRF token as it might still be needed
    })
  },
  
  // Loading state
  setLoading: (loading) => {
    set({ isLoading: loading })
  },
  
  // Initialization state
  setInitialized: (initialized) => {
    set({ isInitialized: initialized })
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    const state = get()
    return !!state.user && !!state.accessToken
  },
  
  // Check if user is admin
  isAdmin: () => {
    const state = get()
    return state.user?.role === "ADMIN"
  },
  
  // Get access token for API calls
  getAccessToken: () => {
    return get().accessToken
  },
}))

// Selectors for better performance
export const selectUser = (state: AuthState) => state.user
export const selectIsAuthenticated = (state: AuthState) => !!state.user && !!state.accessToken
export const selectIsAdmin = (state: AuthState) => state.user?.role === "ADMIN"
export const selectIsLoading = (state: AuthState) => state.isLoading
