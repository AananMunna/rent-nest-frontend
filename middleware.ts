import { NextRequest, NextResponse } from "next/server";

const ROLE_HOME: Record<string, string> = {
  TENANT: "/dashboard/tenant",
  LANDLORD: "/dashboard/landlord",
  ADMIN: "/dashboard/admin",
};

const ACCESS_COOKIE = "rn_access_token";
const REFRESH_COOKIE = "rn_refresh_token";

function decodeRole(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8"),
    );
    return json.role ?? null;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("rn_access_token")?.value;
  const role = token ? decodeRole(token) : null;

  const isAuthRoute = pathname.startsWith("/auth");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute && (!token || !role)) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    const response = NextResponse.redirect(url);
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }

  if (isDashboardRoute && role) {
    if (pathname.startsWith("/dashboard/tenant") && role !== "TENANT") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (pathname.startsWith("/dashboard/landlord") && role !== "LANDLORD") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (isAuthRoute && token && role) {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
