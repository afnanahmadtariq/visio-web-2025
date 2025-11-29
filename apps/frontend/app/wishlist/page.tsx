"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingBag, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

// Wishlist item type
type WishlistItem = {
  id: string
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  stock: number
  addedAt: string
}

export default function WishlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const { isAuthenticated, isLoading } = useAuth()
  
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage")
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin?redirect=/wishlist")
    }
  }, [isLoading, isAuthenticated, router])

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const addToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  const moveToCart = (item: WishlistItem) => {
    addToCart(item)
    removeFromWishlist(item.id)
  }

  const clearWishlist = () => {
    setWishlist([])
    localStorage.removeItem("wishlist")
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirect will happen
  }

  // Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and they'll appear here.
            </p>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/products" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
          </div>
          <Button variant="outline" size="sm" onClick={clearWishlist}>
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative">
                <Link href={`/product/${item.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {item.stock <= 5 && item.stock > 0 && (
                  <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                    Only {item.stock} left!
                  </span>
                )}
                {item.stock === 0 && (
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </span>
                )}
              </div>
              <CardContent className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="ml-1 text-sm">{item.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={() => moveToCart(item)}
                    disabled={item.stock === 0}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
