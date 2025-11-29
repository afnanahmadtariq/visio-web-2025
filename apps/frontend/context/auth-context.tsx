"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { 
  useAuthStore, 
  type AuthUser, 
  type UserRole,
  selectUser,
  selectIsAuthenticated,
  selectIsAdmin,
  selectIsLoading,
} from "@/lib/stores/auth-store"
import { post, APIError } from "@/lib/api/client"

// Re-export types for convenience
export type { AuthUser as User, UserRole }

// API Response types
interface AuthApiResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      email: string
      username: string
      role: "USER" | "ADMIN"
      creditBalance: number
    }
    accessToken: string
  }
}

type AuthResult = { success: boolean; message: string; isAdmin?: boolean }

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>
  signOut: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Auth Provider that uses Zustand store for secure token management.
 * 
 * SECURITY NOTES:
 * - JWT tokens are stored in memory (Zustand), NOT localStorage
 * - Tokens are cleared on page refresh (user must re-authenticate)
 * - For persistent sessions, implement refresh tokens with httpOnly cookies
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useAuthStore(selectUser)
  const isLoading = useAuthStore(selectIsLoading)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isAdmin = useAuthStore(selectIsAdmin)
  const { setAuth, clearAuth, setLoading, setInitialized } = useAuthStore()

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // In production, you would:
        // 1. Check for refresh token in httpOnly cookie
        // 2. Call backend to get new access token
        // 3. Set auth state with new token
        
        // For demo purposes, we'll check for a demo session
        // NOTE: In production, NEVER store tokens in localStorage
        const demoSession = sessionStorage.getItem("demoSession")
        if (demoSession) {
          try {
            const session = JSON.parse(demoSession)
            if (session.user && session.token) {
              setAuth(session.user, session.token)
            }
          } catch {
            sessionStorage.removeItem("demoSession")
          }
        }
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }
    
    initializeAuth()
  }, [setAuth, setLoading, setInitialized])

  const signIn = async (
    email: string, 
    password: string
  ): Promise<AuthResult> => {
    try {
      const response = await post<AuthApiResponse>('/api/auth/login', { email, password }, { skipAuth: true })
      
      if (response.success && response.data) {
        const { user: apiUser, accessToken } = response.data
        
        // Transform API user to AuthUser format
        const user: AuthUser = {
          id: apiUser.id,
          email: apiUser.email,
          name: apiUser.username,
          role: apiUser.role,
          createdAt: new Date().toISOString(),
        }
        
        // Store in Zustand (memory-only, safest approach)
        setAuth(user, accessToken)
        
        // For demo persistence across page navigation
        sessionStorage.setItem("demoSession", JSON.stringify({
          user,
          token: accessToken,
        }))
        
        return { success: true, message: response.message || "Successfully signed in!", isAdmin: apiUser.role === "ADMIN" }
      }
      
      return { success: false, message: response.message || "Login failed" }
    } catch (error) {
      console.error("Sign in error:", error)
      
      if (error instanceof APIError) {
        // Handle lockout and other specific errors
        if (error.status === 401) {
          const errorData = error.data as { message?: string } | undefined
          const message = errorData?.message || "Invalid email or password"
          // Check for lockout
          if (message.toLowerCase().includes("locked")) {
            return { success: false, message: "Account is locked. Please contact support." }
          }
          return { success: false, message }
        }
        return { success: false, message: error.message }
      }
      
      return { success: false, message: "An error occurred during sign in" }
    }
  }

  const signUp = async (
    name: string, 
    email: string, 
    password: string
  ): Promise<AuthResult> => {
    try {
      // Call the backend register API
      // Note: Backend expects { email, username, password }
      const response = await post<AuthApiResponse>('/api/auth/register', { 
        email, 
        username: name, 
        password 
      }, { skipAuth: true })
      
      if (response.success) {
        // Registration successful - don't auto-login, let user sign in manually
        return { success: true, message: response.message || "Account created successfully! Please sign in." }
      }
      
      return { success: false, message: response.message || "Registration failed" }
    } catch (error) {
      console.error("Sign up error:", error)
      
      if (error instanceof APIError) {
        const errorData = error.data as { message?: string } | undefined
        return { success: false, message: errorData?.message || error.message }
      }
      
      return { success: false, message: "An error occurred during sign up" }
    }
  }

  const signOut = async () => {
    try {
      // Call backend logout to clear httpOnly cookies
      await post('/api/auth/logout', undefined, { skipAuth: false })
    } catch (error) {
      // Continue with client-side logout even if API call fails
      console.error("Logout API error:", error)
    }
    
    // Clear Zustand state (removes token from memory)
    clearAuth()
    
    // Clear demo session storage
    sessionStorage.removeItem("demoSession")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
