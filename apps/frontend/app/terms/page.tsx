"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: November 29, 2025</p>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Visio Mart, you agree to be bound by these Terms of Service and all applicable 
                  laws and regulations. If you do not agree with any of these terms, you are prohibited from using or 
                  accessing this site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily access and use Visio Mart for personal, non-commercial transitory 
                  viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features of our website, you may be required to register for an account. You agree 
                  to provide accurate, current, and complete information during registration and to update such information 
                  to keep it accurate, current, and complete. You are responsible for safeguarding your password and for 
                  all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Products and Pricing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All products displayed on Visio Mart are subject to availability. We reserve the right to discontinue 
                  any product at any time. Prices for products are subject to change without notice. We reserve the right 
                  to refuse any order you place with us. We may limit or cancel quantities purchased per person, per 
                  household, or per order.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We accept various payment methods as indicated at checkout. By submitting your payment information, 
                  you authorize us to charge the applicable fees to your chosen payment method. All payments are processed 
                  securely through our payment providers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Shipping and Delivery</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Delivery times are estimates and are not guaranteed. We are not liable for any delays in shipments. 
                  Risk of loss and title for products pass to you upon delivery to the carrier. Please review our 
                  Shipping Policy for more details.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Returns and Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer returns within 30 days of purchase for most items. Products must be in their original 
                  condition with tags attached. Please review our Returns Policy for complete details on eligibility 
                  and process.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Visio Mart or its suppliers be liable for any damages arising out of the use or 
                  inability to use the materials on our website, even if we have been notified of the possibility of 
                  such damage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with applicable laws, and 
                  you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about the Terms of Service should be sent to us at:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm"><strong>Email:</strong> legal@visiomart.com</p>
                  <p className="text-sm"><strong>Address:</strong> 123 Commerce Street, Business District, City 12345</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
