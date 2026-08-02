"use client";

import { useActionState } from "react";
import { updateMyProfileAction } from "@/actions/user.actions";
import type { ActionState } from "@/actions/auth.actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/components/auth-form-message";
import type { User } from "@/types";

const initialState: ActionState = { success: false };

export function ProfileForm({ profile }: { profile: User }) {
  const [state, formAction] = useActionState(updateMyProfileAction, initialState);
  useActionToast(state);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" defaultValue={profile.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={profile.phone ?? ""} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar URL</Label>
        <Input id="avatarUrl" name="avatarUrl" defaultValue={profile.avatarUrl ?? ""} placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={profile.address ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" defaultValue={profile.bio ?? ""} rows={3} />
      </div>
      <SubmitButton pendingText="Saving...">Save changes</SubmitButton>
    </form>
  );
}
