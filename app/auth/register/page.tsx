"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Home, User, Building2 } from "lucide-react";
import { registerAction, ActionState } from "@/actions/auth.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/components/auth-form-message";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const initialState: ActionState = { success: false };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);
  const [role, setRole] = useState<Role>("TENANT");
  useActionToast(state);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6 flex items-center gap-2 text-xl font-bold">
        <Home className="size-6 text-primary" />
        RentNest
      </Link>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join RentNest as a tenant or a landlord.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="role" value={role} />

            <div className="space-y-2">
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                <RoleOption
                  active={role === "TENANT"}
                  onClick={() => setRole("TENANT")}
                  icon={<User className="size-5" />}
                  label="Tenant"
                  desc="Looking to rent"
                />
                <RoleOption
                  active={role === "LANDLORD"}
                  onClick={() => setRole("LANDLORD")}
                  icon={<Building2 className="size-5" />}
                  label="Landlord"
                  desc="Listing properties"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" placeholder="Jane Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+1 555 123 4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="At least 6 characters" required />
            </div>
            <SubmitButton className="w-full" size="lg" pendingText="Creating account...">
              Create account
            </SubmitButton>
          </form>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function RoleOption({
  active,
  onClick,
  icon,
  label,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors",
        active ? "border-primary bg-accent" : "hover:bg-muted",
      )}
    >
      <div className={cn(active ? "text-primary" : "text-muted-foreground")}>{icon}</div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-muted-foreground text-xs">{desc}</p>
    </button>
  );
}
