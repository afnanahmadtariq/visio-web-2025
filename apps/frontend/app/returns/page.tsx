"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Package, Check, AlertCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock order data - in production this would come from the API
const mockOrders: Record<string, any> = {
  "ORD-12345": {
    id: "ORD-12345",
    date: "2025-11-25",
    status: "delivered",
    items: [
      { id: "1", name: "Premium Leather Backpack", price: 129.99, quantity: 1, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=100" },
      { id: "2", name: "Wireless Headphones", price: 199.99, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
    ],
  },
  "ORD-67890": {
    id: "ORD-67890",
    date: "2025-11-20",
    status: "delivered",
    items: [
      { id: "3", name: "Minimalist Watch", price: 149.99, quantity: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100" },
    ],
  },
}

type Step = "search" | "select" | "reason" | "confirm"

export default function ReturnsPage() {
  const { toast } = useToast()
  const [step, setStep] = useState<Step>("search")
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState<any>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [returnReason, setReturnReason] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [error, setError] = useState("")
  const [returnConfirmation, setReturnConfirmation] = useState<any>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const normalizedId = orderId.toUpperCase().trim()
    const foundOrder = mockOrders[normalizedId]
    
    if (foundOrder) {
      setOrder(foundOrder)
      setStep("select")
    } else {
      setError("Order not found. Please check your order ID and try again.")
    }
  }

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleContinueToReason = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to return",
        variant: "destructive",
      })
      return
    }
    setStep("reason")
  }

  const handleSubmitReturn = () => {
    if (!returnReason) {
      toast({
        title: "Reason required",
        description: "Please select a reason for the return",
        variant: "destructive",
      })
      return
    }

    // Generate dummy confirmation
    const confirmation = {
      returnId: `RET-${Date.now().toString(36).toUpperCase()}`,
      orderId: order.id,
      items: order.items.filter((item: any) => selectedItems.includes(item.id)),
      reason: returnReason,
      submittedAt: new Date().toISOString(),
      estimatedRefund: order.items
        .filter((item: any) => selectedItems.includes(item.id))
        .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
    }

    setReturnConfirmation(confirmation)
    setStep("confirm")
  }

  const handleStartNew = () => {
    setStep("search")
    setOrderId("")
    setOrder(null)
    setSelectedItems([])
    setReturnReason("")
    setAdditionalNotes("")
    setReturnConfirmation(null)
    setError("")
  }

  const returnReasons = [
    "Item damaged or defective",
    "Wrong item received",
    "Item not as described",
    "Changed my mind",
    "Found a better price",
    "No longer needed",
    "Other",
  ]

  // Confirmation Screen
  if (step === "confirm" && returnConfirmation) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Return Request Submitted</h1>
            <p className="text-muted-foreground mb-8">
              Your return request has been submitted successfully. You will receive an email with further instructions.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>Return Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Return ID</p>
                    <p className="font-mono font-medium">{returnConfirmation.returnId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-medium">{returnConfirmation.orderId}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Items to Return</p>
                  {returnConfirmation.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 py-2">
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Refund</span>
                  <span className="font-bold text-lg">${returnConfirmation.estimatedRefund.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/profile">View Order History</Link>
              </Button>
              <Button variant="outline" onClick={handleStartNew}>
                Submit Another Return
              </Button>
            </div>
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
          <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <RotateCcw className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Returns & Refunds</h1>
            <p className="text-muted-foreground">
              Initiate a return for your order. Most items can be returned within 30 days.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === "search" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}>
                1
              </div>
              <div className="w-12 h-1 bg-muted" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === "select" ? "bg-primary text-primary-foreground" : step === "reason" || step === "confirm" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                2
              </div>
              <div className="w-12 h-1 bg-muted" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === "reason" ? "bg-primary text-primary-foreground" : step === "confirm" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                3
              </div>
            </div>
          </div>

          {/* Step 1: Search Order */}
          {step === "search" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Your Order
                </CardTitle>
                <CardDescription>
                  Enter your order ID to start the return process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                      id="orderId"
                      placeholder="e.g., ORD-12345"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      You can find your order ID in your order confirmation email
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    Find Order
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Demo: Try "ORD-12345" or "ORD-67890"
                  </p>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Items */}
          {step === "select" && order && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Select Items to Return
                </CardTitle>
                <CardDescription>
                  Order {order.id} - Placed on {new Date(order.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedItems.includes(item.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemSelect(item.id)}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handleStartNew}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleContinueToReason}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Return Reason */}
          {step === "reason" && (
            <Card>
              <CardHeader>
                <CardTitle>Reason for Return</CardTitle>
                <CardDescription>
                  Please tell us why you're returning {selectedItems.length} item(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {returnReasons.map((reason) => (
                    <div
                      key={reason}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        returnReason === reason ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setReturnReason(reason)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          returnReason === reason ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}
                      />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about your return..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("select")}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleSubmitReturn}>
                    Submit Return Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium">Free Returns</h4>
                <p className="text-sm text-muted-foreground">On most items within 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium">Easy Process</h4>
                <p className="text-sm text-muted-foreground">Simple 3-step return process</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Check className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium">Fast Refunds</h4>
                <p className="text-sm text-muted-foreground">Refunds processed in 3-5 days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
