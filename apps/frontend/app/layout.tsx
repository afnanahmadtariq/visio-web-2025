import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { Toaster } from "@/components/ui/toaster"

// System font stack for better build reliability without external font fetching
const fontClassName = "font-sans"

export const metadata: Metadata = {
  title: "Visio Mart - Premium E-commerce Store",
  description: "Shop the latest trends in fashion, accessories, and home goods",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontClassName}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}