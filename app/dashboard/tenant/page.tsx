import Link from "next/link";
import Image from "next/image";
import { requireUser } from "@/actions/auth.actions";
import { getMyRentalRequests } from "@/actions/rental.actions";
import { getPaymentHistory } from "@/actions/payment.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { RentalStatusBadge, PaymentStatusBadge } from "@/components/status-badge";
import { PayNowButton } from "@/components/pay-now-button";
import { LeaveReviewDialog } from "@/components/leave-review-dialog";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function TenantDashboardPage() {
  await requireUser(["TENANT"]);

  const [requests, payments] = await Promise.all([
    getMyRentalRequests(),
    getPaymentHistory().catch(() => []),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">My rentals</h1>
      <p className="text-muted-foreground mt-1">
        Track your rental requests and payment history.
      </p>

      <Tabs defaultValue="requests" className="mt-6">
        <TabsList>
          <TabsTrigger value="requests">Rental requests</TabsTrigger>
          <TabsTrigger value="payments">Payment history</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-4 space-y-4">
          {requests.length === 0 ? (
            <EmptyState text="You haven't requested any rentals yet." href="/properties" cta="Browse properties" />
          ) : (
            requests.map((r) => (
              <Card key={r.id}>
                <CardContent className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={r.property.images?.[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200"}
                      alt={r.property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/properties/${r.property.id}`} className="font-semibold hover:underline">
                      {r.property.title}
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      Move-in {formatDate(r.moveInDate)} &middot; {formatCurrency(r.property.price)}/mo
                    </p>
                    {r.message && (
                      <p className="text-muted-foreground mt-1 text-xs italic line-clamp-1">&ldquo;{r.message}&rdquo;</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <RentalStatusBadge status={r.status} />
                    {r.status === "APPROVED" && !r.payment && (
                      <PayNowButton rentalRequestId={r.id} />
                    )}
                    {(r.status === "ACTIVE" || r.status === "COMPLETED") && !r.review && (
                      <LeaveReviewDialog
                        rentalRequestId={r.id}
                        propertyId={r.property.id}
                        propertyTitle={r.property.title}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="payments" className="mt-4 space-y-4">
          {payments.length === 0 ? (
            <EmptyState text="No payments yet." href="/dashboard/tenant" cta="View requests" />
          ) : (
            payments.map((p) => (
              <Card key={p.id}>
                <CardContent className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">
                      {p.rentalRequest?.property?.title ?? "Property"}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {p.transactionId} &middot; {formatDate(p.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{formatCurrency(p.amount, p.currency)}</span>
                    <PaymentStatusBadge status={p.status} />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="rounded-xl border border-dashed py-16 text-center">
      <p className="text-muted-foreground">{text}</p>
      <Link href={href} className="text-primary mt-2 inline-block text-sm font-medium hover:underline">
        {cta} &rarr;
      </Link>
    </div>
  );
}
