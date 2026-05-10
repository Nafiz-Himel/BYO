"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-24 overflow-hidden rounded-lg bg-muted transition-all",
                index === selectedIndex ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100",
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
