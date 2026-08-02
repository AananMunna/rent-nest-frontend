import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarDisplay } from "@/components/star-rating";
import { Review } from "@/types";
import { formatDate, initials } from "@/lib/utils";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground py-6 text-sm">
        No reviews yet. Be the first to review this property after your stay.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-3">
          <Avatar>
            <AvatarImage src={review.tenant?.avatarUrl ?? undefined} />
            <AvatarFallback>{initials(review.tenant?.name ?? "U")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{review.tenant?.name ?? "Tenant"}</p>
              <span className="text-muted-foreground text-xs">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <StarDisplay rating={review.rating} className="mt-1" />
            <p className="text-muted-foreground mt-2 text-sm">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
