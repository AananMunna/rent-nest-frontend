import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, MessageSquare } from "lucide-react";
import { requireUser } from "@/actions/auth.actions";
import { getMyProperties } from "@/actions/property.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeletePropertyButton } from "@/components/delete-property-button";
import { AvailabilityToggle } from "@/components/availability-toggle";
import { formatCurrency } from "@/lib/utils";

export default async function LandlordPropertiesPage() {
  await requireUser(["LANDLORD"]);
  const properties = await getMyProperties();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My properties</h1>
          <p className="text-muted-foreground mt-1">Manage your listings and availability.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/landlord/properties/new">
            <Plus className="size-4" />
            New property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border border-dashed py-20 text-center">
          <p className="text-muted-foreground">You haven&apos;t listed any properties yet.</p>
          <Button asChild variant="link">
            <Link href="/dashboard/landlord/properties/new">Create your first listing &rarr;</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={p.images?.[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200"}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/properties/${p.id}`} className="font-semibold hover:underline">
                    {p.title}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {formatCurrency(p.price)}/mo &middot; {p.location}
                  </p>
                  <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                    <MessageSquare className="size-3" />
                    {p._count?.rentalRequests ?? 0} requests &middot; {p._count?.reviews ?? 0} reviews
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <AvailabilityToggle propertyId={p.id} isAvailable={p.isAvailable} />
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/dashboard/landlord/properties/${p.id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeletePropertyButton propertyId={p.id} title={p.title} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
