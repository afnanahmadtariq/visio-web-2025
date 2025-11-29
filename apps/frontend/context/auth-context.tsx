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

// Re-export types for convenience
export type { AuthUser as User, UserRole }

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
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
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // In production, this would call the backend API:
      // const response = await post<AuthResponse>('/api/auth/login', { email, password })
      
      // Demo implementation - simulates backend response
      // In production, NEVER store passwords or do auth logic on frontend
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Demo users with roles
      const demoUsers: Array<AuthUser & { password: string }> = [
        {
          id: "admin-1",
          email: "admin@visiomart.com",
          name: "Admin User",
          role: "ADMIN",
          password: "admin123",
          createdAt: new Date().toISOString(),
        },
        {
          id: "demo-1",
          email: "demo@visiomart.com",
          name: "Demo User",
          role: "USER",
          password: "demo123",
          createdAt: new Date().toISOString(),
        },
      ]
      
      const foundUser = demoUsers.find(
        u => u.email === email && u.password === password
      )
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        
        // Generate a mock JWT (in production, backend generates this)
        const mockToken = `demo.${btoa(JSON.stringify(userWithoutPassword))}.signature`
        
        // Store in Zustand (memory-only, safest approach)
        setAuth(userWithoutPassword, mockToken)
        
        // For demo persistence across page navigation (not production-safe)
        // In production, use httpOnly cookies managed by backend
        sessionStorage.setItem("demoSession", JSON.stringify({
          user: userWithoutPassword,
          token: mockToken,
        }))
        
        return { success: true, message: "Successfully signed in!" }
      }
      
      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Sign in error:", error)
      return { success: false, message: "An error occurred during sign in" }
    }
  }

  const signUp = async (
    name: string, 
    email: string, 
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // In production, this would call the backend API:
      // const response = await post<AuthResponse>('/api/auth/register', { name, email, password })
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Demo implementation - creates a new user
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "USER", // New users are always regular users
        createdAt: new Date().toISOString(),
      }
      
      // Generate a mock JWT
      const mockToken = `demo.${btoa(JSON.stringify(newUser))}.signature`
      
      // Store in Zustand
      setAuth(newUser, mockToken)
      
      // Demo persistence
      sessionStorage.setItem("demoSession", JSON.stringify({
        user: newUser,
        token: mockToken,
      }))
      
      return { success: true, message: "Account created successfully!" }
    } catch (error) {
      console.error("Sign up error:", error)
      return { success: false, message: "An error occurred during sign up" }
    }
  }

  const signOut = () => {
    // Clear Zustand state (removes token from memory)
    clearAuth()
    
    // Clear demo session storage
    sessionStorage.removeItem("demoSession")
    
    // In production with httpOnly cookies:
    // await post('/api/auth/logout') // Backend clears the cookie
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
