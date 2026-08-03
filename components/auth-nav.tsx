"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogoutMenuItem } from "@/components/logout-button";
import { initials } from "@/lib/utils";
import type { User } from "@/types";

const ROLE_HOME: Record<string, string> = {
  TENANT: "/dashboard/tenant",
  LANDLORD: "/dashboard/landlord",
  ADMIN: "/dashboard/admin",
};

export function AuthNav() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;

    async function loadUser() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const json = (await res.json()) as { user: User | null };
        if (alive) setUser(json.user ?? null);
      } catch {
        if (alive) setUser(null);
      }
    }

    loadUser();

    return () => {
      alive = false;
    };
  }, []);

  if (user === undefined || !user) {
    return (
      <>
        <Button asChild variant="ghost" size="sm">
          <Link href="/auth/login">Log in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/auth/register">Get started</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
        <Link href={ROLE_HOME[user.role] ?? "/"}>
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <p className="truncate font-medium">{user.name}</p>
            <p className="text-muted-foreground truncate text-xs">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={ROLE_HOME[user.role] ?? "/"}>
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">Profile settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <LogoutMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}