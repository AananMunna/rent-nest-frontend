"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { User } from "@/types";
import { ActionState } from "@/actions/auth.actions";

export async function getMyProfile() {
  const res = await apiFetch<{ profile: User }>("/users/me");
  return res.data.profile;
}

export async function updateMyProfileAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    name: String(formData.get("name") ?? "").trim() || undefined,
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    address: String(formData.get("address") ?? "").trim() || undefined,
    bio: String(formData.get("bio") ?? "").trim() || undefined,
    avatarUrl: String(formData.get("avatarUrl") ?? "").trim() || undefined,
  };

  try {
    await apiFetch("/users/my-profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message };
    return { success: false, message: "Could not update profile." };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Profile updated." };
}
