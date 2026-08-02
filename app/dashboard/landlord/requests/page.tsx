import Link from "next/link";
import { requireUser } from "@/actions/auth.actions";
import { getLandlordRequests } from "@/actions/rental.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RentalStatusBadge } from "@/components/status-badge";
import { RequestActionButtons } from "@/components/request-action-buttons";
import { formatDate, initials } from "@/lib/utils";

export default async function LandlordRequestsPage() {
  await requireUser(["LANDLORD"]);
  const requests = await getLandlordRequests();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Rental requests</h1>
      <p className="text-muted-foreground mt-1">Approve or reject incoming requests.</p>

      <div className="mt-6 space-y-4">
        {requests.length === 0 ? (
          <div className="rounded-xl border border-dashed py-20 text-center">
            <p className="text-muted-foreground">No rental requests yet.</p>
          </div>
        ) : (
          requests.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                <Avatar className="size-11">
                  <AvatarImage src={r.tenant.avatarUrl ?? undefined} />
                  <AvatarFallback>{initials(r.tenant.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{r.tenant.name}</p>
                  <Link href={`/properties/${r.property.id}`} className="text-primary text-sm hover:underline">
                    {r.property.title}
                  </Link>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Move-in {formatDate(r.moveInDate)}
                    {r.moveOutDate ? ` – ${formatDate(r.moveOutDate)}` : ""}
                  </p>
                  {r.message && (
                    <p className="text-muted-foreground mt-1 text-sm italic">&ldquo;{r.message}&rdquo;</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {r.status === "PENDING" ? (
                    <RequestActionButtons requestId={r.id} />
                  ) : (
                    <RentalStatusBadge status={r.status} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
