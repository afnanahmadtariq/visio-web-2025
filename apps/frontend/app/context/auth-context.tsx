"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  email: string
  name: string
  createdAt: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on client side
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user from localStorage")
        localStorage.removeItem("currentUser")
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [user])

  const signIn = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Get stored users
    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Find user
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return { success: true, message: "Successfully signed in!" }
    } else {
      return { success: false, message: "Invalid email or password" }
    }
  }

  const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Get stored users
    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email)
    if (existingUser) {
      return { success: false, message: "User with this email already exists" }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    }

    // Save to users array
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Sign in the new user
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    
    return { success: true, message: "Account created successfully!" }
  }

  const signOut = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
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
