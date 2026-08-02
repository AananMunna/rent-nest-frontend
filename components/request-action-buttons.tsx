"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateLandlordRequestAction } from "@/actions/rental.actions";

export function RequestActionButtons({ requestId }: { requestId: string }) {
  const [isPending, startTransition] = useTransition();

  function act(status: "APPROVED" | "REJECTED") {
    startTransition(async () => {
      try {
        await updateLandlordRequestAction(requestId, status);
        toast.success(status === "APPROVED" ? "Request approved." : "Request rejected.");
      } catch {
        toast.error("Could not update request.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" onClick={() => act("APPROVED")} disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
        Approve
      </Button>
      <Button size="sm" variant="outline" onClick={() => act("REJECTED")} disabled={isPending}>
        <X className="size-4" />
        Reject
      </Button>
    </div>
  );
}
