"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShopMobileFilters } from "@/components/shop-mobile-filters"

interface ShopMobileFiltersWrapperProps {
  selectedCategory: string
  selectedSizes: string[]
  priceRange: [number, number]
  activeFiltersCount: number
}

export function ShopMobileFiltersWrapper({
  selectedCategory,
  selectedSizes,
  priceRange,
  activeFiltersCount,
}: ShopMobileFiltersWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateURL = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "all" || value === "0,2000") {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`)
    },
    [router, searchParams],
  )

  const handleCategoryChange = useCallback(
    (category: string) => {
      updateURL({ category, page: undefined })
    },
    [updateURL],
  )

  const handleSizeChange = useCallback(
    (sizes: string[]) => {
      updateURL({ sizes: sizes.length > 0 ? sizes.join(",") : undefined, page: undefined })
    },
    [updateURL],
  )

  const handlePriceChange = useCallback(
    (range: [number, number]) => {
      const updates: Record<string, string | undefined> = { page: undefined }
      if (range[0] > 0 || range[1] < 2000) {
        updates.minPrice = String(range[0])
        updates.maxPrice = String(range[1])
      } else {
        updates.minPrice = undefined
        updates.maxPrice = undefined
      }
      updateURL(updates)
    },
    [updateURL],
  )

  const handleReset = useCallback(() => {
    router.push("/shop")
  }, [router])

  return (
    <ShopMobileFilters
      selectedCategory={selectedCategory}
      selectedSizes={selectedSizes}
      priceRange={priceRange}
      onCategoryChange={handleCategoryChange}
      onSizeChange={handleSizeChange}
      onPriceChange={handlePriceChange}
      onReset={handleReset}
      activeFiltersCount={activeFiltersCount}
    />
  )
}
