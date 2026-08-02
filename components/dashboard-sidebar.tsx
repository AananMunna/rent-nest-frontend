"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Users,
  Tags,
  UserCircle,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const NAV: Record<Role, { href: string; label: string; icon: React.ReactNode }[]> = {
  TENANT: [
    { href: "/dashboard/tenant", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
  ],
  LANDLORD: [
    { href: "/dashboard/landlord", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
    { href: "/dashboard/landlord/properties", label: "Properties", icon: <Building2 className="size-4" /> },
    { href: "/dashboard/landlord/requests", label: "Requests", icon: <ClipboardList className="size-4" /> },
  ],
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
    { href: "/dashboard/admin/users", label: "Users", icon: <Users className="size-4" /> },
    { href: "/dashboard/admin/properties", label: "Properties", icon: <Building2 className="size-4" /> },
    { href: "/dashboard/admin/rentals", label: "Rental Requests", icon: <ClipboardList className="size-4" /> },
    { href: "/dashboard/admin/categories", label: "Categories", icon: <Tags className="size-4" /> },
  ],
};

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = [
    ...NAV[role],
    { href: "/dashboard/profile", label: "Profile", icon: <UserCircle className="size-4" /> },
  ];

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
