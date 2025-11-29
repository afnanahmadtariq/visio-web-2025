"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days, and next-day delivery is available for orders placed before 2 PM in select areas."
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive an email with a tracking number. You can also log into your account to view real-time tracking information."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a flat rate shipping fee of $4.99."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customs fees may apply."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of purchase. Items must be unused, unworn, and in their original packaging with all tags attached."
      },
      {
        q: "How do I initiate a return?",
        a: "Visit our Returns page, enter your order number and email, select the items you wish to return, and follow the instructions to print your prepaid return label."
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method."
      },
      {
        q: "Can I exchange an item?",
        a: "Yes! You can exchange items for a different size or color. Simply initiate a return and place a new order for the item you want."
      }
    ]
  },
  {
    category: "Products",
    questions: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a size guide with detailed measurements. If you're between sizes, we recommend sizing up for a more comfortable fit."
      },
      {
        q: "Are your products authentic?",
        a: "Absolutely! We only sell 100% authentic products sourced directly from brands or authorized distributors."
      },
      {
        q: "What if an item is out of stock?",
        a: "You can sign up for email notifications on the product page to be alerted when the item is back in stock."
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes! Gift wrapping is available at checkout for an additional $5. We also include a complimentary gift message."
      }
    ]
  },
  {
    category: "Account & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay."
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details."
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Sign In' and then 'Forgot Password'. Enter your email address and we'll send you a link to reset your password."
      },
      {
        q: "Can I save items for later?",
        a: "Yes! Add items to your wishlist by clicking the heart icon on any product. Your wishlist is saved to your account and accessible from any device."
      }
    ]
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all", isOpen ? "pb-4" : "max-h-0")}>
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Frequently Asked Questions</h1>
            <p className="text-muted-foreground mb-8">Find answers to common questions about shopping with Visio Mart.</p>

            <div className="space-y-8">
              {faqs.map((category) => (
                <div key={category.category}>
                  <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                  <div className="border-t">
                    {category.questions.map((faq, index) => (
                      <FAQItem key={index} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg text-center">
              <h3 className="font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our customer support team is here to help.
              </p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
