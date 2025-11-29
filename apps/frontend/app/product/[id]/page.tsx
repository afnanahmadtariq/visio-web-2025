"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Minus, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"

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
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

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

    // Show a toast or notification here

    // Optionally navigate to cart
    // router.push('/cart');
  }

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
              <Button size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10">
                Add to Wishlist
              </Button>
            </div>

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

