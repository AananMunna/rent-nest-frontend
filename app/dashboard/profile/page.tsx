import { getMyProfile } from "@/actions/user.actions";
import { ProfileForm } from "@/components/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const profile = await getMyProfile();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Profile settings</h1>
      <p className="text-muted-foreground mt-1">Manage your personal information.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Your details</CardTitle>
          <CardDescription>{profile.email} &middot; {profile.role}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
