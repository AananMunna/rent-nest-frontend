import { requireUser } from "@/actions/auth.actions";
import { getCategories } from "@/actions/category.actions";
import { CategoryManager } from "@/components/category-manager";

export default async function AdminCategoriesPage() {
  await requireUser(["ADMIN"]);
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
      <p className="text-muted-foreground mt-1">Manage property categories used across listings.</p>

      <div className="mt-6">
        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
