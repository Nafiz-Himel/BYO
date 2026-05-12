import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-6xl mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page not found</p>
        <Link href="/">
          <Button className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 tracking-widest text-xs">
            BACK TO HOME
          </Button>
        </Link>
      </div>
    </div>
  )
}
