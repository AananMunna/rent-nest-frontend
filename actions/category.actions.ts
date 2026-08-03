"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { Category } from "@/types";
import { ActionState } from "@/actions/auth.actions";

export async function getCategories() {
  const res = await apiFetch<Category[]>("/categories", {
    auth: false,
    cache: "force-cache",
  });
  return res.data;
}

export async function createCategoryAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (!name) return { success: false, message: "Category name is required." };

  try {
    await apiFetch("/categories", {
      method: "POST",
      body: JSON.stringify({ name, slug, description }),
    });
  } catch (error) {
    if (error instanceof ApiError) return { success: false, message: error.message };
    return { success: false, message: "Could not create category." };
  }

  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/properties");
  return { success: true, message: "Category created." };
}

export async function deleteCategoryAction(categoryId: string) {
  await apiFetch(`/categories/${categoryId}`, { method: "DELETE" });
  revalidatePath("/dashboard/admin/categories");
}
