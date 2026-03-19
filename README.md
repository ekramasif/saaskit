# AI SaaS Kit

A production-oriented SaaS starter built with Next.js, Prisma, PostgreSQL, NextAuth, Stripe, and OpenRouter.

It includes:

- marketing pages, pricing, blog, and docs
- Google, GitHub, and email/password authentication
- role-based access control for admin features
- Stripe subscriptions for Free, Pro, and Business plans
- AI chat with usage credits and OpenRouter models
- email verification, welcome emails, and admin marketing emails
- a seeded Prisma schema for users, billing, content, and AI activity

## Tech Stack

| Area | Stack |
| --- | --- |
| App | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, Radix UI, Framer Motion |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth v5, Prisma adapter |
| Billing | Stripe |
| AI | OpenRouter |
| Email | Resend or SMTP via Nodemailer |
| Monitoring | Optional Sentry integration |

## Main Features

- Public website with homepage, pricing, blog, and docs
- Credentials auth with email verification
- Google and GitHub OAuth sign-in
- User dashboard and billing flows
- RBAC models for `USER`, `ADMIN`, and `SUPER_ADMIN`
- Stripe checkout, subscriptions, and webhook handling
- AI chat with model-based credit usage tracking
- PDF upload and summarization support in the data model
- Blog categories, tags, and publishing models
- Admin marketing email tools and recipient tracking

## Project Structure

```text
src/
  app/
    admin/                admin UI
    api/                  route handlers
    auth/                 auth pages
    blog/                 blog pages
    dashboard/            authenticated product UI
    docs/                 product documentation
    pricing/              pricing page
  components/             shared UI
  lib/                    auth, prisma, stripe, email, ai helpers
prisma/
  schema.prisma           database schema
  seed.ts                 starter data for roles, permissions, plans, categories, tags
vercel.json               Vercel build config
next.config.ts            Next.js config and optional Sentry wrapping
```

## Available Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run db:push
npm run db:seed
npm run db:studio
npm run prisma:generate
```

Notes:

- `npm run build` already runs `prisma generate` first.
- This repo currently ships `prisma/schema.prisma` and `prisma/seed.ts`, but no checked-in Prisma migrations.
- Initial database setup is based on `prisma db push`.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

If you are on PowerShell and do not have `cp` aliased:

```powershell
Copy-Item .env.example .env
```

### 3. Fill the minimum required variables

For a working local setup, configure at least:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `APP_NAME`
- `RESEND_API_KEY`, or the SMTP variables if you prefer SMTP over Resend

If you want billing and AI enabled locally, also configure:

- Stripe keys and price IDs
- `OPENROUTER_API_KEY`

### 4. Generate Prisma client and bootstrap the database

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
```

`db:seed` inserts starter roles, permissions, plans, categories, and tags.

### 5. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

### Core app

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma |
| `NEXTAUTH_URL` | Yes | Canonical base URL used by NextAuth |
| `NEXTAUTH_SECRET` | Yes | Secret for auth session signing |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL used in redirects, Stripe return URLs, and email links |
| `APP_NAME` | Recommended | Brand name used in emails and UI |
| `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING` | Optional | Useful in restricted CI or serverless build environments |

### Authentication

| Variable | Required | Purpose |
| --- | --- | --- |
| `GOOGLE_CLIENT_ID` | Optional | Enables Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Optional | Enables Google OAuth |
| `GITHUB_ID` | Optional | Enables GitHub OAuth |
| `GITHUB_SECRET` | Optional | Enables GitHub OAuth |

### Billing

| Variable | Required | Purpose |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Required for paid plans | Server-side Stripe API access |
| `STRIPE_WEBHOOK_SECRET` | Required for billing sync | Verifies `/api/webhooks/stripe` events |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional for future client-side Stripe flows | Public Stripe key |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Required for Pro monthly billing | Stripe price ID |
| `STRIPE_PRO_YEARLY_PRICE_ID` | Required for Pro yearly billing | Stripe price ID |
| `STRIPE_BUSINESS_MONTHLY_PRICE_ID` | Required for Business monthly billing | Stripe price ID |
| `STRIPE_BUSINESS_YEARLY_PRICE_ID` | Required for Business yearly billing | Stripe price ID |

### AI

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Required for AI features | Server-side OpenRouter access |
| `OPENROUTER_BASE_URL` | Optional | Override the default OpenRouter API base URL |

### Email

Use one of the following:

- Recommended for production: `RESEND_API_KEY`
- Fallback: SMTP settings

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Optional | Uses Resend instead of SMTP |
| `SMTP_HOST` | Required if not using Resend | SMTP host |
| `SMTP_PORT` | Required if not using Resend | SMTP port |
| `SMTP_SECURE` | Required if not using Resend | `true` for SSL-only SMTP, otherwise `false` |
| `SMTP_USER` | Required if not using Resend | SMTP username |
| `SMTP_PASS` | Required if not using Resend | SMTP password or app password |
| `SMTP_FROM` | Recommended | Sender name and email |
| `ADMIN_EMAIL` | Recommended | Admin notification recipient and test email target |

### Monitoring

| Variable | Required | Purpose |
| --- | --- | --- |
| `SENTRY_DSN` | Optional | Enables Sentry integration in `next.config.ts` |
| `SENTRY_ORG` | Optional | Sentry source map upload config |
| `SENTRY_PROJECT` | Optional | Sentry source map upload config |

## Local Development Checklist

Before spending time on UI or deployment, verify these flows locally:

1. `npm run db:push`
2. `npm run db:seed`
3. account registration and sign-in
4. email verification
5. Stripe checkout and webhook handling
6. OpenRouter chat response
7. admin access for seeded or manually elevated users

## Third-Party Setup

