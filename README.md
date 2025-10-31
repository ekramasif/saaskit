# Next.js 15 AI SaaS Starter Kit

A production-ready SaaS starter kit built with Next.js 15, featuring authentication, subscription billing, AI integration, and RBAC.

## Features

- **Next.js 15** with App Router and Server Actions
- **TypeScript** for type safety
- **Authentication** via NextAuth (Google & GitHub OAuth)
- **Database** with PostgreSQL and Prisma ORM
- **Role-Based Access Control (RBAC)** with granular permissions
- **Stripe Integration** for subscription billing
- **AI Chat** powered by OpenRouter API (GPT, Claude, Gemini, etc.)
- **Credit System** for usage tracking
- **Admin Dashboard** with analytics
- **Blog System** for content management
- **Tailwind CSS v4** + ShadCN UI components
- **Dark/Light Mode** support
- **Framer Motion** animations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth v5
- **Payments**: Stripe
- **AI**: OpenRouter API
- **Styling**: Tailwind CSS v4, ShadCN UI
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- OpenRouter API key
- OAuth credentials (Google & GitHub)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd saaskit
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` & `GITHUB_SECRET`
- `STRIPE_SECRET_KEY` & `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENROUTER_API_KEY`

4. **Set up the database**

```bash
# Push the schema to your database
npx prisma db push

# Seed initial data (roles, permissions, plans)
npx prisma db seed
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application includes comprehensive models for:

- **Authentication**: User, Account, Session
- **RBAC**: Role, Permission, RolePermission, UserRole
- **Billing**: Plan, Subscription, Payment, DiscountCode
- **AI**: Chat, Message, File, CreditUsage
- **Content**: Blog, Category, Tag

## User Roles

- **USER**: Standard user with basic access
- **ADMIN**: Administrator with elevated permissions
- **SUPER_ADMIN**: Full system access

## Permissions

- `manage_users` - User management
- `manage_plans` - Plan configuration
- `manage_discounts` - Discount code management
- `view_analytics` - Analytics access
- `manage_roles` - Role and permission management
- `manage_blogs` - Blog management
- `create_payments` - Manual payment creation
- `view_payments` - Payment history access

## Stripe Setup

1. Create products and prices in Stripe Dashboard
2. Update `.env` with price IDs:
   - `STRIPE_PRO_MONTHLY_PRICE_ID`
   - `STRIPE_PRO_YEARLY_PRICE_ID`
   - `STRIPE_BUSINESS_MONTHLY_PRICE_ID`
   - `STRIPE_BUSINESS_YEARLY_PRICE_ID`

3. Set up webhook endpoint: `/api/webhooks/stripe`
4. Add webhook secret to `.env`

## OpenRouter Setup

1. Sign up at [OpenRouter](https://openrouter.ai)
2. Generate an API key
3. Add to `.env` as `OPENROUTER_API_KEY`

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # User dashboard
│   ├── admin/          # Admin dashboard
│   └── ...
├── components/         # React components
│   ├── ui/            # ShadCN UI components
│   └── ...
├── lib/               # Utility libraries
│   ├── auth.ts        # NextAuth configuration
│   ├── prisma.ts      # Prisma client
│   ├── stripe.ts      # Stripe integration
│   ├── openrouter.ts  # AI integration
│   ├── rbac.ts        # RBAC utilities
│   └── ...
├── actions/           # Server actions
├── hooks/             # React hooks
└── types/             # TypeScript types
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

Recommended: [Neon](https://neon.tech) for serverless PostgreSQL

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db push` - Push schema changes
- `npx prisma db seed` - Seed database

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
