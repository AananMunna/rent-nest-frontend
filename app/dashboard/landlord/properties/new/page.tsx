import { requireUser } from "@/actions/auth.actions";
import { getCategories } from "@/actions/category.actions";
import { createPropertyAction } from "@/actions/property.actions";
import { PropertyForm } from "@/components/property-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NewPropertyPage() {
  await requireUser(["LANDLORD"]);
  const categories = await getCategories();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">List a new property</h1>
      <p className="text-muted-foreground mt-1">Fill in the details tenants will see.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Property details</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm categories={categories} action={createPropertyAction} submitLabel="Create property" />
        </CardContent>
      </Card>
    </div>
  );
}
