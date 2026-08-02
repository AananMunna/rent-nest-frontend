"use client";

import { useActionState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/components/auth-form-message";
import { createCategoryAction, deleteCategoryAction } from "@/actions/category.actions";
import type { ActionState } from "@/actions/auth.actions";
import type { Category } from "@/types";

const initialState: ActionState = { success: false };

export function CategoryManager({ categories }: { categories: Category[] }) {
  const [state, formAction] = useActionState(createCategoryAction, initialState);
  useActionToast(state);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="pt-5">
          <h2 className="mb-4 font-semibold">Add category</h2>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Apartment" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} placeholder="Optional description" />
            </div>
            <SubmitButton pendingText="Adding...">
              <Plus className="size-4" />
              Add category
            </SubmitButton>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h2 className="mb-4 font-semibold">Existing categories</h2>
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-muted-foreground text-sm">No categories yet.</p>
            ) : (
              categories.map((c) => <CategoryRow key={c.id} category={c} />)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteCategoryAction(category.id);
        toast.success("Category deleted.");
      } catch {
        toast.error("Could not delete category — it may be in use.");
      }
    });
  }

  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2">
      <div>
        <p className="text-sm font-medium">{category.name}</p>
        {category.description && (
          <p className="text-muted-foreground text-xs line-clamp-1">{category.description}</p>
        )}
      </div>
      <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4 text-destructive" />}
      </Button>
    </div>
  );
}
