"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { Review } from "@/types";
import { ActionState } from "@/actions/auth.actions";

export async function getPropertyReviews(propertyId: string) {
  const res = await apiFetch<Review[]>(`/reviews/property/${propertyId}`, { auth: false });
  return res.data;
}

export async function createReviewAction(
  rentalRequestId: string,
  propertyId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rating = Number(formData.get("rating") ?? 0);
  const comment = String(formData.get("comment") ?? "").trim();

  if (!rating || rating < 1 || rating > 5) {
    return { success: false, message: "Please select a rating between 1 and 5." };
  }
  if (!comment) {
    return { success: false, message: "Please write a short review." };
  }

  try {
    await apiFetch("/reviews", {
      method: "POST",
      body: JSON.stringify({ rentalRequestId, propertyId, rating, comment }),
    });
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message };
    return { success: false, message: "Could not submit review." };
  }

  revalidatePath("/dashboard/tenant");
  revalidatePath(`/properties/${propertyId}`);
  return { success: true, message: "Thanks for your review!" };
}
