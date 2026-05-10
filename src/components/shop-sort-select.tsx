"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sortOptions } from "@/lib/mock-data"

const SORT_OPTIONS = sortOptions.map((o) => ({ value: o.value, label: o.label }))

interface ShopSortSelectProps {
  currentSort: string
}

export function ShopSortSelect({ currentSort }: ShopSortSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("sort", value)
      router.push(`/shop?${params.toString()}`)
    },
    [router, searchParams],
  )

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] rounded-lg text-xs tracking-wider">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-xs">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
