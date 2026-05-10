"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Collection } from "@/lib/mock-data"

interface HeroCarouselProps {
  collections: Collection[]
}

export function HeroCarousel({ collections }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % collections.length)
  }, [collections.length])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length)
  }, [collections.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  React.useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section
      className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured Collections"
    >
      {/* Slides */}
      <div className="relative h-full">
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${collections.length}: ${collection.name}`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={collection.image || "/placeholder.svg"}
              alt={collection.name}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 lg:pb-32 px-6">
              <div className="text-center max-w-2xl">
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">{collection.subtitle}</p>
                <h2 className="font-serif text-4xl lg:text-6xl tracking-wide mb-6 text-balance">{collection.name}</h2>
                <Link href={`/shop?collection=${collection.slug}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full tracking-widest text-xs px-10 border-foreground/30 hover:bg-foreground hover:text-background transition-all bg-transparent"
                  >
                    EXPLORE COLLECTION
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/30 transition-all"
        onClick={() => {
          prevSlide()
          setIsAutoPlaying(false)
          setTimeout(() => setIsAutoPlaying(true), 5000)
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/30 transition-all"
        onClick={() => {
          nextSlide()
          setIsAutoPlaying(false)
          setTimeout(() => setIsAutoPlaying(true), 5000)
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Pagination Dots */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
        role="tablist"
        aria-label="Carousel navigation"
      >
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-foreground w-8" : "bg-foreground/30 hover:bg-foreground/50",
            )}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
