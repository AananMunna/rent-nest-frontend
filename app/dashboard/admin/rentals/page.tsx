import Link from "next/link";
import { requireUser } from "@/actions/auth.actions";
import { getAllRentalRequestsAdmin } from "@/actions/admin.actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RentalStatusBadge, PaymentStatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/utils";

export default async function AdminRentalsPage() {
  await requireUser(["ADMIN"]);
  const rentals = await getAllRentalRequestsAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Rental requests</h1>
      <p className="text-muted-foreground mt-1">{rentals.length} requests across the platform</p>

      <div className="mt-6 rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Link href={`/properties/${r.property.id}`} className="font-medium hover:underline">
                    {r.property.title}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.tenant.name}</TableCell>
                <TableCell className="text-muted-foreground">{r.landlord.name}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(r.createdAt)}</TableCell>
                <TableCell>
                  <RentalStatusBadge status={r.status} />
                </TableCell>
                <TableCell>
                  {r.payment ? <PaymentStatusBadge status={r.payment.status} /> : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
