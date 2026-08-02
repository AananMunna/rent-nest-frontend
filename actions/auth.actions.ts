"use server";

import { cache } from "react";
import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { setSession, clearSession, getAccessToken } from "@/lib/session";
import { User, Role } from "@/types";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "TENANT") as Role;
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !email || !password) {
    return { success: false, message: "Please fill in all required fields." };
  }
  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  try {
    await apiFetch("/auth/register", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ name, email, password, role, phone }),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }

  // Auto login right after registration.
  return loginAction(_prevState, formData);
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  let redirectTo = "/";

  try {
    const res = await apiFetch<{ accessToken: string; refreshToken: string }>(
      "/auth/login",
      {
        method: "POST",
        auth: false,
        body: JSON.stringify({ email, password }),
      },
    );

    await setSession(res.data.accessToken, res.data.refreshToken);

    const me = await getCurrentUserFresh();
    if (me?.role === "LANDLORD") redirectTo = "/dashboard/landlord";
    else if (me?.role === "ADMIN") redirectTo = "/dashboard/admin";
    else if (me?.role === "TENANT") redirectTo = "/dashboard/tenant";
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Login failed. Please try again." };
  }

  redirect(redirectTo);
}

export async function logoutAction() {
  try {
    await apiFetch("/auth/logout", { method: "POST", suppressAuthError: true });
  } catch {
    // ignore - clearing local session is what matters
  }
  await clearSession();
  redirect("/auth/login");
}

async function getCurrentUserFresh(): Promise<User | null> {
  try {
    const res = await apiFetch<{ user: User }>("/auth/me");
    return res.data.user;
  } catch {
    return null;
  }
}

/** Cached per-request lookup of the logged-in user (or null if not authenticated). */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const token = await getAccessToken();
  if (!token) return null;
  return getCurrentUserFresh();
});

export async function requireUser(allowed?: Role[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  if (allowed && !allowed.includes(user.role)) {
    redirect("/");
  }
  return user;
}
