import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl tracking-[0.2em] mb-6">AETHER</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Timeless elegance meets contemporary design. Crafted for those who appreciate the art of refined
              simplicity.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase mb-6">Shop</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/shop?category=shirts"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Shirts
              </Link>
              <Link
                href="/shop?category=trousers"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Trousers
              </Link>
              <Link
                href="/shop?category=outerwear"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Outerwear
              </Link>
              <Link
                href="/shop?category=accessories"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessories
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase mb-6">Help</h4>
            <nav className="flex flex-col gap-3">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping & Returns
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Size Guide
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase mb-6">Connect</h4>
            <nav className="flex flex-col gap-3">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pinterest
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">© 2025 AETHER. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
