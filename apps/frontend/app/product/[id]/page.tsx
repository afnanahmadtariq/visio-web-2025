"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Minus, Plus, Star, Heart, ThumbsUp, MessageSquare, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { getProduct, getProductReviews, getProducts, getDiscountedPrice, type Product, type Review } from "@/lib/api/products"
import { addToWishlist as addToWishlistAPI } from "@/lib/api/wishlist"
import { createReview } from "@/lib/api/reviews"

function ProductSkeleton() {
  return (
    <div className="container py-6 md:py-8">
      <Skeleton className="h-4 w-32 mb-6" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { addItem } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [addingToWishlist, setAddingToWishlist] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
  })

  // Fetch product data
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch product details
        const productData = await getProduct(resolvedParams.id)
        setProduct(productData)
        
        // Fetch product reviews
        try {
          const reviewsData = await getProductReviews(resolvedParams.id)
          setReviews(reviewsData.reviews)
        } catch {
          // Reviews might not exist
          setReviews([])
        }
        
        // Fetch related products (same category)
        if (productData.categoryId) {
          try {
            const relatedResponse = await getProducts({ 
              categoryId: productData.categoryId, 
              limit: 4 
            })
            // Filter out current product
            setRelatedProducts(relatedResponse.products.filter(p => p.id !== productData.id).slice(0, 4))
          } catch {
            setRelatedProducts([])
          }
        }
      } catch (err) {
        console.error("Failed to load product:", err)
        setError("Product not found or failed to load.")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [resolvedParams.id])

  const handleAddToCart = () => {
    if (!product) return
    
    const price = getDiscountedPrice(product)
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.images[0] || "/placeholder.svg",
      quantity: quantity,
      color: product.colors?.[selectedColor],
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleAddToWishlist = async () => {
    if (!product) return
    
    setAddingToWishlist(true)
    try {
      if (isAuthenticated) {
        await addToWishlistAPI(product.id)
      }
      
      // Also save to localStorage for persistence
      const savedWishlist = localStorage.getItem("wishlist")
      const wishlist = savedWishlist ? JSON.parse(savedWishlist) : []
      
      // Check if item already exists
      if (wishlist.some((item: any) => item.id === product.id)) {
        toast({
          title: "Already in Wishlist",
          description: "This item is already in your wishlist",
        })
        return
      }
      
      // Add to wishlist
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        rating: product.rating,
        reviews: product.reviewCount,
        image: product.images[0],
        stock: product.stock,
        addedAt: new Date().toISOString(),
      })
      
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`,
      })
    } catch (err) {
      console.error("Failed to add to wishlist:", err)
      toast({
        title: "Error",
        description: "Failed to add to wishlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingToWishlist(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a review",
        variant: "destructive",
      })
      return
    }

    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setSubmittingReview(true)
    try {
      const newReview = await createReview({
        productId: resolvedParams.id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
      })

      setReviews([newReview, ...reviews])
      setReviewForm({ rating: 5, title: "", comment: "" })
      setShowReviewForm(false)
      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      })
    } catch (err) {
      console.error("Failed to submit review:", err)
      // Add review locally as fallback
      const localReview: Review = {
        id: Date.now().toString(),
        userId: user?.id || "unknown",
        userName: user?.name || "Anonymous",
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        createdAt: new Date().toISOString(),
        helpful: 0,
        verified: true,
      }
      setReviews([localReview, ...reviews])
      setReviewForm({ rating: 5, title: "", comment: "" })
      setShowReviewForm(false)
      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      })
    } finally {
      setSubmittingReview(false)
    }
  }

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0,
  }))

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : product?.rating || 0

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <ProductSkeleton />
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const discountedPrice = getDiscountedPrice(product)
  const hasDiscount = product.discountPercent && product.discountPercent > 0
  const colors = product.colors || ["Default"]
  const features = product.features || []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container py-6 md:py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/products" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-muted/50 relative">
              {hasDiscount && (
                <Badge className="absolute top-3 right-3 bg-primary z-10">
                  {Math.round(product.discountPercent!)}% OFF
                </Badge>
              )}
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-lg border cursor-pointer ${index === selectedImage ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount || reviews.length} reviews)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold">${discountedPrice.toFixed(2)}</p>
                {hasDiscount && (
                  <p className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
            </div>

            <Separator />

            {colors.length > 1 && (
              <div>
                <h3 className="mb-3 font-medium">Color: {colors[selectedColor]}</h3>
                <div className="flex gap-2">
                  {colors.map((color, index) => {
                    const bgColor =
                      color === "Brown" ? "#8B4513" :
                      color === "Black" ? "#000" :
                      color === "Tan" ? "#D2B48C" :
                      color === "Navy" ? "#000080" :
                      color === "Olive" ? "#556B2F" :
                      color === "Gray" ? "#808080" :
                      color === "Burgundy" ? "#800020" :
                      color === "White" ? "#FFFFFF" :
                      color === "Red" ? "#FF0000" :
                      color === "Blue" ? "#0000FF" :
                      "#CCCCCC"

                    return (
                      <div
                        key={color}
                        className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${index === selectedColor ? "ring-2 ring-primary ring-offset-2" : ""}`}
                        style={{ backgroundColor: bgColor }}
                        onClick={() => setSelectedColor(index)}
                      >
                        {index === selectedColor && (
                          <Check
                            className={`h-4 w-4 ${["Black", "Navy", "Burgundy", "Blue"].includes(color) ? "text-white" : "text-black"}`}
                          />
                        )}
                        <span className="sr-only">{color}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-3 font-medium">Quantity</h3>
              <div className="flex w-32 items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex-1 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{product.stock} in stock</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button 
                size="lg" 
                className="flex-1 bg-primary hover:bg-primary/90" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/10" 
                onClick={handleAddToWishlist}
                disabled={addingToWishlist}
              >
                {addingToWishlist ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Heart className="mr-2 h-4 w-4" />
                )}
                Add to Wishlist
              </Button>
            </div>

            {/* Stock Counter */}
            {product.stock <= 10 && product.stock > 0 && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                <span className="text-sm font-medium">🔥 Only {product.stock} left in stock!</span>
              </div>
            )}

            <Separator />

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="features" className="pt-4">
                {features.length > 0 ? (
                  <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No features listed for this product.</p>
                )}
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Free standard shipping on orders over $50. Expedited and international shipping options available at
                    checkout.
                  </p>
                  <p>
                    Orders typically ship within 1-2 business days. Please allow 3-5 business days for standard
                    delivery.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Customer Reviews
            </h2>
            {isAuthenticated && (
              <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                Write a Review
              </Button>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(averageRating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
                </div>

                <div className="space-y-3">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-8">{rating} ★</span>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  ))}
                </div>

                {!isAuthenticated && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center mb-3">
                      Sign in to write a review
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/signin">Sign In</Link>
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Review Form */}
              {showReviewForm && isAuthenticated && (
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Write Your Review</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Rating</Label>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 cursor-pointer transition-colors ${
                                star <= reviewForm.rating ? "fill-secondary text-secondary" : "text-muted-foreground hover:text-secondary"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-title">Title</Label>
                      <Input
                        id="review-title"
                        placeholder="Summarize your review"
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="review-comment">Review</Label>
                      <Textarea
                        id="review-comment"
                        placeholder="Share your experience with this product..."
                        rows={4}
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSubmitReview} disabled={submittingReview}>
                        {submittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Review
                      </Button>
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Individual Reviews */}
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= review.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => {
                const relatedPrice = getDiscountedPrice(relatedProduct)
                return (
                  <Card key={relatedProduct.id} className="overflow-hidden group">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <div className="aspect-square relative overflow-hidden">
                        {relatedProduct.discountPercent && relatedProduct.discountPercent > 0 && (
                          <Badge className="absolute top-2 right-2 bg-primary z-10">
                            {Math.round(relatedProduct.discountPercent)}% OFF
                          </Badge>
                        )}
                        <img
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="space-y-1">
                        <Link href={`/product/${relatedProduct.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">{relatedProduct.name}</h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                            <span className="ml-1 text-sm">{relatedProduct.rating?.toFixed(1) || "N/A"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">${relatedPrice.toFixed(2)}</p>
                          {relatedProduct.discountPercent && relatedProduct.discountPercent > 0 && (
                            <p className="text-sm text-muted-foreground line-through">${relatedProduct.price.toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

