"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingBag, Trash2, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { 
  getWishlist, 
  removeFromWishlist as removeFromWishlistAPI, 
  moveToCart as moveToCartAPI,
  clearWishlist as clearWishlistAPI,
  type WishlistItem 
} from "@/lib/api/wishlist"

function WishlistSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function WishlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Load wishlist from API
  useEffect(() => {
    async function loadWishlist() {
      if (!isAuthenticated) {
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        const wishlist = await getWishlist()
        setWishlistItems(wishlist.items)
      } catch (error) {
        console.error("Failed to load wishlist:", error)
        // Fallback to localStorage for guests
        const savedWishlist = localStorage.getItem("wishlist")
        if (savedWishlist) {
          try {
            const parsed = JSON.parse(savedWishlist)
            // Transform localStorage format to API format
            setWishlistItems(parsed.map((item: any) => ({
              id: item.id,
              product: {
                id: item.id,
                name: item.name,
                price: item.price,
                images: [item.image],
                stock: item.stock || 10,
                rating: item.rating || 4.5,
              },
              addedAt: item.addedAt || new Date().toISOString(),
            })))
          } catch (e) {
            console.error("Failed to parse localStorage wishlist")
          }
        }
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      loadWishlist()
    }
  }, [isAuthenticated, authLoading])

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/signin?redirect=/wishlist")
    }
  }, [authLoading, isAuthenticated, router])

  const removeFromWishlist = async (productId: string) => {
    setActionLoading(productId)
    try {
      if (isAuthenticated) {
        await removeFromWishlistAPI(productId)
      }
      setWishlistItems(prev => prev.filter(item => item.product.id !== productId))
      // Also update localStorage
      const savedWishlist = localStorage.getItem("wishlist")
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist)
        localStorage.setItem("wishlist", JSON.stringify(parsed.filter((item: any) => item.id !== productId)))
      }
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist",
      })
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const moveToCart = async (item: WishlistItem) => {
    setActionLoading(item.product.id)
    try {
      if (isAuthenticated) {
        await moveToCartAPI(item.product.id)
      }
      // Add to local cart context
      addItem({
        id: item.product.id,
        name: item.product.name,
        price: item.product.discountPercent 
          ? item.product.price * (1 - item.product.discountPercent / 100)
          : item.product.price,
        image: item.product.images[0] || "/placeholder.svg",
        quantity: 1,
      })
      // Remove from wishlist
      setWishlistItems(prev => prev.filter(i => i.product.id !== item.product.id))
      toast({
        title: "Added to Cart",
        description: `${item.product.name} has been added to your cart`,
      })
    } catch (error) {
      console.error("Failed to move to cart:", error)
      // Still add to cart locally even if API fails
      addItem({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.images[0] || "/placeholder.svg",
        quantity: 1,
      })
      setWishlistItems(prev => prev.filter(i => i.product.id !== item.product.id))
      toast({
        title: "Added to Cart",
        description: `${item.product.name} has been added to your cart`,
      })
    } finally {
      setActionLoading(null)
    }
  }

  const clearWishlist = async () => {
    setActionLoading("clear")
    try {
      if (isAuthenticated) {
        await clearWishlistAPI()
      }
      setWishlistItems([])
      localStorage.removeItem("wishlist")
      toast({
        title: "Wishlist Cleared",
        description: "All items have been removed from your wishlist",
      })
    } catch (error) {
      console.error("Failed to clear wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to clear wishlist",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <WishlistSkeleton />
        </div>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirect will happen
  }

  // Empty wishlist state
  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and they&apos;ll appear here.
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
            <p className="text-muted-foreground">{wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearWishlist}
            disabled={actionLoading === "clear"}
          >
            {actionLoading === "clear" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => {
            const product = item.product
            const price = product.discountPercent 
              ? product.price * (1 - product.discountPercent / 100)
              : product.price
            const isLoading = actionLoading === product.id

            return (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                    onClick={() => removeFromWishlist(product.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                      Only {product.stock} left!
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                  {product.discountPercent && product.discountPercent > 0 && (
                    <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      {Math.round(product.discountPercent)}% OFF
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="ml-1 text-sm">{product.rating?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">${price.toFixed(2)}</p>
                      {product.discountPercent && product.discountPercent > 0 && (
                        <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={() => moveToCart(item)}
                      disabled={product.stock === 0 || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <ShoppingBag className="h-4 w-4 mr-1" />
                      )}
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
