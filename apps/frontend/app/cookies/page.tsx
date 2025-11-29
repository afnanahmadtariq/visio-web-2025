"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: November 29, 2025</p>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Visio Mart uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., shopping cart, authentication)</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Session Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These temporary cookies expire when you close your browser. They are essential for the website to function properly.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Persistent Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies remain on your device for a set period or until you delete them. They help us remember your preferences.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Third-Party Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Set by third-party services we use, such as analytics providers and advertising partners.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
                  <li>Browser add-ons: Install cookie management extensions</li>
                  <li>Our cookie preferences: Use our cookie consent banner to manage preferences</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please note that disabling certain cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the following third-party services that may set cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Google Analytics - for website analytics</li>
                  <li>Stripe - for payment processing</li>
                  <li>Social media platforms - for sharing and login features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an 
                  updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us:
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
