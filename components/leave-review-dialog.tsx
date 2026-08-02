"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { StarInput } from "@/components/star-rating";
import { createReviewAction } from "@/actions/review.actions";
import type { ActionState } from "@/actions/auth.actions";

const initialState: ActionState = { success: false };

export function LeaveReviewDialog({
  rentalRequestId,
  propertyId,
  propertyTitle,
}: {
  rentalRequestId: string;
  propertyId: string;
  propertyTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const action = createReviewAction.bind(null, rentalRequestId, propertyId);
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
        <Button variant="outline" size="sm">
          <Star className="size-4" />
          Leave a review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {propertyTitle}</DialogTitle>
          <DialogDescription>Share your experience for future tenants.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <StarInput name="rating" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Your review</Label>
            <Textarea id="comment" name="comment" rows={4} placeholder="How was your stay?" required />
          </div>
          <DialogFooter>
            <SubmitButton pendingText="Submitting...">Submit review</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
