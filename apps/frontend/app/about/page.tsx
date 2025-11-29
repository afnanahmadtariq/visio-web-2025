"use client"

import Link from "next/link"
import { ArrowRight, Mail, MapPin, PhoneCall, ShoppingBag, Users, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock team data - replace with actual data
const teamMembers = [
  {
    id: "1",
    name: "Emma Johnson",
    role: "CEO & Founder",
    bio: "Emma founded ModernShop in 2015 with a vision for accessible, quality products for every lifestyle.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    name: "David Chen",
    role: "Chief Operations Officer",
    bio: "David oversees all operations and ensures our customers have a seamless shopping experience.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Head of Design",
    bio: "Sarah leads our product curation team and ensures we offer the most stylish selections.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    name: "Michael Rodriguez",
    role: "Customer Experience Director",
    bio: "Michael is dedicated to making every customer interaction with ModernShop exceptional.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

// Mock FAQ data
const faqs = [
  {
    question: "What makes ModernShop different from other online stores?",
    answer: "ModernShop stands out with our curated selection of high-quality products, exceptional customer service, and commitment to sustainability. We personally test and review each product before offering it to our customers, ensuring you only get the best."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping varies by location but generally takes 7-14 business days."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a hassle-free 30-day return policy. If you're not satisfied with your purchase for any reason, you can return it in its original condition for a full refund or exchange. Custom or personalized items may have different return policies."
  },
  {
    question: "Do you offer discounts for bulk orders?",
    answer: "Yes, we offer special pricing for bulk orders. Please contact our customer service team at bulk@modernshop.com with details about your order requirements for a custom quote."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your ModernShop account and view your order status and tracking details in the 'Order History' section."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Any applicable import duties or taxes are the responsibility of the customer and are not included in our shipping charges."
  }
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10 z-0" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-[900px] mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              About ModernShop
            </h1>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
              Transforming online shopping with curated products and exceptional experiences since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ModernShop began in 2015 with a simple mission: to create an online shopping destination that offers carefully curated products for modern living. What started as a small operation has grown into a thriving marketplace trusted by customers worldwide.
              </p>
              <p>
                Our founder, Emma Johnson, recognized a gap in the market for a shopping platform that prioritizes quality, design, and customer satisfaction above all else. She assembled a team of passionate individuals who share her vision for redefining e-commerce.
              </p>
              <p>
                Today, ModernShop serves over 500,000 customers globally, offering everything from home goods to fashion, electronics to wellness products - all selected with our discerning eye for quality and value.
              </p>
            </div>
          </div>          <div className="relative aspect-video md:aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Our story"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Our Core Values</h2>
            <p className="mt-2 text-muted-foreground max-w-[600px] mx-auto">
              These principles guide everything we do and every decision we make
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Customer First</h3>
                <p className="text-muted-foreground">
                  We build every aspect of our business around our customers' needs and satisfaction.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We rigorously test all products to ensure they meet our high standards before offering them to you.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to reducing our environmental impact through responsible business practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container py-12 md:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Meet Our Team</h2>
          <p className="mt-2 text-muted-foreground max-w-[600px] mx-auto">
            The passionate people working behind the scenes to make ModernShop exceptional
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground max-w-[600px] mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>
          
          <div className="max-w-[800px] mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
            <Button className="bg-primary hover:bg-primary/90">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">Get In Touch</h2>
            <p className="text-muted-foreground mb-6">
              We'd love to hear from you. Whether you have a question about our products, services, or anything else, our team is ready to answer all your questions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">123 Commerce St, City, Country</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">support@modernshop.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneCall className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Send a Message <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>          <div className="relative aspect-video md:aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Contact us"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
