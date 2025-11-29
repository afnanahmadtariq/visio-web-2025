"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock category data - replace with actual data
const categories = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    productCount: 145,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    name: "Clothing",
    description: "Fashion for every season",
    productCount: 235,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },  {
    id: "3",
    name: "Home & Kitchen",
    description: "Everything for your living space",
    productCount: 192,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    name: "Beauty",
    description: "Skincare, makeup, and personal care",
    productCount: 87,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    description: "Gear for active lifestyles",
    productCount: 116,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "6",
    name: "Books",
    description: "Bestsellers and new releases",
    productCount: 203,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },  {
    id: "7",
    name: "Toys & Games",
    description: "Fun for all ages",
    productCount: 94,
    image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "8",
    name: "Jewelry",
    description: "Fine and fashion jewelry",
    productCount: 76,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10 z-0" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-[900px] mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Browse Categories
            </h1>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
              Explore our wide range of product categories to find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Featured Collections</h2>
            <p className="mt-2 text-muted-foreground">Curated selections for every style and need</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">                <img
                  src="https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Summer Essentials"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-medium">Summer Essentials</h3>
                    <p className="text-sm opacity-90 mt-1">Stay cool and stylish</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">                <img
                  src="https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Work From Home"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-medium">Work From Home</h3>
                    <p className="text-sm opacity-90 mt-1">Comfort meets productivity</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Sustainable Picks"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-medium">Sustainable Picks</h3>
                    <p className="text-sm opacity-90 mt-1">Eco-friendly products</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
