"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/submit-button";
import { createRentalRequestAction } from "@/actions/rental.actions";
import type { ActionState } from "@/actions/auth.actions";

const initialState: ActionState = { success: false };

export function RequestRentalDialog({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);
  const action = createRentalRequestAction.bind(null, propertyId);
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          <CalendarDays className="size-4" />
          Request to Rent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to rent this property</DialogTitle>
          <DialogDescription>
            Tell the landlord when you&apos;d like to move in. They&apos;ll review and
            approve or reject your request.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moveInDate">Move-in date *</Label>
              <Input id="moveInDate" name="moveInDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moveOutDate">Move-out date</Label>
              <Input id="moveOutDate" name="moveOutDate" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message to landlord</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Introduce yourself, mention move-in plans..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <SubmitButton pendingText="Submitting...">Submit request</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
