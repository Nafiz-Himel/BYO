"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { ShopFilters } from "@/components/shop-filters"
import { ShopMobileFilters } from "@/components/shop-mobile-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products, sortOptions } from "@/lib/mock-data"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) => p.sizes.some((size) => selectedSizes.includes(size)))
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return filtered
  }, [selectedCategory, selectedSizes, priceRange, sortBy])

  const handleReset = () => {
    setSelectedCategory("all")
    setSelectedSizes([])
    setPriceRange([0, 2000])
    setSortBy("newest")
  }

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) + selectedSizes.length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 lg:py-16 px-6 lg:px-10 border-b border-border/40">
          <div className="container mx-auto text-center">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">The Collection</p>
            <h1 className="font-serif text-3xl lg:text-5xl tracking-wide">Shop All</h1>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-10 lg:py-16 px-6 lg:px-10">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <ShopFilters
                    selectedCategory={selectedCategory}
                    selectedSizes={selectedSizes}
                    priceRange={priceRange}
                    onCategoryChange={setSelectedCategory}
                    onSizeChange={setSelectedSizes}
                    onPriceChange={setPriceRange}
                    onReset={handleReset}
                  />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <ShopMobileFilters
                      selectedCategory={selectedCategory}
                      selectedSizes={selectedSizes}
                      priceRange={priceRange}
                      onCategoryChange={setSelectedCategory}
                      onSizeChange={setSelectedSizes}
                      onPriceChange={setPriceRange}
                      onReset={handleReset}
                      activeFiltersCount={activeFiltersCount}
                    />
                    <span className="text-sm text-muted-foreground">
                      {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] rounded-lg text-xs tracking-wider">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Products */}
                {isLoading ? (
                  <ProductGridSkeleton count={8} />
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground mb-4">No products match your filters.</p>
                    <button onClick={handleReset} className="text-sm text-accent hover:underline">
                      Reset all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
