"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Minus, Plus, Star, Heart, ThumbsUp, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "John D.",
    rating: 5,
    title: "Excellent quality!",
    comment: "This is exactly what I was looking for. The leather is genuine and the craftsmanship is outstanding. Highly recommend!",
    date: "2025-11-25",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah M.",
    rating: 4,
    title: "Great product, minor issues",
    comment: "Overall a great product. The quality is excellent and it looks even better in person. Only giving 4 stars because shipping took longer than expected.",
    date: "2025-11-20",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Mike R.",
    rating: 5,
    title: "Perfect for daily use",
    comment: "I've been using this for a month now and it's holding up great. Very spacious and comfortable to carry.",
    date: "2025-11-15",
    helpful: 5,
    verified: false,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emily L.",
    rating: 3,
    title: "Good but pricey",
    comment: "The quality is good but I feel it's a bit overpriced for what you get. Still a decent product overall.",
    date: "2025-11-10",
    helpful: 3,
    verified: true,
  },
]

// Mock product database
const productsData = [
  {
    id: "1",
    name: "Premium Leather Backpack",
    price: 129.99,
    rating: 4.8,
    reviews: 156,
    description:
      "Crafted from premium full-grain leather, this backpack combines timeless style with modern functionality. Perfect for daily commutes or weekend getaways, it features multiple compartments, padded laptop sleeve, and adjustable shoulder straps for all-day comfort.",
    features: [
      "Made from premium full-grain leather",
      "Water-resistant coating",
      'Padded 15" laptop compartment',
      "Multiple interior pockets",
      "Adjustable shoulder straps",
      "Brass hardware with antique finish",
      'Dimensions: 16" x 12" x 6"',
      "Capacity: 25L",
    ],
    colors: ["Brown", "Black", "Tan"],
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622560480664-07b01f03bb5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622560481119-9103aff347cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622560481053-6c4c055e87ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 12,
    sku: "BPK-1001-LTR",
    category: "Accessories",
    relatedProducts: ["2", "3", "4"],
  },
  {
    id: "2",
    name: "Canvas Messenger Bag",
    price: 79.99,
    rating: 4.5,
    reviews: 124,
    description:
      "A versatile canvas messenger bag perfect for everyday use. Features a padded laptop compartment and multiple pockets for organization.",
    features: [
      "Durable canvas construction",
      "Adjustable shoulder strap",
      'Padded 15" laptop compartment',
      "Water-resistant",
      "Multiple organization pockets",
      'Dimensions: 15" x 11" x 4"',
    ],
    colors: ["Navy", "Olive", "Gray"],
    images: [
      "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473186505569-9ac64971f27f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 18,
    sku: "MSG-2001-CNV",
    category: "Accessories",
    relatedProducts: ["1", "3", "5"],
  },
  {
    id: "3",
    name: "Leather Wallet",
    price: 49.99,
    rating: 4.7,
    reviews: 98,
    description: "A slim, elegant leather wallet with RFID protection. Perfect for the modern minimalist.",
    features: [
      "Genuine full-grain leather",
      "RFID blocking technology",
      "6 card slots",
      "2 cash compartments",
      "ID window",
      "Slim profile design",
    ],
    colors: ["Brown", "Black", "Tan"],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 25,
    sku: "WLT-3001-LTR",
    category: "Accessories",
    relatedProducts: ["1", "2", "4"],
  },
  {
    id: "4",
    name: "Travel Duffel Bag",
    price: 149.99,
    rating: 4.6,
    reviews: 112,
    description:
      "A spacious duffel bag perfect for weekend trips or as a carry-on. Durable and stylish with plenty of organization options.",
    features: [
      "Water-resistant nylon construction",
      "Shoe compartment",
      "Padded shoulder strap",
      "Multiple internal and external pockets",
      "Luggage pass-through sleeve",
      'Dimensions: 22" x 12" x 10"',
      "Capacity: 45L",
    ],
    colors: ["Black", "Navy", "Burgundy"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512117789060-5de1c1c4efcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 8,
    sku: "DFL-4001-NYL",
    category: "Accessories",
    relatedProducts: ["1", "2", "3"],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [reviews, setReviews] = useState(mockReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
  })

  // Find the product by ID
  const product = productsData.find((p) => p.id === params.id) || productsData[0]

  // Get related products
  const relatedProducts = product.relatedProducts.map((id) => productsData.find((p) => p.id === id)).filter(Boolean)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      color: product.colors[selectedColor],
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleAddToWishlist = () => {
    // Get existing wishlist from localStorage
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
      reviews: product.reviews,
      image: product.images[0],
      stock: product.stock,
      addedAt: new Date().toISOString(),
    })
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist`,
    })
  }

  const handleSubmitReview = () => {
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

    const newReview = {
      id: Date.now().toString(),
      userId: user?.id || "unknown",
      userName: user?.name || "Anonymous",
      rating: reviewForm.rating,
      title: reviewForm.title,
      comment: reviewForm.comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      verified: true,
    }

    setReviews([newReview, ...reviews])
    setReviewForm({ rating: 5, title: "", comment: "" })
    setShowReviewForm(false)
    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    })
  }

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100,
  }))

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

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
            <div className="overflow-hidden rounded-lg border bg-muted/50">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
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
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 font-medium">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => {
                  const bgColor =
                    color === "Brown"
                      ? "#8B4513"
                      : color === "Black"
                        ? "#000"
                        : color === "Tan"
                          ? "#D2B48C"
                          : color === "Navy"
                            ? "#000080"
                            : color === "Olive"
                              ? "#556B2F"
                              : color === "Gray"
                                ? "#808080"
                                : color === "Burgundy"
                                  ? "#800020"
                                  : "#CCCCCC"

                  return (
                    <div
                      key={color}
                      className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${index === selectedColor ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      style={{ backgroundColor: bgColor }}
                      onClick={() => setSelectedColor(index)}
                    >
                      {index === selectedColor && (
                        <Check
                          className={`h-4 w-4 ${["Black", "Navy", "Burgundy"].includes(color) ? "text-white" : "text-white"}`}
                        />
                      )}
                      <span className="sr-only">{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>

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
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10" onClick={handleAddToWishlist}>
                <Heart className="mr-2 h-4 w-4" />
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
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
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
                      <Button onClick={handleSubmitReview}>Submit Review</Button>
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Individual Reviews */}
              {reviews.map((review) => (
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
                          <span className="text-sm text-muted-foreground">{review.date}</span>
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
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct?.id} className="overflow-hidden group">
                <Link href={`/product/${relatedProduct?.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={relatedProduct?.images[0] || "/placeholder.svg"}
                      alt={relatedProduct?.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="space-y-1">
                    <Link href={`/product/${relatedProduct?.id}`}>
                      <h3 className="font-medium hover:text-primary transition-colors">{relatedProduct?.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="ml-1 text-sm">{relatedProduct?.rating}</span>
                      </div>
                    </div>
                    <p className="font-medium">${relatedProduct?.price.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

