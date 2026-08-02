"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, toQueryString, ApiError } from "@/lib/api";
import { Property, ApiMeta } from "@/types";
import { ActionState } from "@/actions/auth.actions";

export interface PropertyFilters {
  searchTerm?: string;
  categoryId?: string;
  city?: string;
  location?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  isAvailable?: string | boolean;
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getProperties(filters: PropertyFilters = {}) {
  const qs = toQueryString(filters as Record<string, unknown>);
  const res = await apiFetch<Property[]>(`/properties${qs}`, { auth: false });
  return { data: res.data, meta: res.meta as ApiMeta };
}

export async function getPropertyById(id: string) {
  const res = await apiFetch<Property>(`/properties/${id}`, { auth: false });
  return res.data;
}

export async function getMyProperties() {
  const res = await apiFetch<Property[]>("/landlord/properties/mine");
  return res.data;
}

function propertyPayloadFromForm(formData: FormData) {
  const amenities = String(formData.get("amenities") ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const images = String(formData.get("images") ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    price: Number(formData.get("price") ?? 0),
    location: String(formData.get("location") ?? ""),
    city: String(formData.get("city") ?? ""),
    area: String(formData.get("area") ?? ""),
    bedrooms: Number(formData.get("bedrooms") ?? 1),
    bathrooms: Number(formData.get("bathrooms") ?? 1),
    amenities,
    images,
    categoryId: String(formData.get("categoryId") ?? ""),
    isAvailable: formData.get("isAvailable") === "on",
  };
}

export async function createPropertyAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = propertyPayloadFromForm(formData);

  if (!payload.title || !payload.description || !payload.categoryId || !payload.price) {
    return { success: false, message: "Please fill in all required fields." };
  }

  try {
    await apiFetch("/landlord/properties", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message };
    return { success: false, message: "Could not create property." };
  }

  revalidatePath("/dashboard/landlord/properties");
  revalidatePath("/properties");
  return { success: true, message: "Property created successfully." };
}

export async function updatePropertyAction(
  propertyId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = propertyPayloadFromForm(formData);

  try {
    await apiFetch(`/landlord/properties/${propertyId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message };
    return { success: false, message: "Could not update property." };
  }

  revalidatePath("/dashboard/landlord/properties");
  revalidatePath(`/properties/${propertyId}`);
  return { success: true, message: "Property updated successfully." };
}

export async function deletePropertyAction(propertyId: string) {
  await apiFetch(`/landlord/properties/${propertyId}`, { method: "DELETE" });
  revalidatePath("/dashboard/landlord/properties");
  revalidatePath("/properties");
}

export async function togglePropertyAvailabilityAction(
  propertyId: string,
  isAvailable: boolean,
) {
  await apiFetch(`/landlord/properties/${propertyId}`, {
    method: "PUT",
    body: JSON.stringify({ isAvailable }),
  });
  revalidatePath("/dashboard/landlord/properties");
}
