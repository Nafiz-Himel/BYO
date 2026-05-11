"use client"

import Link from "next/link"
import { Search, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useCart } from "@/lib/cart-context"
import { CommandSearch } from "@/components/command-search"
import { useState } from "react"

export function SiteHeader() {
  const { totalItems } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-10">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10 pl-6 sm:pl-0">
                <Link href="/" className="text-lg font-medium tracking-wide hover:text-accent transition-colors">
                  Home
                </Link>
                <Link href="/shop" className="text-lg font-medium tracking-wide hover:text-accent transition-colors">
                  Shop
                </Link>
                <Link
                  href="/shop?category=shirts"
                  className="text-muted-foreground tracking-wide hover:text-foreground transition-colors"
                >
                  Shirts
                </Link>
                <Link
                  href="/shop?category=trousers"
                  className="text-muted-foreground tracking-wide hover:text-foreground transition-colors"
                >
                  Trousers
                </Link>
                <Link
                  href="/shop?category=outerwear"
                  className="text-muted-foreground tracking-wide hover:text-foreground transition-colors"
                >
                  Outerwear
                </Link>
                <Link
                  href="/shop?category=accessories"
                  className="text-muted-foreground tracking-wide hover:text-foreground transition-colors"
                >
                  Accessories
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium tracking-widest uppercase hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium tracking-widest uppercase hover:text-accent transition-colors"
            >
              Shop
            </Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg lg:text-2xl tracking-[0.3em] font-light">
            AETHER
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-0.5 lg:gap-2 -mr-3 lg:mr-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products (Ctrl+K)"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
