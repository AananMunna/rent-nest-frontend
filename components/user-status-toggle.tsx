"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2, ShieldBan, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserStatusAction } from "@/actions/admin.actions";
import type { ActiveStatus } from "@/types";

export function UserStatusToggle({ userId, status }: { userId: string; status: ActiveStatus }) {
  const [isPending, startTransition] = useTransition();
  const isBlocked = status === "BLOCKED";

  function handleClick() {
    startTransition(async () => {
      try {
        await updateUserStatusAction(userId, isBlocked ? "ACTIVE" : "BLOCKED");
        toast.success(isBlocked ? "User unbanned." : "User banned.");
      } catch {
        toast.error("Could not update user.");
      }
    });
  }

  return (
    <Button
      size="sm"
      variant={isBlocked ? "outline" : "destructive"}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isBlocked ? (
        <ShieldCheck className="size-4" />
      ) : (
        <ShieldBan className="size-4" />
      )}
      {isBlocked ? "Unban" : "Ban"}
    </Button>
  );
}