### OAuth Providers

Configure these callback URLs in the provider dashboards:

- Google local: `http://localhost:3000/api/auth/callback/google`
- Google production: `https://your-domain.com/api/auth/callback/google`
- GitHub local: `http://localhost:3000/api/auth/callback/github`
- GitHub production: `https://your-domain.com/api/auth/callback/github`

Make sure the domain in the provider settings exactly matches `NEXTAUTH_URL`.

### Stripe

Create the following recurring prices in Stripe:

- Pro monthly
- Pro yearly
- Business monthly
- Business yearly

Then map the generated Stripe price IDs into:

- `STRIPE_PRO_MONTHLY_PRICE_ID`
- `STRIPE_PRO_YEARLY_PRICE_ID`
- `STRIPE_BUSINESS_MONTHLY_PRICE_ID`
- `STRIPE_BUSINESS_YEARLY_PRICE_ID`

Set the webhook endpoint to:

```text
https://your-domain.com/api/webhooks/stripe
```

Recommended Stripe events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### Email

Credentials sign-up relies on email verification, so email delivery should be considered required for a real deployment.

Production recommendation:

- use Resend with a verified sending domain

Fallback:

- use SMTP with a provider such as Gmail, Postmark, Mailgun, or another transactional mail service

### OpenRouter

Set:

- `OPENROUTER_API_KEY`
- optionally `OPENROUTER_BASE_URL`

The app sends `NEXT_PUBLIC_APP_URL` as the `HTTP-Referer`, so production should use your real domain.

## Deployment

### Recommended: Vercel + Managed PostgreSQL

This repo already includes:

- `vercel.json`
- `next.config.ts` with `output: "standalone"`
- a build step that runs `prisma generate` before `next build`

Recommended production stack:

- Vercel for the app
- Neon, Railway, Supabase, or Vercel Postgres for PostgreSQL
- Stripe for billing
- Resend for email

### Vercel Deployment Steps

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Add all required environment variables in the Vercel project settings.
4. Provision a production PostgreSQL database and set `DATABASE_URL`.
5. Set both `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain.
6. Deploy once so Vercel can build the app.
7. Bootstrap the production database with Prisma.
8. Update OAuth provider callback URLs.
9. Create the Stripe webhook endpoint for the production domain.
10. Redeploy if any environment variables changed after the first deployment.

### Bootstrapping the Production Database

Because this repo does not currently include checked-in Prisma migrations, initialize production with schema push and seed:

```bash
npx prisma db push
npm run db:seed
```

Run those commands in a shell where `DATABASE_URL` points at the production database.

If you later add Prisma migrations to the repo, switch your deployment process to:

```bash
npx prisma migrate deploy
```

### Environment Variables for Vercel

At minimum, set these in Vercel:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `APP_NAME`
- email provider vars
- Stripe vars
- OpenRouter vars

Optional:

- Sentry vars
- any provider-specific extras you add later

### Railway Deployment

Railway works well if you want app hosting and PostgreSQL on the same platform.

Suggested setup:

1. Create a new Railway project.
2. Add a PostgreSQL service.
3. Add your app service from GitHub.
4. Configure all environment variables.
5. Build with `npm run build`.
6. Start with `npm start`.
7. Run `npx prisma db push` and `npm run db:seed` against the Railway database once.

### Self-Hosting or Docker

The app is also suitable for a custom Node host because the project builds as a standalone Next.js server.

Basic flow:

```bash
npm install
npm run prisma:generate
npm run build
npm start
```

For a containerized deployment, make sure you:

- expose port `3000`
- provide all environment variables at runtime
- run Prisma schema sync or migrations against the target database
- terminate TLS at your proxy or platform edge

## Post-Deployment Checklist

After production goes live, verify:

1. homepage, pricing, docs, and blog load correctly
2. registration, login, logout, and session persistence work
3. email verification links open the correct production domain
4. Google and GitHub OAuth sign-in succeed
5. Stripe checkout redirects back to the correct domain
6. Stripe webhook events reach `/api/webhooks/stripe`
7. AI chat requests succeed with your OpenRouter key
8. seeded plans, roles, and permissions exist in the database
9. admin email sending works
10. error monitoring is active if Sentry is enabled

## Production Notes

- Use HTTPS everywhere in production.
- Do not point auth or billing callbacks at preview URLs.
- Keep `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` aligned.
- Use a strong `NEXTAUTH_SECRET`.
- Use a managed PostgreSQL provider with backups enabled.
- Store secrets only in your platform's secret manager or environment settings.

## Troubleshooting

### Build succeeds locally but production auth is broken

Check:

- `NEXTAUTH_URL`
- OAuth callback URLs
- HTTPS configuration

### Stripe checkout works but subscriptions do not update

Check:

- `STRIPE_WEBHOOK_SECRET`
- webhook event subscriptions
- product price IDs
- webhook delivery logs in Stripe

### Emails are not being sent

Check:

- `RESEND_API_KEY` or SMTP credentials
- sender domain verification
- `SMTP_FROM`
- provider-specific sending limits

### AI chat fails in production

Check:

- `OPENROUTER_API_KEY`
- network egress from your host
- `NEXT_PUBLIC_APP_URL` if the provider validates referers

### Production database is missing plans or roles

Run:

```bash
npm run db:seed
```

### Prisma issues during CI or serverless builds

Set:

```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
```

That variable is already wired into the project build scripts for restricted environments.

## Suggested Next Improvements

If you plan to use this starter in production, the next practical upgrades are:

- add checked-in Prisma migrations
- add a real ESLint flat config for ESLint v9
- add a production Dockerfile if you want non-Vercel hosting
- add health checks and uptime monitoring
- add automated deployment smoke tests
