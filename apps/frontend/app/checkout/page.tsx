"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [formStep, setFormStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
    // In a real app, you would process payment here
    setOrderComplete(true)
    clearCart()

    // Simulate order processing
    setTimeout(() => {
      router.push("/")
    }, 5000)
  }

  if (items.length === 0 && !orderComplete) {
    router.push("/cart")
    return null
  }

  if (orderComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon. A confirmation email
              has been sent to your email address.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You will be redirected to the homepage in a few seconds...
            </p>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/")}>
              Return to Home
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
          <Link href="/cart" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex mb-6">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  1
                </div>
                <div className="ml-2 font-medium">Shipping</div>
              </div>
              <div className="w-12 h-1 mt-4 mx-2 bg-muted"></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  2
                </div>
                <div className="ml-2 font-medium">Payment</div>
              </div>
              <div className="w-12 h-1 mt-4 mx-2 bg-muted"></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  3
                </div>
                <div className="ml-2 font-medium">Review</div>
              </div>
            </div>

            {formStep === 1 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <h2 className="text-lg font-medium">Shipping Information</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input type="tel" className="w-full rounded-md border px-3 py-2" placeholder="(123) 456-7890" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2 mb-2"
                      placeholder="Street Address"
                    />
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Apt, Suite, Building (optional)"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="ZIP" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setFormStep(2)}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <h2 className="text-lg font-medium">Payment Method</h2>

                  <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4 pt-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-1">Expiration Date</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" className="rounded-md border px-3 py-2" placeholder="MM" />
                            <input type="text" className="rounded-md border px-3 py-2" placeholder="YY" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVC</label>
                          <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="123" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Name on Card</label>
                        <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="John Doe" />
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="pt-4">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                        <Button className="bg-[#0070ba] hover:bg-[#0070ba]/90">Continue with PayPal</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="apple" className="pt-4">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          You will be redirected to Apple Pay to complete your payment.
                        </p>
                        <Button className="bg-black hover:bg-black/90">Continue with Apple Pay</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setFormStep(1)}>
                    Back
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setFormStep(3)}>
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <h2 className="text-lg font-medium">Review Your Order</h2>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/50 px-4 py-3 font-medium">Order Summary</div>

                    <div className="p-4 space-y-4">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.color || ""}`} className="flex gap-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                            <div className="flex justify-between mt-1">
                              <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-sm text-muted-foreground">
                        John Doe
                        <br />
                        123 Main Street
                        <br />
                        Apt 4B
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Visa ending in 3456</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setFormStep(2)}>
                    Back
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="rounded-lg border p-6 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground gap-1">
                <Lock className="h-4 w-4" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

