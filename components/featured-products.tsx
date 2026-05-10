"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import type { Product } from "@/lib/mock-data"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay for skeleton demo
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Curated Selection</p>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide">Featured Pieces</h2>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
