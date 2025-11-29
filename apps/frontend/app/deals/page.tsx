"use client"

import Link from "next/link"
import { ChevronRight, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"

// Mock deals data - replace with actual data
const flashDeals = [
  {
    id: "101",
    name: "Wireless Earbuds",
    originalPrice: 129.99,
    salePrice: 79.99,
    discount: 38,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    endsIn: "12:05:30", // hours:minutes:seconds
  },
  {
    id: "102",
    name: "Smart Watch",
    originalPrice: 249.99,
    salePrice: 169.99,
    discount: 32,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    endsIn: "08:45:12",
  },
  {
    id: "103",
    name: "Portable Blender",
    originalPrice: 89.99,
    salePrice: 49.99,
    discount: 44,
    image: "https://images.unsplash.com/photo-1531907700752-62799b2a3e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    endsIn: "02:30:00",
  },
  {
    id: "104",
    name: "Fitness Tracker",
    originalPrice: 99.99,
    salePrice: 59.99,
    discount: 40,
    image: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    endsIn: "06:15:45",
  },
]

const weeklyDeals = [  {
    id: "201",
    name: "Premium Yoga Mat",
    originalPrice: 75.99,
    salePrice: 52.99,
    discount: 30,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },  {
    id: "202",
    name: "Coffee Maker",
    originalPrice: 149.99,
    salePrice: 99.99,
    discount: 33,
    image: "https://images.unsplash.com/photo-1520970519539-8c9eaad1d7b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "203",
    name: "Bluetooth Speaker",
    originalPrice: 129.99,
    salePrice: 89.99,
    discount: 31,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },  {
    id: "204",
    name: "Desk Lamp",
    originalPrice: 59.99,
    salePrice: 39.99,
    discount: 33,
    image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "205",
    name: "Phone Stand",
    originalPrice: 24.99,
    salePrice: 14.99,
    discount: 40,
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },  {
    id: "206",
    name: "Wireless Charger",
    originalPrice: 49.99,
    salePrice: 29.99,
    discount: 40,
    image: "https://images.unsplash.com/photo-1618577910501-6b3926401fac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

const clearanceDeals = [
  {
    id: "301",
    name: "Casual Sneakers",
    originalPrice: 89.99,
    salePrice: 35.99,
    discount: 60,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "302",
    name: "Denim Jacket",
    originalPrice: 120.00,
    salePrice: 48.00,
    discount: 60,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "303",
    name: "Digital Camera",
    originalPrice: 399.99,
    salePrice: 199.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "304",
    name: "Table Lamp",
    originalPrice: 79.99,
    salePrice: 31.99,
    discount: 60,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

export default function DealsPage() {
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      quantity: 1,
    })
  }

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
            </p>            <div className="flex justify-center pt-4">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/products">
                  Shop All Deals
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold sm:text-3xl flex items-center">
              <Timer className="mr-2 h-6 w-6 text-primary" />
              Flash Deals
            </h2>
            <p className="text-muted-foreground">Incredible savings ending soon - don't miss out!</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-primary">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashDeals.map((deal) => (
            <Card key={deal.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90 z-10">
                  {deal.discount}% OFF
                </Badge>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-10 flex items-center">
                  <Timer className="h-3 w-3 mr-1" /> Ends in: {deal.endsIn}
                </div>
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <Link href={`/product/${deal.id}`}>
                  <h3 className="text-lg font-medium hover:text-primary transition-colors">{deal.name}</h3>
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

      {/* Tab-based deals */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">More Great Deals</h2>
            <p className="mt-2 text-muted-foreground">Shop by deal type and save big on all your favorites</p>
          </div>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="weekly">Weekly Deals</TabsTrigger>
              <TabsTrigger value="clearance">Clearance</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {weeklyDeals.map((deal) => (
                  <Card key={deal.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90">
                        {deal.discount}% OFF
                      </Badge>
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Link href={`/product/${deal.id}`}>
                        <h3 className="text-lg font-medium hover:text-primary transition-colors">{deal.name}</h3>
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
            </TabsContent>
            <TabsContent value="clearance">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {clearanceDeals.map((deal) => (
                  <Card key={deal.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700">
                        {deal.discount}% OFF
                      </Badge>
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Link href={`/product/${deal.id}`}>
                        <h3 className="text-lg font-medium hover:text-primary transition-colors">{deal.name}</h3>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

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
              </div>              <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-fit" asChild>
                <Link href="/products">
                  Shop Now
                </Link>
              </Button>
            </div>            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Summer Sale"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
