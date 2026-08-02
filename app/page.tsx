import Link from "next/link";
import { Search, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertyCard } from "@/components/property-card";
import { getProperties } from "@/actions/property.actions";
import { getCategories } from "@/actions/category.actions";
import { Badge } from "@/components/ui/badge";

export default async function HomePage() {
  const [{ data: properties }, categories] = await Promise.all([
    getProperties({ limit: 6, sortBy: "createdAt", sortOrder: "desc" }),
    getCategories().catch(() => []),
  ]);

  return (
    <div>
      <section className="bg-noise relative overflow-hidden border-b bg-gradient-to-b from-accent/40 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="size-3.5" /> Rental marketplace, reimagined
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Find your next home, <span className="text-primary">without the hassle</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-balance text-lg">
              Browse verified rental listings, request move-ins, and pay securely — all
              in one place.
            </p>

            <form action="/properties" className="mx-auto mt-8 flex max-w-xl gap-2">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  name="searchTerm"
                  placeholder="Search by city, area, or property name..."
                  className="h-11 pl-9"
                />
              </div>
              <Button size="lg" type="submit">
                Search
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {categories.slice(0, 6).map((c) => (
                <Button key={c.id} asChild variant="outline" size="sm">
                  <Link href={`/properties?categoryId=${c.id}`}>{c.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <Feature
            icon={<Search className="size-5" />}
            title="Advanced search"
            desc="Filter by price, location, category, and amenities to find exactly what you need."
          />
          <Feature
            icon={<ShieldCheck className="size-5" />}
            title="Verified landlords"
            desc="Every listing is tied to a real, accountable landlord profile."
          />
          <Feature
            icon={<Wallet className="size-5" />}
            title="Secure payments"
            desc="Pay your approved rental securely through Stripe checkout."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured properties</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Freshly listed homes handpicked for you.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/properties">View all &rarr;</Link>
          </Button>
        </div>

        {properties.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">
            No properties available right now. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border p-6">
      <div className="bg-accent text-accent-foreground mb-4 flex size-10 items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{desc}</p>
    </div>
  );
}
