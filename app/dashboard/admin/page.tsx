import { Users, Building2, ClipboardList } from "lucide-react";
import { requireUser } from "@/actions/auth.actions";
import {
  getAllUsersAdmin,
  getAllPropertiesAdmin,
  getAllRentalRequestsAdmin,
} from "@/actions/admin.actions";
import { StatCard } from "@/components/stat-card";

export default async function AdminOverviewPage() {
  const user = await requireUser(["ADMIN"]);

  const [users, properties, rentals] = await Promise.all([
    getAllUsersAdmin({ limit: 1 }),
    getAllPropertiesAdmin({ limit: 1 }),
    getAllRentalRequestsAdmin().catch(() => []),
  ]);

  const pending = rentals.filter((r) => r.status === "PENDING").length;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        Welcome back, {user.name.split(" ")[0]}
      </h1>
      <p className="text-muted-foreground mt-1">Platform-wide overview.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Users className="size-5" />}
          label="Total users"
          value={users.meta?.total ?? 0}
        />
        <StatCard
          icon={<Building2 className="size-5" />}
          label="Total properties"
          value={properties.meta?.total ?? 0}
        />
        <StatCard
          icon={<ClipboardList className="size-5" />}
          label="Pending requests"
          value={pending}
        />
      </div>
    </div>
  );
}
