"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutMenuItem() {
  return (
    <form action={logoutAction} className="w-full">
      <DropdownMenuItem asChild variant="destructive">
        <button type="submit" className="w-full cursor-pointer">
          <LogOut className="size-4" />
          Log out
        </button>
      </DropdownMenuItem>
    </form>
  );
}
