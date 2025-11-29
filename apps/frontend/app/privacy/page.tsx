"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: November 29, 2025</p>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Visio Mart. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our 
                  website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect, use, store and transfer different kinds of personal data about you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Identity Data:</strong> includes first name, last name, username</li>
                  <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, phone numbers</li>
                  <li><strong>Financial Data:</strong> includes payment card details (processed securely through our payment provider)</li>
                  <li><strong>Transaction Data:</strong> includes details about payments and products you have purchased</li>
                  <li><strong>Technical Data:</strong> includes IP address, browser type and version, time zone setting</li>
                  <li><strong>Usage Data:</strong> includes information about how you use our website and products</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>To process and deliver your orders</li>
                  <li>To manage your account and relationship with us</li>
                  <li>To send you order confirmations and updates</li>
                  <li>To improve our website, products, and services</li>
                  <li>To send marketing communications (with your consent)</li>
                  <li>To detect and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally 
                  lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, 
                  agents, contractors, and third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies to distinguish you from other users and to provide you with a better experience. 
                  Cookies are small text files placed on your device. You can set your browser to refuse cookies, but some 
                  features of our website may not function properly without them.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Under certain circumstances, you have rights under data protection laws:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm"><strong>Email:</strong> privacy@visiomart.com</p>
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
