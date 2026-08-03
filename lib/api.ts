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
  isTimeout: boolean;
  constructor(message: string, statusCode: number, isTimeout = false) {
    super(message);
    this.statusCode = statusCode;
    this.isTimeout = isTimeout;
    this.name = "ApiError";
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRY_DELAY_MS = 400;

function isSafeMethod(method: string) {
  return method === "GET" || method === "HEAD";
}

function isRetryableStatus(status: number) {
  return status === 502 || status === 503 || status === 504;
}

function getTimeoutMessage() {
  return "The server is taking too long to respond. It may be waking up from a cold start. Please try again in a few seconds.";
}

function getRetryableStatusMessage(status: number) {
  if (status === 502 || status === 503 || status === 504) {
    return "The server is temporarily unavailable. Please try again in a moment.";
  }
  return `Request failed with status ${status}`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const externalSignal = init.signal;
  let timedOut = false;

  if (externalSignal?.aborted) {
    controller.abort(externalSignal.reason);
  }

  const onAbort = () => controller.abort(externalSignal?.reason);

  if (externalSignal) {
    externalSignal.addEventListener("abort", onAbort, { once: true });
  }

  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (timedOut) {
      throw new ApiError(getTimeoutMessage(), 408, true);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", onAbort);
    }
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
  /** Abort and retry a request if the backend takes too long to respond. */
  timeoutMs?: number;
  /** Number of retries after the initial attempt. */
  retries?: number;
  /** Delay between retries in milliseconds. */
  retryDelayMs?: number;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const {
    auth = true,
    suppressAuthError,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    ...init
  } = options;
  const method = (init.method ?? "GET").toUpperCase();
  const maxRetries = retries ?? (isSafeMethod(method) ? 1 : 0);

  const doFetch = async (token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string>),
    };
    if (auth && token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return fetchWithTimeout(`${API_BASE_URL}/api${path}`, {
      ...init,
      headers,
      cache: init.cache ?? "no-store",
    }, timeoutMs);
  };

  const token = auth ? await getAccessToken() : undefined;
  let currentToken = token;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    let res: Response;

    try {
      res = await doFetch(currentToken);
    } catch (error) {
      if (error instanceof ApiError && error.isTimeout && attempt < maxRetries) {
        await delay(retryDelayMs * (attempt + 1));
        continue;
      }
      throw error;
    }

    if (res.status === 401 && auth && currentToken) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        currentToken = refreshed;
        res = await doFetch(currentToken);
      }
    }

    if (isRetryableStatus(res.status) && attempt < maxRetries) {
      await delay(retryDelayMs * (attempt + 1));
      continue;
    }

    let json: ApiResponse<T> | undefined;
    try {
      json = await res.json();
    } catch {
      // no body
    }

    if (!res.ok || !json?.success) {
      const message =
        json?.message ?? getRetryableStatusMessage(res.status);
      if (res.status === 401 && !suppressAuthError) {
        await clearSession();
      }
      throw new ApiError(message, res.status, res.status === 408);
    }

    return json;
  }

  throw new ApiError(getTimeoutMessage(), 408, true);
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
