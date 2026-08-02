"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, toQueryString } from "@/lib/api";
import { User, Property, RentalRequest, ApiMeta, ActiveStatus } from "@/types";

export async function getAllUsersAdmin(filters: { page?: number; limit?: number; searchTerm?: string } = {}) {
  const qs = toQueryString(filters as Record<string, unknown>);
  const res = await apiFetch<User[]>(`/admin/users${qs}`);
  return { data: res.data, meta: res.meta as ApiMeta };
}

export async function updateUserStatusAction(userId: string, activeStatus: ActiveStatus) {
  await apiFetch(`/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ activeStatus }),
  });
  revalidatePath("/dashboard/admin/users");
}

export async function getAllPropertiesAdmin(filters: { page?: number; limit?: number } = {}) {
  const qs = toQueryString(filters as Record<string, unknown>);
  const res = await apiFetch<Property[]>(`/admin/properties${qs}`);
  return { data: res.data, meta: res.meta as ApiMeta };
}

export async function getAllRentalRequestsAdmin() {
  const res = await apiFetch<RentalRequest[]>("/admin/rentals");
  return res.data;
}
