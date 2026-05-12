import { Skeleton } from "@/components/ui/skeleton"

export default function RootLoading() {
  return (
    <div className="py-16 px-6 lg:px-10">
      <div className="container mx-auto text-center mb-12">
        <Skeleton className="h-4 w-24 mx-auto mb-4" />
        <Skeleton className="h-12 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[3/4] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
