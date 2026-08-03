import "server-only";
import { ApiResponse } from "@/types";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearSession,
} from "@/lib/session";

function normalizeApiBaseUrl(value: string) {
  return value.replace(/\/+$/, "").replace(/\/api$/, "");
}

export const API_BASE_URL = normalizeApiBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000",
);

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

async function tryRefreshToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok || !json.success) return null;

    const newAccessToken = json.data?.accessToken as string;
    if (newAccessToken) {
      await setAccessToken(newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch {
    return null;
  }
}

interface FetchOptions extends RequestInit {
  /** Skip attaching the Authorization header (for public endpoints). */
  auth?: boolean;
  /** Skip auto-redirect-worthy throw on 401 (caller handles it). */
  suppressAuthError?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { auth = true, suppressAuthError, ...init } = options;

  const doFetch = async (token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string>),
    };
    if (auth && token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return fetch(`${API_BASE_URL}/api${path}`, {
      ...init,
      headers,
      cache: init.cache ?? "no-store",
    });
  };

  const token = auth ? await getAccessToken() : undefined;
  let res = await doFetch(token);

  if (res.status === 401 && auth && token) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      res = await doFetch(refreshed);
    }
  }

  let json: ApiResponse<T> | undefined;
  try {
    json = await res.json();
  } catch {
    // no body
  }

  if (!res.ok || !json?.success) {
    const message = json?.message ?? `Request failed with status ${res.status}`;
    if (res.status === 401 && !suppressAuthError) {
      await clearSession();
    }
    throw new ApiError(message, res.status);
  }

  return json;
}

export function toQueryString(params: Record<string, unknown>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}
