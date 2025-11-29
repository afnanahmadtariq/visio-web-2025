"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, MapPin, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Shipping Information</h1>
            <p className="text-muted-foreground mb-8">Everything you need to know about our shipping options and policies.</p>

            {/* Shipping Options */}
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Standard Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">FREE</p>
                  <p className="text-sm text-muted-foreground mb-4">On orders over $50</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Delivery in 5-7 business days</li>
                    <li>• Tracking number provided</li>
                    <li>• $4.99 for orders under $50</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Express Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">$9.99</p>
                  <p className="text-sm text-muted-foreground mb-4">Flat rate</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Delivery in 2-3 business days</li>
                    <li>• Priority handling</li>
                    <li>• Full tracking & updates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Next Day Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">$19.99</p>
                  <p className="text-sm text-muted-foreground mb-4">Order by 2 PM</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Delivered next business day</li>
                    <li>• Available in select areas</li>
                    <li>• Signature required</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    International Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">From $14.99</p>
                  <p className="text-sm text-muted-foreground mb-4">Varies by location</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Delivery in 7-14 business days</li>
                    <li>• Customs fees may apply</li>
                    <li>• Full international tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How do I track my order?</h3>
                  <p className="text-muted-foreground">
                    Once your order ships, you'll receive an email with a tracking number. You can also track 
                    your order by logging into your account and viewing your order history.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What if my package is lost or damaged?</h3>
                  <p className="text-muted-foreground">
                    Contact our customer support team immediately. We'll work with the carrier to locate your 
                    package or arrange for a replacement or refund.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Do you ship to P.O. boxes?</h3>
                  <p className="text-muted-foreground">
                    Yes, we ship to P.O. boxes via standard shipping. However, express and next-day delivery 
                    options require a physical address.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Can I change my shipping address after placing an order?</h3>
                  <p className="text-muted-foreground">
                    If your order hasn't shipped yet, contact us immediately and we'll try to update the address. 
                    Once shipped, we cannot change the delivery address.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
