"use client"

import Link from "next/link"
import { ArrowLeft, ChevronDown, Filter, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

const products = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 149.99,
    rating: 4.8,
    reviews: 124,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    name: "Leather Backpack",
    price: 89.99,
    rating: 4.6,
    reviews: 89,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 199.99,
    rating: 4.9,
    reviews: 213,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    price: 29.99,
    rating: 4.5,
    reviews: 156,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 119.99,
    rating: 4.7,
    reviews: 178,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "6",
    name: "Ceramic Mug",
    price: 19.99,
    rating: 4.3,
    reviews: 92,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "7",
    name: "Denim Jeans",
    price: 59.99,
    rating: 4.6,
    reviews: 145,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "8",
    name: "Sunglasses",
    price: 79.99,
    rating: 4.4,
    reviews: 112,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "9",
    name: "Throw Pillow",
    price: 24.99,
    rating: 4.2,
    reviews: 87,
    category: "Home",
    image: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "10",
    name: "Smart Watch",
    price: 249.99,
    rating: 4.8,
    reviews: 203,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "11",
    name: "Desk Lamp",
    price: 39.99,
    rating: 4.5,
    reviews: 118,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "12",
    name: "Winter Jacket",
    price: 129.99,
    rating: 4.7,
    reviews: 167,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

export default function ProductsPage() {
  const { addItem } = useCart()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])
  const [sortOption, setSortOption] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Filter by price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Filter by search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort products
      switch (sortOption) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id.localeCompare(a.id) // Using ID as a proxy for date
        default: // featured
          return 0
      }
    })

  const categories = ["Clothing", "Accessories", "Footwear", "Electronics", "Home"]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container py-6 md:py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Filters - Desktop */}
          <div className="hidden md:flex w-64 flex-col gap-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Filters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-sm font-medium">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          className="h-4 w-4 rounded border-gray-300 accent-primary"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-3 text-sm font-medium">Price Range</h4>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={priceRange}
                      max={300}
                      step={10}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="text-primary"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-3 text-sm font-medium">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          className="h-4 w-4 rounded border-gray-300 accent-primary"
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-muted-foreground" />
                          ))}
                          <span className="ml-1">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold">All Products</h1>
              <div className="flex items-center gap-4">
                {/* Filters - Mobile */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Narrow down your product search with filters.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div>
                        <h4 className="mb-3 text-sm font-medium">Categories</h4>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`mobile-category-${category}`}
                                className="h-4 w-4 rounded border-gray-300 accent-primary"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                              />
                              <label htmlFor={`mobile-category-${category}`} className="text-sm">
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="mb-3 text-sm font-medium">Price Range</h4>
                        <div className="space-y-4">
                          <Slider
                            defaultValue={priceRange}
                            max={300}
                            step={10}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            className="text-primary"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-sm">${priceRange[0]}</span>
                            <span className="text-sm">${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full sm:w-[200px] md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select defaultValue="featured" onValueChange={(value) => setSortOption(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-muted-foreground">No products match your filters.</p>
                <Button
                  variant="link"
                  className="mt-2 text-primary"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, 300])
                    setSearchQuery("")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
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
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    3
                  </Button>
                  <span className="mx-1">...</span>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    8
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

