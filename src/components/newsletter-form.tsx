"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { subscribeToNewsletter } from "@/lib/actions/newsletter"

const initialState = { success: false, message: "" }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState)

  return (
    <form action={formAction} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full h-12 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Email address for newsletter"
        />
        {state?.message && (
          <p className={`text-xs mt-2 ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="h-12 px-8 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-xs disabled:opacity-50"
      >
        {pending ? "SUBSCRIBING..." : "SUBSCRIBE"}
      </Button>
    </form>
  )
}
