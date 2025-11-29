"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Star, Sparkles, Truck, Shield, RotateCcw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { getProducts, getDiscountedPrice, type Product } from "@/lib/api/products"
import { getCategories, type Category } from "@/lib/api/categories"

// Fallback products in case API fails
const fallbackProducts = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 149.99,
    rating: 4.8,
    reviewCount: 124,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  },
  {
    id: "2",
    name: "Leather Backpack",
    price: 89.99,
    rating: 4.6,
    reviewCount: 89,
    images: ["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 199.99,
    rating: 4.9,
    reviewCount: 213,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    price: 29.99,
    rating: 4.5,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  },
]

// Category images mapping
const categoryImages: Record<string, string> = {
  "Clothing": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Accessories": "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Footwear": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Home": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
}

const defaultCategoryImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"

export default function Home() {
  const { addItem } = useCart()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch featured products and categories
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        
        // Fetch products and categories in parallel
        const [productsResponse, categoriesData] = await Promise.all([
          getProducts({ limit: 4, sortBy: "rating", sortOrder: "desc" }).catch(() => null),
          getCategories().catch(() => []),
        ])
        
        if (productsResponse && productsResponse.products.length > 0) {
          setFeaturedProducts(productsResponse.products)
        } else {
          // Use fallback products
          setFeaturedProducts(fallbackProducts as unknown as Product[])
        }
        
        if (categoriesData.length > 0) {
          setCategories(categoriesData.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to load home page data:", error)
        setFeaturedProducts(fallbackProducts as unknown as Product[])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAddToCart = (product: Product) => {
    const price = getDiscountedPrice(product)
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.images[0] || "/placeholder.svg",
      quantity: 1,
    })
  }

  // Display categories - use API categories or fallback
  const displayCategories = categories.length > 0 
    ? categories 
    : [{ id: "clothing", name: "Clothing" }, { id: "accessories", name: "Accessories" }, { id: "footwear", name: "Footwear" }, { id: "home", name: "Home" }]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section - fits in remaining viewport height */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 h-[calc(100vh-4rem)] min-h-[500px]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-60 w-60 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-60 w-60 rounded-full bg-secondary/10 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        </div>
        
        <div className="container relative z-10 h-full flex items-center py-6 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="space-y-3 lg:space-y-4">
                <Badge variant="secondary" className="w-fit px-3 py-1 text-xs lg:text-sm font-medium bg-primary/10 text-primary border-0">
                  <Sparkles className="mr-1.5 h-3 w-3 lg:h-3.5 lg:w-3.5" />
                  New Collection 2025
                </Badge>
                
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block">Elevate Your</span>
                  <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Style Game
                  </span>
                </h1>
                
                <p className="max-w-[500px] text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Discover curated collections that blend timeless elegance with contemporary design. 
                  Premium quality, sustainable fashion.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="default" className="group h-10 lg:h-11 px-6 text-sm bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30" asChild>
                  <Link href="/products">
                    Shop Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="default" variant="outline" className="h-10 lg:h-11 px-6 text-sm border-2 hover:bg-muted/50" asChild>
                  <Link href="/categories">
                    Explore Categories
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 lg:gap-6 pt-2">
                <div className="flex items-center gap-1.5 text-xs lg:text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs lg:text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs lg:text-sm text-muted-foreground">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image Grid */}
            <div className="relative hidden lg:flex items-center justify-center h-full max-h-[calc(100vh-8rem)]">
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {/* Main large image */}
                <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    alt="Fashion collection"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Two smaller images */}
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Store interior"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Fashion accessories"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute left-0 bottom-8 rounded-lg bg-background/95 backdrop-blur-sm border shadow-xl p-3 animate-in slide-in-from-left duration-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Customer" className="h-6 w-6 rounded-full border-2 border-background object-cover" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Customer" className="h-6 w-6 rounded-full border-2 border-background object-cover" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Customer" className="h-6 w-6 rounded-full border-2 border-background object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">10K+ Happy Customers</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2.5 w-2.5 fill-secondary text-secondary" />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container py-12 md:py-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Shop by Category</h2>
            <Link
              href="/categories"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {displayCategories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square bg-muted/50">
                    <img
                      src={categoryImages[category.name] || defaultCategoryImage}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-medium text-lg text-foreground">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-12 md:py-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Products</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              // Skeleton loading state
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredProducts.map((product) => {
                const price = getDiscountedPrice(product)
                const hasDiscount = product.discountPercent && product.discountPercent > 0
                return (
                  <Card key={product.id} className="overflow-hidden group">
                    <Link href={`/product/${product.id}`}>
                      <div className="aspect-square relative overflow-hidden">
                        {hasDiscount && (
                          <Badge className="absolute top-2 right-2 bg-primary z-10">
                            {Math.round(product.discountPercent!)}% OFF
                          </Badge>
                        )}
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <div className="space-y-1">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                            <span className="ml-1 text-sm">{product.rating?.toFixed(1) || "N/A"}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviewCount || 0} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">${price.toFixed(2)}</p>
                            {hasDiscount && (
                              <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-full"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="rounded-xl bg-gradient-to-r from-accent/20 to-accent/5 p-6 md:p-8 lg:p-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Summer Sale</h2>
                  <p className="text-muted-foreground md:text-lg">
                    Get up to 50% off on selected items. Limited time offer.
                  </p>
                </div>
                <div>
                  <Button size="lg" className="group bg-accent hover:bg-accent/90" asChild>
                    <Link href="/deals">
                      Shop Sale
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    alt="Summer sale promotion"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-12 md:py-16">
        <div className="rounded-xl border bg-card p-6 md:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Stay Updated</h2>
                <p className="text-muted-foreground md:text-lg">
                  Subscribe to our newsletter to receive updates on new arrivals, special offers, and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

