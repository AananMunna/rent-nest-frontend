import { getCurrentUser } from "@/actions/auth.actions";

export async function GET() {
  const user = await getCurrentUser();
  return Response.json({ user });
}