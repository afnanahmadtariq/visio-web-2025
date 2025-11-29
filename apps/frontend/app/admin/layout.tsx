"use client"

import { AdminGuard } from "@/components/guards/auth-guard"

/**
 * Admin Layout - Wraps all admin pages with authentication guard
 * 
 * IMPORTANT SECURITY NOTE:
 * This guard is for UI protection only!
 * The backend MUST independently verify admin role for ALL admin API endpoints.
 * Never rely solely on frontend checks for security.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking permissions...</p>
          </div>
        </div>
      }
    >
      {children}
    </AdminGuard>
  )
}
