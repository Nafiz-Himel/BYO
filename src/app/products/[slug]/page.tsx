import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/db"
import { ProductDetailClient } from "@/components/product-detail-client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: "Product Not Found | AETHER" }
  }

  return {
    title: `${product.name} | AETHER`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AETHER`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export async function generateStaticParams() {
  const { getAllProducts } = await import("@/lib/db")
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailClient product={product} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="py-10 lg:py-16 px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Skeleton className="aspect-[3/4] rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
