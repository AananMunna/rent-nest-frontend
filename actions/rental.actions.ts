"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { RentalRequest, RentalRequestStatus } from "@/types";
import { ActionState } from "@/actions/auth.actions";

export async function getMyRentalRequests() {
  const res = await apiFetch<RentalRequest[]>("/rentals");
  return res.data;
}

export async function getRentalRequestById(id: string) {
  const res = await apiFetch<RentalRequest>(`/rentals/${id}`);
  return res.data;
}

export async function getLandlordRequests() {
  const res = await apiFetch<RentalRequest[]>("/landlord/requests");
  return res.data;
}

export async function createRentalRequestAction(
  propertyId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const moveInDate = String(formData.get("moveInDate") ?? "");
  const moveOutDate = String(formData.get("moveOutDate") ?? "");
  const message = String(formData.get("message") ?? "");

  if (!moveInDate) {
    return { success: false, message: "Please choose a move-in date." };
  }

  try {
    await apiFetch("/rentals", {
      method: "POST",
      body: JSON.stringify({
        propertyId,
        moveInDate,
        moveOutDate: moveOutDate || undefined,
        message: message || undefined,
      }),
    });
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message };
    return { success: false, message: "Could not submit rental request." };
  }

  revalidatePath("/dashboard/tenant");
  revalidatePath(`/properties/${propertyId}`);
  return { success: true, message: "Rental request submitted!" };
}

export async function updateLandlordRequestAction(
  requestId: string,
  status: RentalRequestStatus,
) {
  await apiFetch(`/landlord/requests/${requestId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  revalidatePath("/dashboard/landlord/requests");
  revalidatePath("/dashboard/tenant");
}
