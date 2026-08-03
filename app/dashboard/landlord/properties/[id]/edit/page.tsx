import { notFound } from "next/navigation";
import { requireUser } from "@/actions/auth.actions";
import { getCategories } from "@/actions/category.actions";
import {
  getPropertyById,
  updatePropertyAction,
} from "@/actions/property.actions";
import { PropertyForm } from "@/components/property-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser(["LANDLORD"]);
  const { id } = await params;

  const [categories, property] = await Promise.all([
    getCategories(),
    getPropertyById(id).catch(() => null),
  ]);

  if (!property || property.landlordId !== user.id) notFound();

  const boundAction = updatePropertyAction.bind(null, property.id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Edit property</h1>
      <p className="text-muted-foreground mt-1">Update your listing details.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Property details</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm
            categories={categories}
            property={property}
            action={boundAction}
            submitLabel="Save changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
