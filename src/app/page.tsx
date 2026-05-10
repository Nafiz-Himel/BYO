import { Suspense } from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getFeaturedProducts, getCollections } from "@/lib/db"
import { NewsletterForm } from "@/components/newsletter-form"

export const metadata: Metadata = {
  title: "AETHER | Luxury Clothing",
  description: "Discover timeless elegance with AETHER - Premium luxury clothing for the modern connoisseur.",
  openGraph: {
    title: "AETHER | Luxury Clothing",
    description: "Discover timeless elegance with AETHER - Premium luxury clothing for the modern connoisseur.",
    siteName: "AETHER",
    type: "website",
  },
}

async function FeaturedProductsSection() {
  const products = await getFeaturedProducts(6)
  return <FeaturedProducts products={products} />
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Suspense fallback={<div className="h-[70vh] lg:h-[85vh] bg-muted animate-pulse" />}>
          <CollectionsCarousel />
        </Suspense>

        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <FeaturedProductsSection />
        </Suspense>

        <section className="py-16 lg:py-24 px-6 lg:px-10 bg-card">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">Our Philosophy</p>
            <blockquote className="font-serif text-2xl lg:text-4xl leading-relaxed tracking-wide text-balance mb-8">
              &ldquo;We believe in the quiet power of exceptional craftsmanship. Each piece tells a story of tradition,
              innovation, and uncompromising attention to detail.&rdquo;
            </blockquote>
            <Link href="/shop">
              <Button variant="link" className="text-accent tracking-widest text-sm hover:text-accent/80 group">
                DISCOVER OUR CRAFT
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-6 lg:px-10">
          <div className="container mx-auto max-w-xl text-center">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Stay Connected</p>
            <h2 className="font-serif text-2xl lg:text-3xl tracking-wide mb-4">Join the AETHER World</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Be the first to discover new arrivals, exclusive offers, and behind-the-scenes stories from our ateliers.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

async function CollectionsCarousel() {
  const collections = await getCollections()
  return <HeroCarousel collections={collections} />
}
