import { Building2, ClipboardList, Wallet, Star } from "lucide-react";
import { requireUser } from "@/actions/auth.actions";
import { getMyProperties } from "@/actions/property.actions";
import { getLandlordRequests } from "@/actions/rental.actions";
import { StatCard } from "@/components/stat-card";
import { RentalStatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function LandlordOverviewPage() {
  const user = await requireUser(["LANDLORD"]);

  const [properties, requests] = await Promise.all([
    getMyProperties(),
    getLandlordRequests(),
  ]);

  const activeRequests = requests.filter((r) => r.status === "PENDING").length;
  const earnings = requests
    .filter((r) => r.payment?.status === "COMPLETED")
    .reduce((sum, r) => sum + (r.payment?.amount ?? 0), 0);
  const avgRating =
    properties.reduce((sum, p) => sum + (p._count?.reviews ? 1 : 0), 0) > 0
      ? "—"
      : "—";

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="text-muted-foreground mt-1">Here&apos;s how your properties are performing.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Building2 className="size-5" />} label="Total properties" value={properties.length} />
        <StatCard icon={<ClipboardList className="size-5" />} label="Pending requests" value={activeRequests} />
        <StatCard icon={<Wallet className="size-5" />} label="Total earnings" value={formatCurrency(earnings)} />
        <StatCard icon={<Star className="size-5" />} label="Avg. rating" value={avgRating} />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Recent requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-muted-foreground text-sm">No requests yet.</p>
          ) : (
            requests.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">
                    {r.tenant.name} &middot;{" "}
                    <Link href={`/properties/${r.property.id}`} className="hover:underline">
                      {r.property.title}
                    </Link>
                  </p>
                  <p className="text-muted-foreground text-xs">{formatDate(r.createdAt)}</p>
                </div>
                <RentalStatusBadge status={r.status} />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
