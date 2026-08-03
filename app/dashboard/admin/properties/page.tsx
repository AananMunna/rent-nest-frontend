import Link from "next/link";
import { requireUser } from "@/actions/auth.actions";
import { getAllPropertiesAdmin } from "@/actions/admin.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyStatusBadge } from "@/components/status-badge";
import { PaginationBar } from "@/components/pagination-bar";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminPropertiesPage({ searchParams }: PageProps) {
  await requireUser(["ADMIN"]);
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const limit = 10;

  const { data: properties, meta } = await getAllPropertiesAdmin({
    page,
    limit,
  });
  const totalPages =
    meta?.totalPages ??
    Math.ceil((meta?.total ?? properties.length) / limit) ??
    1;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">All properties</h1>
      <p className="text-muted-foreground mt-1">
        {meta?.total ?? properties.length} listings across the platform
      </p>

      <div className="mt-6 rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Link
                    href={`/properties/${p.id}`}
                    className="font-medium hover:underline"
                  >
                    {p.title}
                  </Link>
                  <p className="text-muted-foreground text-xs">{p.location}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p.landlord?.name ?? "—"}
                </TableCell>
                <TableCell>{formatCurrency(p.price)}/mo</TableCell>
                <TableCell>
                  <PropertyStatusBadge status={p.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationBar page={page} totalPages={totalPages || 1} />
    </div>
  );
}
