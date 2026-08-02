"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { Payment } from "@/types";

export async function getPaymentHistory() {
  const res = await apiFetch<Payment[]>("/payments");
  return res.data;
}

export async function getPaymentById(id: string) {
  const res = await apiFetch<Payment>(`/payments/${id}`);
  return res.data;
}

/** Creates (or fetches existing) Stripe checkout session and redirects to it. */
export async function startCheckoutAction(rentalRequestId: string) {
  let gatewayUrl: string | null = null;
  try {
    const res = await apiFetch<Payment>("/payments/create", {
      method: "POST",
      body: JSON.stringify({ rentalRequestId }),
    });
    gatewayUrl = res.data.gatewayUrl ?? null;
  } catch (error) {
    if (error instanceof ApiError) {
      redirect(`/dashboard/tenant?paymentError=${encodeURIComponent(error.message)}`);
    }
    throw error;
  }

  if (!gatewayUrl) {
    redirect("/dashboard/tenant?paymentError=Could not start checkout");
  }

  redirect(gatewayUrl);
}

export async function confirmPaymentAction(paymentId: string, status: "COMPLETED" | "FAILED") {
  await apiFetch("/payments/confirm", {
    method: "POST",
    body: JSON.stringify({ paymentId, status }),
  });
  revalidatePath("/dashboard/tenant");
  revalidatePath("/payments");
}
