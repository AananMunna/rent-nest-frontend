# RentNest — Frontend

Next.js 16 (App Router) frontend for the RentNest rental marketplace, built to consume
your existing `rent-nest-backend` Express/Prisma API.

## Stack

- **Next.js 16** App Router — no `src` directory, everything under `app/`
- **Server Components + Server Actions** for all data fetching and mutations (no client-side
  API calls, no React Query/SWR — the backend is only ever called from the server)
- **Tailwind CSS v4** + a hand-built shadcn/ui-style component kit (Radix primitives under
  `components/ui/`)
- **TypeScript**, `react-hook-form`/`zod` available if you want to extend validation

## Architecture: Next.js as a BFF

Instead of relying on cross-domain cookies (which is what broke login for you originally —
`SameSite=None` requires HTTPS), this frontend stores the backend's `accessToken` /
`refreshToken` in **its own httpOnly cookies** on the Next.js domain, and forwards
`Authorization: Bearer <token>` when calling your Express API from server actions/components.

- `lib/session.ts` — reads/writes the Next.js-side session cookies
- `lib/api.ts` — server-only fetch wrapper (`apiFetch`) that attaches the bearer token and
  auto-refreshes it on a 401 using your `/auth/refresh-token` endpoint
- `middleware.ts` — decodes the JWT (no signature check, just for UX) to gate `/dashboard/*`
  routes by role and redirect logged-in users away from `/auth/*`

This means: **the browser never talks to your Express backend directly.** All requests go
`Browser → Next.js server → Express API`. You don't need to touch your backend's CORS/cookie
config at all for this frontend to work — just make sure `NEXT_PUBLIC_API_BASE_URL` points at
it.

## Getting started

```bash
npm install
cp .env.example .env.local   # adjust NEXT_PUBLIC_API_BASE_URL if needed
npm run dev
```

Make sure your backend is running (default expected at `http://localhost:5000/api`) and that
you've seeded at least one `Category` — property creation requires a category to exist
(`/dashboard/admin/categories` lets an admin add one, or create it directly via your API/DB).

## Folder structure

```
app/
  layout.tsx, globals.css        # root shell, theme tokens
  page.tsx                       # home
  properties/                    # public browse + detail
  auth/login, auth/register/     # auth forms (client components, useActionState)
  payments/                      # Stripe success/cancel landing page
  dashboard/
    layout.tsx                   # role-aware sidebar shell
    profile/                     # shared profile settings
    tenant/                      # rental requests + payment history
    landlord/                    # overview, properties CRUD, requests
    admin/                       # overview, users, properties, rentals, categories
actions/                         # "use server" — one file per resource, talks to the API
components/
  ui/                            # shadcn-style primitives (button, card, dialog, table...)
  *.tsx                          # feature components (property-card, property-form, ...)
lib/
  api.ts                         # server fetch wrapper + auto refresh
  session.ts                     # cookie helpers
  utils.ts                       # cn(), formatCurrency, formatDate
types/index.ts                  # types mirroring your Prisma schema
middleware.ts                    # role-based route protection
```

## Routes implemented

| Route | Notes |
|---|---|
| `/` | Hero, search, featured properties |
| `/properties` | Filters (search, category, price, sort) + pagination |
| `/properties/[id]` | Gallery, amenities, reviews, "Request to Rent" dialog |
| `/auth/login`, `/auth/register` | Role selection on register (Tenant/Landlord) |
| `/dashboard/tenant` | Rental requests (Pay Now / Leave a review) + payment history tabs |
| `/dashboard/landlord` | Stats overview |
| `/dashboard/landlord/properties` | List, availability toggle, delete, edit |
| `/dashboard/landlord/properties/new`, `/[id]/edit` | Property form |
| `/dashboard/landlord/requests` | Approve / reject incoming requests |
| `/dashboard/admin` | Platform stats |
| `/dashboard/admin/users` | Table, search, pagination, ban/unban |
| `/dashboard/admin/properties`, `/rentals` | Moderation tables |
| `/dashboard/admin/categories` | Create/delete categories |
| `/dashboard/profile` | Shared profile editor (all roles) |
| `/payments` | Stripe success/cancel landing (matches your backend's redirect URL) |

## Notes / things to double check against your backend

- Your uploaded backend zip didn't yet include the `/auth/logout` route we discussed adding —
  the logout button calls it but silently ignores a failure, so it still works either way
  (it clears the local session cookies regardless).
- Admin endpoints (`/admin/users`, `/admin/properties`, `/admin/rentals`) and category
  create/delete are assumed at the paths your `admin.route.ts` / `category.route.ts` expose —
  adjust `actions/admin.actions.ts` / `actions/category.actions.ts` if your final route names
  differ.
- Stripe checkout: `startCheckoutAction` calls `POST /payments/create` and redirects to the
  returned `gatewayUrl`. The `/payments` page confirms the payment via
  `POST /payments/confirm` on return, matching your backend's redirect
  (`/payments?success=true&paymentId=...`).
