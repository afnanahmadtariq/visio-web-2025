"use client"

import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const shipping = subtotal > 50 ? 0 : 5.99
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true)
    }
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/products" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 flex items-center font-medium">
                <div className="w-1/2">Product</div>
                <div className="w-1/6 text-center">Price</div>
                <div className="w-1/6 text-center">Quantity</div>
                <div className="w-1/6 text-center">Total</div>
              </div>

              {items.map((item) => (
                <div key={`${item.id}-${item.color || ""}`} className="px-4 py-4 border-t flex items-center">
                  <div className="w-1/2 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                    </div>
                  </div>

                  <div className="w-1/6 text-center">${item.price.toFixed(2)}</div>

                  <div className="w-1/6 flex justify-center">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="w-1/6 flex justify-between items-center">
                    <span className="text-center flex-1">${(item.price * item.quantity).toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" className="text-muted-foreground" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 rounded-md border px-3 py-2 text-sm"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button variant="outline" onClick={handleApplyPromo} disabled={promoApplied || !promoCode}>
                    Apply
                  </Button>
                </div>

                {promoApplied && <p className="text-sm text-green-600">Promo code applied successfully!</p>}

                <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

