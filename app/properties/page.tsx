import { Suspense } from "react";
import { getProperties } from "@/actions/property.actions";
import { getCategories } from "@/actions/category.actions";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilters } from "@/components/property-filters";
import { PaginationBar } from "@/components/pagination-bar";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const limit = 9;

  const [categories, { data: properties, meta }] = await Promise.all([
    getCategories().catch(() => []),
    getProperties({
      searchTerm: typeof sp.searchTerm === "string" ? sp.searchTerm : undefined,
      categoryId: typeof sp.categoryId === "string" ? sp.categoryId : undefined,
      minPrice: typeof sp.minPrice === "string" ? sp.minPrice : undefined,
      maxPrice: typeof sp.maxPrice === "string" ? sp.maxPrice : undefined,
      sortBy: typeof sp.sortBy === "string" ? sp.sortBy : "createdAt",
      sortOrder: "desc",
      page,
      limit,
    }),
  ]);

  const totalPages =
    meta?.totalPages ?? Math.ceil((meta?.total ?? 0) / limit) ?? 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse properties</h1>
        <p className="text-muted-foreground mt-1">
          {meta?.total ?? properties.length} propert
          {(meta?.total ?? properties.length) === 1 ? "y" : "ies"} found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
          <PropertyFilters categories={categories} />
        </Suspense>

        <div>
          {properties.length === 0 ? (
            <div className="rounded-xl border border-dashed py-24 text-center">
              <p className="text-muted-foreground">
                No properties match your filters. Try adjusting your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <Suspense fallback={null}>
            <PaginationBar page={page} totalPages={totalPages || 1} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
