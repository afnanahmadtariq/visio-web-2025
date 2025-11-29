"use client"

import Link from "next/link"
import { ArrowRight, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10 z-0" />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Our New Collection
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Elevate your style with our latest arrivals. Quality craftsmanship meets modern design.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="group bg-primary hover:bg-primary/90" asChild>
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                  <Link href="/categories">
                    Explore Collection
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-square overflow-hidden rounded-xl bg-muted/50">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Featured product"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
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

