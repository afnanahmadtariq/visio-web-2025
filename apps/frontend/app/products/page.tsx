"use client"

import Link from "next/link"
import { useEffect, useState, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, Filter, Loader2, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { getProducts, getDiscountedPrice, type Product, type ProductFilters } from "@/lib/api/products"
import { getCategories, type Category } from "@/lib/api/categories"

function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem } = useCart()
  
  // State
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  })
  
  // Filters from URL
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sortBy") || "createdAt")
  const [sortOrder, setSortOrder] = useState<string>(searchParams.get("sortOrder") || "desc")
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "")
  const [onSale, setOnSale] = useState<boolean>(searchParams.get("onSale") === "true")
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page")) || 1)

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error("Failed to fetch categories:", err)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const filters: ProductFilters = {
        page: currentPage,
        limit: 12,
        sortBy: sortBy as ProductFilters["sortBy"],
        sortOrder: sortOrder as "asc" | "desc",
      }
      
      if (selectedCategory) filters.category = selectedCategory
      if (searchQuery) filters.search = searchQuery
      if (priceRange[0] > 0) filters.minPrice = priceRange[0]
      if (priceRange[1] < 1000) filters.maxPrice = priceRange[1]
      if (onSale) filters.onSale = true
      
      const response = await getProducts(filters)
      setProducts(response.data)
      setPagination(response.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products")
      console.error("Failed to fetch products:", err)
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory, searchQuery, priceRange, sortBy, sortOrder, onSale])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (currentPage > 1) params.set("page", String(currentPage))
    if (selectedCategory) params.set("category", selectedCategory)
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy !== "createdAt") params.set("sortBy", sortBy)
    if (sortOrder !== "desc") params.set("sortOrder", sortOrder)
    if (onSale) params.set("onSale", "true")
    
    const queryString = params.toString()
    router.replace(`/products${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }, [currentPage, selectedCategory, searchQuery, sortBy, sortOrder, onSale, router])

  const handleAddToCart = (product: Product) => {
    const price = getDiscountedPrice(product)
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.mainImageUrl || "/placeholder.svg",
      quantity: 1,
    })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    if (value === "price-low") {
      setSortBy("price")
      setSortOrder("asc")
    } else if (value === "price-high") {
      setSortBy("price")
      setSortOrder("desc")
    } else if (value === "rating") {
      setSortBy("rating")
      setSortOrder("desc")
    } else if (value === "newest") {
      setSortBy("createdAt")
      setSortOrder("desc")
    } else {
      setSortBy("createdAt")
      setSortOrder("desc")
    }
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setPriceRange([0, 1000])
    setSearchQuery("")
    setOnSale(false)
    setSortBy("createdAt")
    setSortOrder("desc")
    setCurrentPage(1)
  }

  const getSortValue = () => {
    if (sortBy === "price" && sortOrder === "asc") return "price-low"
    if (sortBy === "price" && sortOrder === "desc") return "price-high"
    if (sortBy === "rating") return "rating"
    if (sortBy === "createdAt") return "newest"
    return "featured"
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Filters - Desktop */}
        <div className="hidden md:flex w-64 flex-col gap-6 flex-shrink-0">
          <div>
            <h3 className="mb-4 text-lg font-medium">Filters</h3>
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-sm font-medium">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`category-${category.slug}`}
                        className="h-4 w-4 rounded border-gray-300 accent-primary"
                        checked={selectedCategory === category.slug}
                        onChange={() => handleCategoryChange(category.slug)}
                      />
                      <label htmlFor={`category-${category.slug}`} className="text-sm flex items-center gap-2">
                        {category.name}
                        <span className="text-xs text-muted-foreground">({category.productCount})</span>
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
                    value={priceRange}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    onValueCommit={() => setCurrentPage(1)}
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="on-sale"
                    className="h-4 w-4 rounded border-gray-300 accent-primary"
                    checked={onSale}
                    onChange={(e) => {
                      setOnSale(e.target.checked)
                      setCurrentPage(1)
                    }}
                  />
                  <label htmlFor="on-sale" className="text-sm font-medium">
                    On Sale Only
                  </label>
                </div>
              </div>
              <Separator />
              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {pagination.total} products found
              </p>
            </div>
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
                    <SheetDescription>Narrow down your product search.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="mb-3 text-sm font-medium">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`mobile-category-${category.slug}`}
                              className="h-4 w-4 rounded border-gray-300 accent-primary"
                              checked={selectedCategory === category.slug}
                              onChange={() => handleCategoryChange(category.slug)}
                            />
                            <label htmlFor={`mobile-category-${category.slug}`} className="text-sm">
                              {category.name} ({category.productCount})
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
                          value={priceRange}
                          max={1000}
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
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="mobile-on-sale"
                        className="h-4 w-4 rounded border-gray-300 accent-primary"
                        checked={onSale}
                        onChange={(e) => setOnSale(e.target.checked)}
                      />
                      <label htmlFor="mobile-on-sale" className="text-sm font-medium">
                        On Sale Only
                      </label>
                    </div>
                    <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full sm:w-[200px] md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>

              <Select value={getSortValue()} onValueChange={handleSortChange}>
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-destructive">{error}</p>
              <Button variant="link" className="mt-2 text-primary" onClick={fetchProducts}>
                Try again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">No products found.</p>
              <Button variant="link" className="mt-2 text-primary" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const discountedPrice = getDiscountedPrice(product)
                const hasDiscount = product.salePercent && product.salePercent > 0
                
                return (
                  <Card key={product.id} className="overflow-hidden group">
                    <Link href={`/product/${product.slug || product.id}`}>
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={product.mainImageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {hasDiscount && (
                          <Badge className="absolute top-2 left-2 bg-destructive">
                            -{product.salePercent}%
                          </Badge>
                        )}
                        {product.stock <= 5 && product.stock > 0 && (
                          <Badge variant="secondary" className="absolute top-2 right-2">
                            Only {product.stock} left
                          </Badge>
                        )}
                        {product.stock === 0 && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <div className="space-y-1">
                        <Link href={`/product/${product.slug || product.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                            <span className="ml-1 text-sm">
                              {product.averageRating?.toFixed(1) || "N/A"}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount || 0} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">${discountedPrice.toFixed(2)}</p>
                            {hasDiscount && (
                              <p className="text-sm text-muted-foreground line-through">
                                ${product.price.toFixed(2)}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-full"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!pagination.hasPrev}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum: number
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant="outline"
                      size="sm"
                      className={`h-8 w-8 ${
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : ""
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!pagination.hasNext}
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={
        <div className="container py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  )
}

