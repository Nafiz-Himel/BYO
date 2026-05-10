import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { collections, products } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel collections={collections} />

        {/* Featured Products */}
        <FeaturedProducts products={featuredProducts} />

        {/* Brand Statement Section */}
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

        {/* Newsletter Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-10">
          <div className="container mx-auto max-w-xl text-center">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Stay Connected</p>
            <h2 className="font-serif text-2xl lg:text-3xl tracking-wide mb-4">Join the AETHER World</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Be the first to discover new arrivals, exclusive offers, and behind-the-scenes stories from our ateliers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                className="h-12 px-8 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-xs"
              >
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
