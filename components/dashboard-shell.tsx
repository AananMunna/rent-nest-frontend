"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { initials } from "@/lib/utils";
import type { User } from "@/types";

export function DashboardShell() {
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

  if (user === undefined) {
    return (
      <aside className="space-y-6">
        <div className="flex items-center gap-3 rounded-lg border p-3 animate-pulse">
          <div className="size-10 rounded-full bg-muted" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>
        <div className="space-y-1 rounded-lg border p-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 rounded-lg bg-muted" />
          ))}
        </div>
      </aside>
    );
  }

  if (!user) {
    return (
      <aside className="space-y-6">
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium">Session unavailable</p>
          <p className="text-muted-foreground mt-1 text-xs">
            Please log in again to access your dashboard.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      <div className="flex items-center gap-3 rounded-lg border p-3">
        <Avatar>
          <AvatarImage src={user.avatarUrl ?? undefined} />
          <AvatarFallback>{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="text-muted-foreground truncate text-xs capitalize">
            {user.role.toLowerCase()}
          </p>
        </div>
      </div>
      <DashboardSidebar role={user.role} />
    </aside>
  );
}