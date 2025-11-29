"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, selectIsAdmin, selectIsAuthenticated, selectIsLoading } from "@/lib/stores/auth-store"

interface AdminGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Protects admin routes on the frontend.
 * 
 * IMPORTANT: This is for UI protection only!
 * Backend MUST independently verify admin role for all admin API endpoints.
 * Never rely solely on frontend checks for security.
 */
export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const router = useRouter()
  const isAdmin = useAuthStore(selectIsAdmin)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isLoading = useAuthStore(selectIsLoading)

  useEffect(() => {
    // Wait for auth to initialize
    if (isLoading) return

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.replace("/signin?redirect=/admin")
      return
    }

    // Redirect if not admin
    if (!isAdmin) {
      router.replace("/")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  // Show loading state
  if (isLoading) {
    return fallback ?? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render content if not admin
  if (!isAuthenticated || !isAdmin) {
    return fallback ?? null
  }

  return <>{children}</>
}

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
}

/**
 * Protects authenticated routes.
 * Redirects to signin if not authenticated.
 */
export function AuthGuard({ children, fallback, redirectTo = "/signin" }: AuthGuardProps) {
  const router = useRouter()
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isLoading = useAuthStore(selectIsLoading)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname
      router.replace(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [isLoading, isAuthenticated, router, redirectTo])

  if (isLoading) {
    return fallback ?? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback ?? null
  }

  return <>{children}</>
}
