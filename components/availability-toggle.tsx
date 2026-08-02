"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { togglePropertyAvailabilityAction } from "@/actions/property.actions";

export function AvailabilityToggle({
  propertyId,
  isAvailable,
}: {
  propertyId: string;
  isAvailable: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(checked: boolean) {
    startTransition(async () => {
      try {
        await togglePropertyAvailabilityAction(propertyId, checked);
        toast.success(checked ? "Marked as available." : "Marked as unavailable.");
      } catch {
        toast.error("Could not update availability.");
      }
    });
  }

  return <Switch checked={isAvailable} onCheckedChange={handleChange} disabled={isPending} />;
}
