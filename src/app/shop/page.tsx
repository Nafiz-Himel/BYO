import { Suspense } from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { ShopFiltersWrapper } from "@/components/shop-filters-wrapper"
import { ShopMobileFiltersWrapper } from "@/components/shop-mobile-filters-wrapper"
import { ShopSortSelect } from "@/components/shop-sort-select"
import { ShopPagination } from "@/components/shop-pagination"
import { getProducts } from "@/lib/db"

export const metadata: Metadata = {
  title: "Shop | AETHER",
  description: "Browse our curated collection of luxury clothing.",
}

const ITEMS_PER_PAGE = 9

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  const category = (params.category as string) || "all"
  const sortBy = (params.sort as string) || "newest"
  const sizesParam = params.sizes as string | undefined
  const sizes = sizesParam ? sizesParam.split(",") : []
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined
  const page = params.page ? Number(params.page) : 1

  const { products, total, totalPages } = await getProducts({
    category,
    sizes,
    minPrice,
    maxPrice,
    sortBy,
    page,
    limit: ITEMS_PER_PAGE,
  })

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    sizes.length +
    (minPrice !== undefined || maxPrice !== undefined ? 1 : 0)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-12 lg:py-16 px-6 lg:px-10 border-b border-border/40">
          <div className="container mx-auto text-center">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">The Collection</p>
            <h1 className="font-serif text-3xl lg:text-5xl tracking-wide">Shop All</h1>
          </div>
        </section>

        <section className="py-10 lg:py-16 px-6 lg:px-10">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <ShopFiltersWrapper
                    selectedCategory={category}
                    selectedSizes={sizes}
                    priceRange={[minPrice ?? 0, maxPrice ?? 2000]}
                  />
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <ShopMobileFiltersWrapper
                      selectedCategory={category}
                      selectedSizes={sizes}
                      priceRange={[minPrice ?? 0, maxPrice ?? 2000]}
                      activeFiltersCount={activeFiltersCount}
                    />
                    <span className="text-sm text-muted-foreground">
                      {total} product{total !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ShopSortSelect currentSort={sortBy} />
                </div>

                <Suspense fallback={<ProductGridSkeleton count={ITEMS_PER_PAGE} />}>
                  {products.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-muted-foreground mb-4">No products match your filters.</p>
                      <a href="/shop" className="text-sm text-accent hover:underline">
                        Reset all filters
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>

                      {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                          <ShopPagination currentPage={page} totalPages={totalPages} />
                        </div>
                      )}
                    </>
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
