import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShopFilters } from "@/components/shop-filters"

interface ShopMobileFiltersProps {
  selectedCategory: string
  selectedSizes: string[]
  priceRange: [number, number]
  onCategoryChange: (category: string) => void
  onSizeChange: (sizes: string[]) => void
  onPriceChange: (range: [number, number]) => void
  onReset: () => void
  activeFiltersCount: number
}

export function ShopMobileFilters({
  selectedCategory,
  selectedSizes,
  priceRange,
  onCategoryChange,
  onSizeChange,
  onPriceChange,
  onReset,
  activeFiltersCount,
}: ShopMobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden rounded-lg tracking-wider text-xs gap-2 bg-transparent"
        >
          <SlidersHorizontal className="h-4 w-4" />
          FILTERS
          {activeFiltersCount > 0 && (
            <span className="ml-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-sm font-medium tracking-widest uppercase">Filters</SheetTitle>
        </SheetHeader>
        <ShopFilters
          selectedCategory={selectedCategory}
          selectedSizes={selectedSizes}
          priceRange={priceRange}
          onCategoryChange={onCategoryChange}
          onSizeChange={onSizeChange}
          onPriceChange={onPriceChange}
          onReset={onReset}
        />
      </SheetContent>
    </Sheet>
  )
}
