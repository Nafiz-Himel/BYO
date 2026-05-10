"use client"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { categories, sizes } from "@/lib/mock-data"

interface ShopFiltersProps {
  selectedCategory: string
  selectedSizes: string[]
  priceRange: [number, number]
  onCategoryChange: (category: string) => void
  onSizeChange: (sizes: string[]) => void
  onPriceChange: (range: [number, number]) => void
  onReset: () => void
}

export function ShopFilters({
  selectedCategory,
  selectedSizes,
  priceRange,
  onCategoryChange,
  onSizeChange,
  onPriceChange,
  onReset,
}: ShopFiltersProps) {
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter((s) => s !== size))
    } else {
      onSizeChange([...selectedSizes, size])
    }
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium tracking-widest uppercase mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`block w-full text-left text-sm transition-colors ${
                selectedCategory === category.value
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-medium tracking-widest uppercase mb-4">Size</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-3">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
                className="rounded-sm"
              />
              <Label
                htmlFor={`size-${size}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-sm font-medium tracking-widest uppercase mb-4">Price Range</h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            min={0}
            max={2000}
            step={50}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="w-full rounded-lg tracking-wider text-xs bg-transparent"
      >
        RESET FILTERS
      </Button>
    </div>
  )
}
