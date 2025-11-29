"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { ChevronRight, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { getSaleProducts, getDiscountedPrice, type Product } from "@/lib/api/products"

function DealsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="h-full overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

interface DealProduct extends Product {
  endsIn?: string
  originalPrice: number
  salePrice: number
  discountPercent: number
}

function DealsContent() {
  const { addItem } = useCart()
  const [saleProducts, setSaleProducts] = useState<DealProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDeals() {
      try {
        setLoading(true)
        // Fetch products on sale from backend
        const response = await getSaleProducts()
        
        // Transform products to deal format
        const deals: DealProduct[] = response.products.map((product, index) => {
          const discountedPrice = getDiscountedPrice(product)
          return {
            ...product,
            originalPrice: product.price,
            salePrice: discountedPrice,
            discountPercent: product.discountPercent || 0,
            // Generate random end times for flash deals effect
            endsIn: index < 4 ? generateRandomEndTime() : undefined,
          }
        })
        
        setSaleProducts(deals)
      } catch (err) {
        console.error("Failed to load deals:", err)
        setError("Failed to load deals. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadDeals()
  }, [])

  const handleAddToCart = (product: DealProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.images[0] || "/placeholder.svg",
      quantity: 1,
    })
  }

  // Get flash deals (first 4 with highest discount)
  const flashDeals = [...saleProducts]
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 4)
    .map((deal, index) => ({
      ...deal,
      endsIn: generateRandomEndTime(),
    }))

  // Weekly deals (medium discounts)
  const weeklyDeals = saleProducts
    .filter(p => p.discountPercent >= 20 && p.discountPercent < 40)
    .slice(0, 6)

  // Clearance (highest discounts)
  const clearanceDeals = saleProducts
    .filter(p => p.discountPercent >= 40)
    .slice(0, 4)

  if (loading) {
    return (
      <>
        <section className="container py-12">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <DealsSkeleton />
        </section>
      </>
    )
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (saleProducts.length === 0) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground mb-4">No deals available at the moment.</p>
        <Button asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold sm:text-3xl flex items-center">
                <Timer className="mr-2 h-6 w-6 text-primary" />
                Flash Deals
              </h2>
              <p className="text-muted-foreground">Incredible savings ending soon - don&apos;t miss out!</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
              <Link href="/products?sale=true">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {flashDeals.map((deal) => (
              <Card key={deal.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90 z-10">
                    {Math.round(deal.discountPercent)}% OFF
                  </Badge>
                  {deal.endsIn && (
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-10 flex items-center">
                      <Timer className="h-3 w-3 mr-1" /> Ends in: {deal.endsIn}
                    </div>
                  )}
                  <img
                    src={deal.images[0] || "/placeholder.svg"}
                    alt={deal.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <Link href={`/product/${deal.id}`}>
                    <h3 className="text-lg font-medium hover:text-primary transition-colors line-clamp-1">{deal.name}</h3>
                  </Link>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-primary">${deal.salePrice.toFixed(2)}</span>
                    <span className="text-sm line-through text-muted-foreground">${deal.originalPrice.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button onClick={() => handleAddToCart(deal)} className="w-full bg-primary hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Tab-based deals */}
      {(weeklyDeals.length > 0 || clearanceDeals.length > 0) && (
        <section className="bg-muted/50 py-12">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">More Great Deals</h2>
              <p className="mt-2 text-muted-foreground">Shop by deal type and save big on all your favorites</p>
            </div>

            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="weekly">Weekly Deals ({weeklyDeals.length})</TabsTrigger>
                <TabsTrigger value="clearance">Clearance ({clearanceDeals.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly">
                {weeklyDeals.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {weeklyDeals.map((deal) => (
                      <Card key={deal.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative overflow-hidden bg-muted">
                          <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90">
                            {Math.round(deal.discountPercent)}% OFF
                          </Badge>
                          <img
                            src={deal.images[0] || "/placeholder.svg"}
                            alt={deal.name}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Link href={`/product/${deal.id}`}>
                            <h3 className="text-lg font-medium hover:text-primary transition-colors line-clamp-1">{deal.name}</h3>
                          </Link>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="font-bold text-primary">${deal.salePrice.toFixed(2)}</span>
                            <span className="text-sm line-through text-muted-foreground">${deal.originalPrice.toFixed(2)}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button onClick={() => handleAddToCart(deal)} className="w-full bg-primary hover:bg-primary/90">
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No weekly deals available</p>
                )}
              </TabsContent>
              <TabsContent value="clearance">
                {clearanceDeals.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                    {clearanceDeals.map((deal) => (
                      <Card key={deal.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative overflow-hidden bg-muted">
                          <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700">
                            {Math.round(deal.discountPercent)}% OFF
                          </Badge>
                          <img
                            src={deal.images[0] || "/placeholder.svg"}
                            alt={deal.name}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Link href={`/product/${deal.id}`}>
                            <h3 className="text-lg font-medium hover:text-primary transition-colors line-clamp-1">{deal.name}</h3>
                          </Link>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="font-bold text-primary">${deal.salePrice.toFixed(2)}</span>
                            <span className="text-sm line-through text-muted-foreground">${deal.originalPrice.toFixed(2)}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button onClick={() => handleAddToCart(deal)} className="w-full bg-primary hover:bg-primary/90">
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No clearance items available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Deal Banner */}
      <section className="container py-12">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary text-white">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4 p-8 md:p-12">
              <div className="space-y-2">
                <Badge className="bg-white text-primary hover:bg-white/90 mb-2">Limited Time Offer</Badge>
                <h2 className="text-3xl font-bold">Summer Sale</h2>
                <p className="text-white/90">
                  Extra 15% off with code SUMMER15. Valid through August 31, 2025.
                </p>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-fit" asChild>
                <Link href="/products?sale=true">
                  Shop Now
                </Link>
              </Button>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Summer Sale"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Helper function to generate random end times for flash deals
function generateRandomEndTime(): string {
  const hours = Math.floor(Math.random() * 12) + 1
  const minutes = Math.floor(Math.random() * 60)
  const seconds = Math.floor(Math.random() * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function DealsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-[900px] mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Limited-Time Deals
            </h1>
            <p className="max-w-[600px] mx-auto text-white/90 md:text-xl">
              Discover amazing savings across our entire store with discounts up to 60% off.
            </p>
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/products?sale=true">
                  Shop All Deals
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={
        <section className="container py-12">
          <DealsSkeleton />
        </section>
      }>
        <DealsContent />
      </Suspense>

      <Footer />
    </div>
  )
}
