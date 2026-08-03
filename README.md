# RentNest Frontend

RentNest Frontend is a Next.js 16 application for a rental marketplace. It provides the public browsing experience, role-based dashboards, and server-driven communication with the RentNest backend API.

## Overview

This project is built as a frontend-for-backend layer around the RentNest API. Data fetching and mutations are handled through server actions and server components, while session state is stored in httpOnly cookies on the Next.js domain.

The application includes:

- public property discovery and detail pages
- tenant, landlord, and admin dashboards
- authentication flows for login and registration
- rental request management and payment flows
- profile management and moderation tools

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Radix UI primitives
- React Hook Form and Zod
- Sonner for notifications

## Project Structure

```text
app/          Application routes, layouts, and pages
actions/      Server actions for API communication
components/   Shared UI and feature components
lib/          API client, session helpers, and utilities
middleware.ts Route protection and auth redirects
types/        Shared TypeScript types
public/       Static assets
```

## Main Routes

- `/` Home page with featured listings and search
- `/properties` Property catalog with filters and pagination
- `/properties/[id]` Property details, reviews, and rental request flow
- `/auth/login` and `/auth/register` Authentication pages
- `/dashboard/tenant` Tenant dashboard
- `/dashboard/landlord` Landlord dashboard and property management
- `/dashboard/admin` Admin dashboard and moderation tools
- `/dashboard/profile` Shared profile settings
- `/payments` Payment return page

## How It Works

The frontend communicates with the backend through a server-side API layer:

- `lib/api.ts` attaches access tokens and refreshes them when needed
- `lib/session.ts` manages auth cookies for the Next.js application
- `middleware.ts` protects dashboard routes and handles role-based redirects

This approach keeps browser-to-backend traffic out of the client and centralizes auth handling in the Next.js app.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A running RentNest backend API

### Installation

```bash
npm install
```

### Environment Variables

Create a local environment file and set the backend URL:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

If the variable is omitted, the app falls back to `http://localhost:5000/api`.

### Development

```bash
npm run dev
```

The app will start in development mode with Next.js.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Notes

- The backend must be available before authentication and dashboard actions will work.
- Some pages expect seeded data, especially categories for property creation.
- Payment flows are designed to match the backend's checkout and confirmation endpoints.

## License

No license has been specified for this repository.
