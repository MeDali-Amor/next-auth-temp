# Next Auth Template

Opinionated authentication template built with Next.js (App Router), NextAuth (v5), Prisma and PostgreSQL.

This repository provides a full, production-oriented authentication workflow including:

-   Email + password (credentials) sign up and sign in
-   Social login (Google)
-   Email verification flow
-   Password reset flow
-   Two-factor authentication (backend + email 2FA token generation)
-   NextAuth configured with Prisma adapter (JWT sessions)
-   Protected routes via middleware and a small `routes.ts` helper
-   UI components and forms using React Hook Form + Zod for validation
-   Email sending via Resend

## Status

Partially complete. Core authentication flows are implemented (register, login, reset, verification, sign-out, social login, middleware protection). Backend support for two-factor authentication and email flows exists. Some UX, tests and production hardening remain.

## What is implemented (high level)

-   Next.js App Router project structure (under `app/`) with dedicated `(auth)` and `(private)` sections.
-   NextAuth configuration (`auth.ts` + `auth.config.ts`) using the Prisma adapter and providers (Google + Credentials).
-   Prisma schema with models: `User`, `Account`, `VerificationToken`, `ResetToken`, `TwoFactorToken`, `TwoFactorConfirmation` (`prisma/schema.prisma`).
-   Email helpers using Resend (`lib/mail.ts`) for verification, password reset and 2FA codes.
-   Tokens generation and helpers (`lib/tokens.ts`, `utils/token.ts`) and actions for register/login/reset/verification (`actions/`.
-   UI components for auth flows: `components/auth/*` (LoginForm, RegisterForm, ResetForm, UpdatePasswordForm, VerificationCard, Social buttons, etc.).
-   Middleware that protects private routes and redirects unauthenticated users (`middleware.ts`).
-   Basic styling with TailwindCSS and UI primitives in `components/ui/`.

Key files to inspect:

-   `auth.ts` — NextAuth initialization (callbacks, events, adapter)
-   `auth.config.ts` — providers and credentials logic
-   `prisma/schema.prisma` — data models
-   `lib/mail.ts` — email sending (Resend)
-   `lib/tokens.ts` and `utils/token.ts` — token creation/lookup
-   `actions/` — server actions used by forms (register, login, reset, verification, password-update)
-   `middleware.ts` — route protection
-   `app/(auth)` — auth UI pages

## Environment variables

This project expects several environment variables to be set (examples can be found in `.env`):

-   DATABASE_URL — PostgreSQL connection string used by Prisma
-   RESEND_API_KEY — API key for Resend (email sending)
-   RESEND_FROM — From address used by Resend
-   APP_URL — public base URL (used in email links)
-   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET — for Google OAuth
-   NEXTAUTH_SECRET — recommended for NextAuth (JWT signing)
-   NEXTAUTH_URL — application URL (especially for production)

Make sure to create a `.env` file with these values before running the project locally.

## How to run (local development)

1. Install dependencies

```bash
npm install
```

2. Create your `.env` file (see the repository `.env` for example values)

3. Generate Prisma client and run migrations (or use `prisma db push` during early development):

```bash
npx prisma generate
# create and apply a migration
npx prisma migrate dev --name init
```

4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Known TODOs / Improvements

-   Add comprehensive unit and integration tests (auth flows, edge cases).
-   Add stronger production-ready email templates and i18n support.
-   Improve 2FA UX: there is backend support for 2FA tokens, but the full client-side flow/UI could be expanded.
-   Implement rate limiting / brute-force protection for login and token endpoints.
-   Add logging and observability (request tracing, error tracking).
-   Add CI (lint, typecheck, tests, migration checks) and deployment scripts.
-   Consider session refresh / token rotation or refresh token support if you need long sessions.

## Architecture notes

-   NextAuth uses the Prisma adapter and JWT session strategy (see `auth.ts`). The sign-in callback enforces email verification for credential-provider sign-ins and verifies 2FA confirmation if enabled.
-   Tokens (verification/reset/2FA) are stored in Prisma models and emailed via `lib/mail.ts`.
-   The middleware (`middleware.ts`) uses the auth handler to protect routes and redirects unauthenticated users to `/login`. Default successful-login redirect is `/settings` (see `routes.ts`).

## Contribution

PRs are welcome. If you plan to add features, open an issue or draft a PR describing the change and any migration steps (Prisma schema updates).

## Quick checklist for production readiness

-   Provide production values for all env vars (DB, Resend, OAuth secrets, NEXTAUTH_SECRET)
-   Ensure migrations are applied on deploy
-   Review email deliverability (use proper from addresses / domain / DKIM)
-   Add monitoring and error tracking
-   Harden security (rate limits, secure headers, CSP)

---

If you want, I can:

-   add a short `.env.example` file listing required variables,
-   create a CONTRIBUTING.md with development guidelines,
-   or implement missing 2FA UI flows.

Which of those would you like next?
