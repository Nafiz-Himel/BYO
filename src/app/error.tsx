"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          onClick={reset}
          className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-xs px-8"
        >
          TRY AGAIN
        </Button>
      </div>
    </div>
  )
}
