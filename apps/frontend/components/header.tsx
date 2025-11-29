"use client"

import Link from "next/link"
import { Menu, ShoppingBag, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

export default function Header() {
  const { itemCount } = useCart()
  const { user, isAuthenticated, signOut, isLoading } = useAuth()

  const handleSignOut = () => {
    signOut()
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span>ModernShop</span>
        </Link>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/products" className="text-lg font-medium hover:text-primary">
                All Products
              </Link>
              <Link href="/categories" className="text-lg font-medium hover:text-primary">
                Categories
              </Link>
              <Link href="/deals" className="text-lg font-medium hover:text-primary">
                Deals
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary">
                About
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                {!isLoading && (
                  isAuthenticated ? (
                    <>
                      <div className="text-sm text-muted-foreground mb-2">
                        Welcome, {user?.name}!
                      </div>
                      <Button variant="outline" className="w-full" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/signin">Sign In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            All Products
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors">
            Deals
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          
          {!isLoading && (
            isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {getUserInitials(user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/90" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </header>
  )
}

