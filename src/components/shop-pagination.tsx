"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ShopPaginationProps {
  currentPage: number
  totalPages: number
}

export function ShopPagination({ currentPage, totalPages }: ShopPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`/shop?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg bg-transparent"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          className={`rounded-lg min-w-[36px] ${
            page === currentPage ? "" : "bg-transparent"
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="rounded-lg bg-transparent"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
