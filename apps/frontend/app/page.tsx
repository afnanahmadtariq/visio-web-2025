"use client"

import Link from "next/link"
import { ArrowRight, ShoppingBag, Star, Sparkles, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"

const featuredProducts = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 149.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    name: "Leather Backpack",
    price: 89.99,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 199.99,
    rating: 4.9,
    reviews: 213,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    price: 29.99,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

export default function Home() {
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section - fits in remaining viewport height */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 h-[calc(100vh-4rem)] min-h-[600px]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>
        
        <div className="container relative z-10 h-full flex items-center py-8 md:py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  New Collection 2025
                </Badge>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Elevate Your</span>
                  <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Style Game
                  </span>
                </h1>
                
                <p className="max-w-[540px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                  Discover curated collections that blend timeless elegance with contemporary design. 
                  Premium quality, sustainable fashion.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="group h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30" asChild>
                  <Link href="/products">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2 hover:bg-muted/50" asChild>
                  <Link href="/categories">
                    Explore Categories
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image Grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
                <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    alt="Fashion collection"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Two smaller images */}
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Store interior"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Fashion accessories"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -left-8 bottom-24 rounded-xl bg-background/95 backdrop-blur-sm border shadow-xl p-4 animate-in slide-in-from-left duration-500">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background" />
                    <div className="h-8 w-8 rounded-full bg-secondary/20 border-2 border-background" />
                    <div className="h-8 w-8 rounded-full bg-accent/20 border-2 border-background" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">10K+ Happy Customers</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-secondary text-secondary" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
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
            {["Clothing", "Accessories", "Footwear", "Home"].map((category) => (
              <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square bg-muted/50">
                    <img
                      src={`https://images.unsplash.com/photo-${category === "Clothing" ? "1489987707025-afc232f7ea0f" : 
                              category === "Accessories" ? "1547949003-9792a18a2601" : 
                              category === "Footwear" ? "1549298916-b41d501d3772" : 
                              "1583847268964-b28dc8f51f92"}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                      alt={category}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-medium text-lg text-foreground">{category}</h3>
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
            {featuredProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden group">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
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
                      <h3 className="font-medium hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-medium">${product.price.toFixed(2)}</p>
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
            ))}
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

