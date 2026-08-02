"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/components/auth-form-message";
import type { ActionState } from "@/actions/auth.actions";
import type { Category, Property } from "@/types";

const initialState: ActionState = { success: false };

export function PropertyForm({
  categories,
  property,
  action,
  submitLabel = "Create property",
}: {
  categories: Category[];
  property?: Property;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, initialState);
  useActionToast(state);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" name="title" defaultValue={property?.title} placeholder="Sunny 2BR near downtown" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={property?.description}
          rows={4}
          placeholder="Describe the property..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price per month (USD) *</Label>
          <Input id="price" name="price" type="number" min={0} defaultValue={property?.price} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <Select name="categoryId" defaultValue={property?.categoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Radix Select isn't a native form control by default; mirror value via hidden input */}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input id="location" name="location" defaultValue={property?.location} placeholder="Street / neighborhood" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={property?.city ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input id="area" name="area" defaultValue={property?.area ?? ""} placeholder="e.g. 950 sqft" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" name="bedrooms" type="number" min={0} defaultValue={property?.bedrooms ?? 1} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" name="bathrooms" type="number" min={0} defaultValue={property?.bathrooms ?? 1} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
        <Input
          id="amenities"
          name="amenities"
          defaultValue={property?.amenities?.join(", ") ?? ""}
          placeholder="WiFi, Parking, Air Conditioning"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Image URLs (comma-separated)</Label>
        <Textarea
          id="images"
          name="images"
          defaultValue={property?.images?.join(", ") ?? ""}
          rows={2}
          placeholder="https://..., https://..."
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <Label htmlFor="isAvailable">Available for rent</Label>
          <p className="text-muted-foreground text-xs">Turn off to hide this listing temporarily.</p>
        </div>
        <Switch id="isAvailable" name="isAvailable" defaultChecked={property?.isAvailable ?? true} />
      </div>

      <SubmitButton size="lg" pendingText="Saving...">
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
