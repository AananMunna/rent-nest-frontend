import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types";
import { formatCurrency } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop";

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images?.[0] || FALLBACK_IMAGE;

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="group overflow-hidden py-0 gap-0 transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={image}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {property.category?.name && (
              <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                {property.category.name}
              </Badge>
            )}
          </div>
          {!property.isAvailable && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive">Not available</Badge>
            </div>
          )}
        </div>
        <CardContent className="pt-4 pb-2">
          <p className="text-lg font-semibold leading-tight line-clamp-1">{property.title}</p>
          <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
            <MapPin className="size-3.5" />
            <span className="line-clamp-1">
              {property.location}
              {property.city ? `, ${property.city}` : ""}
            </span>
          </p>
          <div className="text-muted-foreground mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <BedDouble className="size-4" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="size-4" /> {property.bathrooms}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pb-4 pt-1">
          <p className="text-primary text-lg font-bold">
            {formatCurrency(property.price)}
            <span className="text-muted-foreground text-sm font-normal"> /mo</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
