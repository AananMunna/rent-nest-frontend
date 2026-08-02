import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, MapPin, Ruler, Mail, Phone } from "lucide-react";
import { getPropertyById } from "@/actions/property.actions";
import { getPropertyReviews } from "@/actions/review.actions";
import { getCurrentUser } from "@/actions/auth.actions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarDisplay } from "@/components/star-rating";
import { ReviewList } from "@/components/review-list";
import { RequestRentalDialog } from "@/components/request-rental-dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency, initials } from "@/lib/utils";
import { PropertyStatusBadge } from "@/components/status-badge";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [property, reviews, user] = await Promise.all([
    getPropertyById(id).catch(() => null),
    getPropertyReviews(id).catch(() => []),
    getCurrentUser(),
  ]);

  if (!property) notFound();

  const images = property.images.length ? property.images : [FALLBACK_IMAGE];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const canRequest = !user || user.role === "TENANT";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {property.category?.name && <Badge variant="secondary">{property.category.name}</Badge>}
            <PropertyStatusBadge status={property.status} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="size-4" />
            {property.location}
            {property.city ? `, ${property.city}` : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="text-primary text-3xl font-bold">
            {formatCurrency(property.price)}
            <span className="text-muted-foreground text-base font-normal"> /mo</span>
          </p>
          {reviews.length > 0 && (
            <div className="mt-1 flex items-center justify-end gap-1.5">
              <StarDisplay rating={avgRating} />
              <span className="text-muted-foreground text-sm">
                ({reviews.length} review{reviews.length > 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl">
        <div className="relative col-span-4 aspect-[16/9] sm:col-span-3 sm:row-span-2 sm:aspect-auto">
          <Image src={images[0]} alt={property.title} fill className="object-cover" priority />
        </div>
        {images.slice(1, 3).map((img, i) => (
          <div key={i} className="relative hidden aspect-square sm:block">
            <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="flex flex-wrap gap-6 rounded-xl border p-5">
            <Stat icon={<BedDouble className="size-5" />} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={<Bath className="size-5" />} label="Bathrooms" value={property.bathrooms} />
            {property.area && (
              <Stat icon={<Ruler className="size-5" />} label="Area" value={property.area} />
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">About this property</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {property.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <Badge key={a} variant="outline">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div>
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="mt-4">
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Listed by</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={property.landlord?.avatarUrl ?? undefined} />
                  <AvatarFallback>{initials(property.landlord?.name ?? "L")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{property.landlord?.name}</p>
                  <p className="text-muted-foreground text-xs">Landlord</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                {property.landlord?.email && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4" /> {property.landlord.email}
                  </p>
                )}
                {property.landlord?.phone && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4" /> {property.landlord.phone}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {canRequest ? (
            user ? (
              property.isAvailable ? (
                <RequestRentalDialog propertyId={property.id} />
              ) : (
                <Button size="lg" className="w-full" disabled>
                  Currently unavailable
                </Button>
              )
            ) : (
              <Button asChild size="lg" className="w-full">
                <Link href={`/auth/login?next=/properties/${property.id}`}>
                  Log in to request this rental
                </Link>
              </Button>
            )
          ) : (
            <p className="text-muted-foreground text-center text-sm">
              Only tenants can submit rental requests.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{value}</p>
        <p className="text-muted-foreground text-xs">{label}</p>
      </div>
    </div>
  );
}
