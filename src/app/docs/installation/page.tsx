import Link from "next/link";
import { CheckCircle2, Package, Database as DatabaseIcon, Key, CreditCard, Zap } from "lucide-react";
import {
  Callout,
  CodeBlock,
  DocBadge,
  Steps,
  Step,
  Breadcrumbs,
  LinkCard,
  InlineCode,
  CardGrid,
} from "@/components/docs/doc-components";

export default function InstallationPage() {
  return (
    <div className="docs-content">
      <Breadcrumbs
        items={[
          { label: "Documentation", href: "/docs" },
          { label: "Installation" },
        ]}
      />

      <div className="mb-8">
        <h1>Installation</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Detailed guide for installing and configuring the AI SaaS Starter Kit.
        </p>
      </div>

      <Callout type="info" title="Prerequisites">
        Before starting, ensure you have Node.js 18.17+, PostgreSQL 14+, and Git installed on your system.
      </Callout>

      <h2>System Requirements</h2>

      <CardGrid cols={2}>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold !mt-0 !mb-0">Node.js</h4>
          </div>
          <p className="text-sm text-muted-foreground !mb-0">Version 18.17 or later</p>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <DatabaseIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="font-semibold !mt-0 !mb-0">PostgreSQL</h4>
          </div>
          <p className="text-sm text-muted-foreground !mb-0">Version 14 or later</p>
        </div>
      </CardGrid>

      <h2>Installation Methods</h2>

      <h3>Method 1: Clone from GitHub</h3>
      <p>Clone the repository and install dependencies:</p>
      <CodeBlock
        code={`git clone https://github.com/yourusername/ai-saas-starter.git
cd ai-saas-starter
npm install`}
        language="bash"
        title="Terminal"
      />

      <h3>Method 2: Use as Template</h3>
      <Callout type="note">
        Click the "Use this template" button on GitHub to create your own repository based on this starter kit.
      </Callout>

      <h2>Environment Configuration</h2>

      <h3>Environment Variables</h3>
      <p>Create a <InlineCode>.env</InlineCode> file in the root directory:</p>

      <CodeBlock
        code={`# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_saas"

# NextAuth.js
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC="price_xxx"
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO="price_xxx"
NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS="price_xxx"

# OpenRouter AI
OPENROUTER_API_KEY="sk-or-v1-your-key"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"`}
        language="bash"
        title=".env"
        showLineNumbers={true}
      />

      <Callout type="warning" title="Security Warning">
        Never commit your <InlineCode>.env</InlineCode> file to version control. It's already in <InlineCode>.gitignore</InlineCode> by default.
      </Callout>

      <h2>Service Setup</h2>

      <h3>
        <DatabaseIcon className="inline h-6 w-6 mr-2 text-green-600" />
        Database Setup
      </h3>
      <p>Initialize and migrate your PostgreSQL database:</p>

      <CodeBlock
        code={`# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed initial data (roles, plans)
npx prisma db seed`}
        language="bash"
        title="Terminal"
        showLineNumbers={true}
      />

      <Callout type="success">
        The seed command creates default roles (USER, ADMIN, SUPER_ADMIN) and subscription plans (Free, Pro, Business).
      </Callout>

      <h3>
        <Key className="inline h-6 w-6 mr-2 text-blue-600" />
        OAuth Provider Setup
      </h3>

      <h4>Google OAuth</h4>
      <Steps>
        <Step step={1} title="Create Project">
          <p>Go to <a href="https://console.cloud.google.com/" target="_blank" className="text-primary hover:underline">Google Cloud Console</a> and create a new project or select an existing one.</p>
        </Step>
        <Step step={2} title="Enable APIs">
          <p>Navigate to APIs & Services → Enable APIs and Services, then enable the Google+ API.</p>
        </Step>
        <Step step={3} title="Create Credentials">
          <p>Go to Credentials → Create Credentials → OAuth client ID → Web application</p>
        </Step>
        <Step step={4} title="Configure Redirect URI">
          <p>Add authorized redirect URIs:</p>
          <ul>
            <li>Development: <InlineCode>http://localhost:3000/api/auth/callback/google</InlineCode></li>
            <li>Production: <InlineCode>https://yourdomain.com/api/auth/callback/google</InlineCode></li>
          </ul>
        </Step>
        <Step step={5} title="Save Credentials">
          <p>Copy Client ID and Client Secret to your <InlineCode>.env</InlineCode> file.</p>
        </Step>
      </Steps>

      <h4>GitHub OAuth</h4>
      <Steps>
        <Step step={1} title="Navigate to Settings">
          <p>Go to GitHub Settings → Developer settings → OAuth Apps</p>
        </Step>
        <Step step={2} title="Create OAuth App">
          <p>Click "New OAuth App" and fill in:</p>
          <ul>
            <li>Homepage URL: <InlineCode>http://localhost:3000</InlineCode></li>
            <li>Authorization callback URL: <InlineCode>http://localhost:3000/api/auth/callback/github</InlineCode></li>
          </ul>
        </Step>
        <Step step={3} title="Generate Secret">
          <p>Click "Register application" then generate a new client secret.</p>
        </Step>
        <Step step={4} title="Save Credentials">
          <p>Copy Client ID and Client Secret to <InlineCode>.env</InlineCode></p>
        </Step>
      </Steps>

      <h3>
        <CreditCard className="inline h-6 w-6 mr-2 text-purple-600" />
        Stripe Setup
      </h3>
      <Steps>
        <Step step={1} title="Create Account">
          <p>Create a <a href="https://stripe.com" target="_blank" className="text-primary hover:underline">Stripe account</a> and switch to test mode.</p>
        </Step>
        <Step step={2} title="Get API Keys">
          <p>Navigate to Dashboard → Developers → API keys and copy your keys to <InlineCode>.env</InlineCode></p>
        </Step>
        <Step step={3} title="Create Products">
          <p>Create subscription products and prices in the Stripe Dashboard.</p>
        </Step>
        <Step step={4} title="Configure Webhooks">
          <p>Set up webhook endpoint: <InlineCode>/api/webhooks/stripe</InlineCode></p>
          <p>Listen to events:</p>
          <ul>
            <li><InlineCode>checkout.session.completed</InlineCode></li>
            <li><InlineCode>customer.subscription.*</InlineCode></li>
            <li><InlineCode>invoice.*</InlineCode></li>
          </ul>
        </Step>
      </Steps>

      <Callout type="info" title="Local Webhook Testing">
        Use the Stripe CLI for local webhook testing:
        <CodeBlock
          code="stripe listen --forward-to localhost:3000/api/webhooks/stripe"
          language="bash"
        />
      </Callout>

      <h3>
        <Zap className="inline h-6 w-6 mr-2 text-yellow-600" />
        OpenRouter AI Setup
      </h3>
      <Steps>
        <Step step={1} title="Sign Up">
          <p>Sign up at <a href="https://openrouter.ai" target="_blank" className="text-primary hover:underline">OpenRouter</a></p>
        </Step>
        <Step step={2} title="Get API Key">
          <p>Navigate to Settings and copy your API key.</p>
        </Step>
        <Step step={3} title="Add Credits">
          <p>Add credits to your account to use AI models.</p>
        </Step>
        <Step step={4} title="Configure">
          <p>Add the API key to your <InlineCode>.env</InlineCode> file.</p>
        </Step>
      </Steps>

      <h2>Run Development Server</h2>
      <p>Start the development server:</p>
      <CodeBlock
        code="npm run dev"
        language="bash"
        title="Terminal"
      />

      <Callout type="success" title="Server Running!">
        The application will be available at <a href="http://localhost:3000" target="_blank" className="text-primary hover:underline font-semibold">http://localhost:3000</a>
      </Callout>

      <h2>Build for Production</h2>
      <CodeBlock
        code={`# Build the application
npm run build

# Start production server
npm start`}
        language="bash"
        title="Terminal"
      />

      <h2>Prisma Studio</h2>
      <p>View and edit your database with Prisma Studio:</p>
      <CodeBlock
        code="npx prisma studio"
        language="bash"
        title="Terminal"
      />
      <p>Access at <a href="http://localhost:5555" target="_blank" className="text-primary hover:underline">http://localhost:5555</a></p>

      <h2>Verification Checklist</h2>
      <p>After installation, verify everything works:</p>
      <div className="space-y-2 my-6">
        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span>Homepage loads at localhost:3000</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span>Database connection successful</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span>OAuth sign-in works</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span>API documentation at /api-docs</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span>Admin dashboard accessible at /admin</span>
        </div>
      </div>

      <h2>Next Steps</h2>
      <p>Once installed, check out:</p>

      <CardGrid cols={3}>
        <LinkCard
          title="Authentication Guide"
          description="Set up user auth and roles"
          href="/docs/authentication"
        />
        <LinkCard
          title="Billing Guide"
          description="Configure subscription plans"
          href="/docs/billing"
        />
        <LinkCard
          title="Deployment Guide"
          description="Deploy to production"
          href="/docs/deployment"
        />
      </CardGrid>
    </div>
  );
}
