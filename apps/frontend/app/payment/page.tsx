"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Check, X, RefreshCw, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"

type PaymentStatus = "pending" | "processing" | "success" | "failed"

interface PaymentFormData {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvc: string
  cardholderName: string
}

export default function PaymentPage() {
  const { toast } = useToast()
  const { items, subtotal, clearCart } = useCart()
  
  const [status, setStatus] = useState<PaymentStatus>("pending")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    cardholderName: "",
  })

  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }))
      return
    }
    
    // Limit month input
    if (name === "expiryMonth") {
      const numValue = parseInt(value)
      if (value === "" || (numValue >= 0 && numValue <= 12)) {
        setFormData(prev => ({ ...prev, [name]: value.slice(0, 2) }))
      }
      return
    }
    
    // Limit year input
    if (name === "expiryYear") {
      setFormData(prev => ({ ...prev, [name]: value.slice(0, 2) }))
      return
    }
    
    // Limit CVC input
    if (name === "cvc") {
      setFormData(prev => ({ ...prev, [name]: value.slice(0, 4) }))
      return
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    const cardNumberClean = formData.cardNumber.replace(/\s/g, "")
    
    if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid card number",
        variant: "destructive",
      })
      return false
    }
    
    if (!formData.expiryMonth || !formData.expiryYear) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter a valid expiry date",
        variant: "destructive",
      })
      return false
    }
    
    if (formData.cvc.length < 3) {
      toast({
        title: "Invalid CVC",
        description: "Please enter a valid CVC",
        variant: "destructive",
      })
      return false
    }
    
    if (!formData.cardholderName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter the cardholder name",
        variant: "destructive",
      })
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setStatus("processing")
    
    try {
      // Simulate payment API call (dummy payment)
      // In a real app: await post("/api/pay", { orderId, ...paymentData })
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success/failure (80% success rate for demo)
      const isSuccess = Math.random() > 0.2
      
      if (isSuccess) {
        setStatus("success")
        clearCart()
        toast({
          title: "Payment Successful",
          description: "Your order has been placed successfully!",
        })
      } else {
        setStatus("failed")
        toast({
          title: "Payment Failed",
          description: "Your card was declined. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setStatus("failed")
      toast({
        title: "Payment Error",
        description: "An error occurred while processing your payment.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetry = () => {
    setStatus("pending")
    setFormData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
      cardholderName: "",
    })
  }

  // Success Screen
  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
              A confirmation email has been sent to your email address.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="w-full" asChild>
                <Link href="/profile">View Order History</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Failed Screen
  if (status === "failed") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
            <p className="text-muted-foreground mb-2">
              We couldn't process your payment. Your card was not charged.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 text-left">
                Please check your card details and try again. If the problem persists, 
                contact your bank or try a different payment method.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full" onClick={handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/cart">Back to Cart</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Processing Screen
  if (status === "processing") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin">
                <RefreshCw className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Processing Payment</h1>
            <p className="text-muted-foreground">
              Please wait while we process your payment. Do not close this page.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Payment Form
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/checkout" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Checkout
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Payment</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Card Details
                </CardTitle>
                <CardDescription>
                  Enter your card information to complete the purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label>Expiry Date</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          name="expiryMonth"
                          placeholder="MM"
                          value={formData.expiryMonth}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          name="expiryYear"
                          placeholder="YY"
                          value={formData.expiryYear}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        type="password"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      name="cardholderName"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Separator />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg" 
                    disabled={isSubmitting}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ${total.toFixed(2)}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    This is a demo payment page. No real charges will be made.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
