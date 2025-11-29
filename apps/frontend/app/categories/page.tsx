"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getCategories, type Category } from "@/lib/api/categories"
import { getProducts } from "@/lib/api/products"

// Category images mapping (fallback images for categories)
const categoryImages: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Clothing": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Home & Kitchen": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Sports & Outdoors": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Books": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Toys & Games": "https://images.unsplash.com/photo-1555448248-2571daf6344b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Jewelry": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Accessories": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
}

const defaultImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="h-full overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-4 w-1/3" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

interface CategoryWithCount extends Category {
  productCount: number
  image: string
}

function CategoriesContent() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true)
        // Fetch categories from backend
        const categoriesData = await getCategories()
        
        // For each category, get the product count
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category) => {
            try {
              const productsResponse = await getProducts({ categoryId: category.id, limit: 1 })
              return {
                ...category,
                productCount: productsResponse.pagination.total,
                image: categoryImages[category.name] || defaultImage,
              }
            } catch {
              return {
                ...category,
                productCount: 0,
                image: categoryImages[category.name] || defaultImage,
              }
            }
          })
        )
        
        setCategories(categoriesWithCounts)
      } catch (err) {
        console.error("Failed to load categories:", err)
        setError("Failed to load categories. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return <CategoriesSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No categories found.</p>
      </div>
    )
  }

  return (
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
              <p className="text-sm text-muted-foreground mt-1">
                {category.description || `Browse ${category.name} products`}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                {category.productCount} product{category.productCount !== 1 ? "s" : ""}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

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
              Explore our wide range of product categories to find exactly what you&apos;re looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-12 md:py-16">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesContent />
        </Suspense>
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
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
