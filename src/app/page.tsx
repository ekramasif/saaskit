import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CirclePlay,
  CreditCard,
  Database,
  Layers3,
  LockKeyhole,
  Quote,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { HomeFaqAndSignup } from "@/components/home-faq-signup";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { getSiteUrl, siteConfig } from "@/lib/site";

const homeTitle = "Next.js SaaS Starter Kit for AI Products, Billing and Admin Workflows";
const homeDescription =
  "Launch a production-ready SaaS with Next.js, Auth.js, Stripe subscriptions, Prisma, admin tooling, docs, blog, and AI integrations already wired into one coherent codebase.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "next.js saas starter kit",
    "next.js saas boilerplate",
    "ai saas starter",
    "auth.js boilerplate",
    "stripe billing boilerplate",
    "prisma starter kit",
    "admin dashboard next.js",
    "saas landing page template",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

const heroStats = [
  ["Auth.js + Stripe", "sign-in and subscriptions"],
  ["Prisma + Admin", "data model and operations"],
  ["Docs + Blog", "seo and support content"],
];

const audiences = [
  {
    label: "SaaS founders",
    title: "Launch the commercial layer before the product gets messy",
    description:
      "Ship pricing, onboarding, authentication, billing, docs, and internal operations from the same Next.js codebase instead of patching them in later.",
  },
  {
    label: "Agencies",
    title: "Start client products from a reusable SaaS foundation",
    description:
      "Use one production-shaped starter for AI apps, client portals, dashboards, and subscription software without rebuilding roles, webhooks, and admin workflows every time.",
  },
  {
    label: "Product teams",
    title: "Keep public pages and internal surfaces visually coherent",
    description:
      "Run marketing pages, blog, docs, account settings, and operator tools together so the product feels intentional from first visit to daily use.",
  },
];

const features = [
  {
    title: "AI orchestration",
    description: "Model access, prompt handling, and response flows in one clean surface.",
    icon: Bot,
    tone: "bg-[#1f1b18] text-[#f3eadf] border-[#1f1b18]",
  },
  {
    title: "Authentication that feels finished",
    description: "Auth.js, verification, and permissions without the usual rough edges.",
    icon: LockKeyhole,
    tone: "bg-[#efe6dc] text-[#1f1b18] border-[#baad9f]",
  },
  {
    title: "Billing with structure",
    description: "Stripe subscriptions, credits, and payment handling already wired.",
    icon: CreditCard,
    tone: "bg-[#314337] text-[#f3eadf] border-[#314337]",
  },
];

const platformSections = [
  {
    eyebrow: "Acquisition",
    title: "Marketing surfaces that already connect",
    description:
      "Homepage, pricing, docs, blog, and signup flow stay visually aligned instead of feeling stitched together.",
    icon: Sparkles,
    points: ["Landing page and pricing", "Docs and blog routes", "Calls to action wired into auth"],
    tone: "bg-[#efe6dc] border-[#b9ab9d] text-[#1f1b18]",
  },
  {
    eyebrow: "Product",
    title: "App foundation with less hidden work",
    description:
      "Authentication, account access, role checks, and user-facing product surfaces are already in place.",
    icon: Layers3,
    points: ["Protected routes", "User dashboard", "Permissions and roles"],
    tone: "bg-[#1f1b18] border-[#2b2521] text-[#f3eadf]",
  },
  {
    eyebrow: "Operations",
    title: "Admin oversight without a second project",
    description:
      "Give operators an internal surface for users, plans, content, and performance without bolting on another admin tool.",
    icon: BarChart3,
    points: ["Admin pages", "Usage and payment views", "Content management"],
    tone: "bg-[#f4ede5] border-[#cdbfb1] text-[#1f1b18]",
  },
  {
    eyebrow: "Delivery",
    title: "Billing, data, and outbound systems connected",
    description:
      "Move from sign-in to subscription, transactional email, and data persistence without rebuilding the same plumbing.",
    icon: Workflow,
    points: ["Stripe billing", "Prisma and PostgreSQL", "Email and AI providers"],
    tone: "bg-[#314337] border-[#314337] text-[#f3eadf]",
  },
];

const stack = [
  "Next.js 16",
  "Auth.js",
  "Prisma",
  "Stripe",
  "Resend",
  "OpenRouter",
  "PostgreSQL",
  "Tailwind CSS",
];

const comparisonRows = [
  {
    task: "Authentication, verification, and protected routes",
    withoutKit: "separate build",
    withKit: "included",
  },
  {
    task: "Billing, checkout, subscriptions, and webhooks",
    withoutKit: "custom wiring",
    withKit: "included",
  },
  {
    task: "Admin management, roles, and reporting surfaces",
    withoutKit: "new module",
    withKit: "included",
  },
  {
    task: "Docs, blog, pricing, and marketing shell",
    withoutKit: "separate project",
    withKit: "included",
  },
];

const launchSteps = [
  {
    step: "01",
    title: "Shape the offer",
    description:
      "Adjust the homepage, pricing, and onboarding copy so the product already sells itself before you touch the core workflow.",
  },
  {
    step: "02",
    title: "Wire the product logic",
    description:
      "Connect your AI actions, data model, and internal tooling on top of a stack that already handles auth, billing, and admin access.",
  },
  {
    step: "03",
    title: "Ship with fewer gaps",
    description:
      "Launch with docs, account settings, operational controls, and a front-end that feels like a product brand, not a generic starter.",
  },
];

const faqs = [
  {
    question: "What is included?",
    answer:
      "Authentication, billing, AI integration, admin tooling, docs routes, and the public marketing shell are already part of the project.",
  },
  {
    question: "Can I use it commercially?",
    answer:
      "Yes. The starter is designed to be customized and used as the base for real products and client work.",
  },
  {
    question: "Is it only for AI apps?",
    answer:
      "No. It works well for subscription SaaS, client portals, B2B dashboards, and internal tools. The AI integration is there when you need it, but the product foundation stands on its own.",
  },
  {
    question: "Can I keep refining the design?",
    answer:
      "Yes. The design language is deliberately restrained so you can adapt it to a stronger brand without fighting generic template styling.",
  },
];

const pageShell = "marketing-shell px-4 md:px-6 xl:px-8";

export default function Home() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteUrl,
        description: homeDescription,
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description: homeDescription,
        featureList: [
          "Auth.js authentication and protected routes",
          "Stripe subscriptions and billing flows",
          "Prisma data layer and PostgreSQL support",
          "Admin dashboard and role management",
          "Marketing pages, pricing, docs, and blog",
          "AI model integrations and action flows",
        ],
        audience: [
          { "@type": "Audience", audienceType: "SaaS founders" },
          { "@type": "Audience", audienceType: "Agencies building client software" },
          { "@type": "Audience", audienceType: "Product teams shipping subscription apps" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
  return (
    <>
      <JsonLd id="home-structured-data" data={structuredData} />

      <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#E5DBCF] text-[#1f1b18]">
        <Navbar />

        <main className="flex-1 pt-28">
          <section className="pb-20 pt-6 md:pt-10">
            <div className={pageShell}>
              <div className="rounded-[2.4rem] border border-[#b8ab9c] bg-[#efe6dc] p-6 shadow-[0_30px_80px_-40px_rgba(31,27,24,0.45)] md:p-10 lg:p-12">
                <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr]">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#b8ab9c] bg-[#e5dbcf] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#61584f]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Next.js SaaS starter kit
                    </div>
                    <div className="space-y-5">
                      <p className="text-sm uppercase tracking-[0.34em] text-[#73685e]">
                        For AI products, subscription apps, and client portals.
                      </p>
                      <h1 className="font-display max-w-5xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                        Launch a production-ready SaaS with Auth.js, Stripe, Prisma, docs, blog, and admin tools already wired.
                      </h1>
                      <p className="max-w-3xl text-lg leading-8 text-[#4f4942] md:text-xl">
                        Built for teams that want one codebase for marketing, onboarding, billing, account access, operator workflows, and AI-enabled product features without shipping a generic-looking template.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link href="/auth/signin">
                        <Button className="h-14 rounded-full bg-[#1f1b18] px-8 text-base font-semibold text-[#f3eadf] hover:bg-[#312a25]">
                          Start building
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="#features">
                        <Button
                          variant="outline"
                          className="h-14 rounded-full border-[#6b6259] bg-transparent px-8 text-base font-semibold text-[#1f1b18] hover:bg-[#ddd2c6] hover:text-[#1f1b18]"
                        >
                          See the system
                          <CirclePlay className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {heroStats.map(([value, label]) => (
                        <div
                          key={label}
                          className="rounded-[1.5rem] border border-[#c8bbad] bg-[#e5dbcf] p-5"
                        >
                          <div className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                            {value}
                          </div>
                          <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5f564d]">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6e6359]">
                        Connected stack
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {stack.map((item) => (
                          <div
                            key={item}
                            className="rounded-full border border-[#c8bbad] bg-[#f4ede5] px-4 py-2 text-sm font-semibold text-[#4f4942]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-6 text-[#f3eadf] md:p-8">
                      <div className="flex items-center justify-between border-b border-[#3b342e] pb-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.32em] text-[#b7a995]">
                            Working surface
                          </p>
                          <h2 className="font-display mt-3 text-3xl leading-none">
                            Launch console
                          </h2>
                        </div>
                        <div className="rounded-full border border-[#3b342e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#d3c5b5]">
                          Ready to adapt
                        </div>
                      </div>
                      <div className="mt-6 space-y-3">
                        {[
                          "AI routing and product actions",
                          "Access control and verification",
                          "Stripe subscriptions and credits",
                          "Admin surfaces and reporting",
                          "Blog, docs, and pricing pages",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-[1.25rem] border border-[#3b342e] bg-[#26211d] px-4 py-3"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#314337]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm text-[#efe5da]">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 grid gap-4 border-t border-[#3b342e] pt-6 sm:grid-cols-2">
                        {[
                          [
                            "Commercially ready",
                            "Subscriptions, credits, pricing, and account flows are already connected.",
                          ],
                          [
                            "Operationally calm",
                            "Permissions, admin views, and internal controls are part of the product shell.",
                          ],
                        ].map(([title, description]) => (
                          <div
                            key={title}
                            className="rounded-[1.3rem] border border-[#3b342e] bg-[#26211d] p-4"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7a995]">
                              {title}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-[#d8ccbf]">
                              {description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.6rem] border border-[#b8ab9c] bg-[#f4eee6] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#314337] text-[#f3eadf]">
                            <Zap className="h-5 w-5" />
                          </div>
                          <p className="text-base leading-7 text-[#1f1b18]">
                            The design language stays restrained on purpose so the site looks branded rather than auto-generated.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-[1.6rem] border border-[#b8ab9c] bg-[#e5dbcf] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                            <Database className="h-5 w-5" />
                          </div>
                          <p className="text-base leading-7 text-[#1f1b18]">
                            The page uses real product detail instead of decorative filler, which improves both trust and SEO.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20">
            <div className={pageShell}>
              <div className="rounded-[2rem] border border-[#c7b8aa] bg-[#f4ede5] p-6 md:p-8">
                <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
                  <div className="space-y-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                      Built for real launch teams
                    </p>
                    <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                      A grounded starting point for SaaS founders, agencies, and product teams shipping web software.
                    </h2>
                    <p className="text-lg leading-8 text-[#5a524a]">
                      This is not a hero-only theme. It is a Next.js SaaS starter kit designed for products that need sales pages, account systems, subscription billing, admin operations, and content surfaces to work together.
                    </p>
                  </div>
                  <div className="divide-y divide-[#cfbfae] border-y border-[#cfbfae]">
                    {audiences.map((item) => (
                      <div
                        key={item.label}
                        className="grid gap-4 py-5 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a6f64]">
                          {item.label}
                        </p>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f1b18]">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-base leading-7 text-[#5a524a]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[#c7b8aa] bg-[#ede3d8] py-20">
            <div className={pageShell}>
              <div className="grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
                <div className="max-w-2xl space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                    Complete surface
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl">
                    A landing page that explains the product, the stack, and the operating model.
                  </h2>
                  <p className="text-lg leading-8 text-[#5a524a]">
                    The homepage now carries more searchable, product-specific content around onboarding, billing, administration, documentation, and AI workflows instead of repeating generic template language.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {platformSections.map((section) => {
                    const Icon = section.icon;

                    return (
                      <div
                        key={section.title}
                        className={`rounded-[2rem] border p-6 shadow-[0_20px_44px_-36px_rgba(31,27,24,0.5)] ${section.tone}`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] opacity-70">
                          {section.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold leading-tight">
                          {section.title}
                        </h3>
                        <p className="mt-4 text-base leading-7 opacity-85">
                          {section.description}
                        </p>
                        <div className="mt-6 space-y-3">
                          {section.points.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-sm">
                              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                                <Check className="h-3 w-3" />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-20">
            <div className={pageShell}>
              <div className="mb-10 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                  System design
                </p>
                <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                  Strong hierarchy, quieter surfaces, and product-first copy.
                </h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className={`rounded-[2rem] border p-7 shadow-[0_20px_44px_-36px_rgba(31,27,24,0.5)] ${feature.tone}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold leading-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 opacity-85">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6 md:p-8">
                <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                      Why it reads better
                    </p>
                    <h3 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                      Premium does not come from more gradients and badges. It comes from cleaner decisions, stronger copy, and a product story that holds together.
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Concrete stack language replaces vague marketing claims.",
                      "Asymmetric editorial sections reduce the copy-paste template feel.",
                      "Searchable content around docs, billing, admin, and onboarding supports SEO.",
                      "The page stays warm and branded without drifting into generic AI-site styling.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.4rem] border border-[#c8bbad] bg-[#f4ede5] p-5 text-base leading-7 text-[#4f4942]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[#c7b8aa] bg-[#ede3d8] py-20">
            <div className={pageShell}>
              <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                    Stop rebuilding the same layers
                  </p>
                  <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                    Use the starter for the repeatable work and keep your energy for the product that actually differentiates you.
                  </h2>
                  <div className="mt-8 space-y-4">
                    {comparisonRows.map((row) => (
                      <div
                        key={row.task}
                        className="rounded-[1.5rem] border border-[#c7b8aa] bg-[#f4ede5] p-5 md:grid md:grid-cols-[1.5fr_0.75fr_0.75fr] md:items-center md:gap-4"
                      >
                        <div>
                          <p className="text-lg font-semibold text-[#1f1b18]">{row.task}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7268]">
                            Without kit
                          </p>
                          <p className="mt-2 text-base font-semibold text-[#7c3529]">
                            {row.withoutKit}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7268]">
                            With kit
                          </p>
                          <p className="mt-2 text-base font-semibold text-[#314337]">
                            {row.withKit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-7 text-[#f3eadf]">
                    <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#b7a995]">
                      Launch flow
                    </p>
                    <h2 className="font-display mt-4 text-4xl leading-tight">
                      A simple path from starter kit to branded product.
                    </h2>
                    <div className="mt-8 space-y-4">
                      {launchSteps.map((item) => (
                        <div
                          key={item.step}
                          className="rounded-[1.6rem] border border-[#3b342e] bg-[#26211d] p-5"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b7a995]">
                            Step {item.step}
                          </p>
                          <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                          <p className="mt-3 text-base leading-7 text-[#d8ccbf]">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                        <Quote className="h-5 w-5" />
                      </div>
                      <p className="text-lg leading-8 text-[#332d29]">
                        Premium does not mean louder. It means clearer structure, calmer typography, and fewer weak decisions across the page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <HomeFaqAndSignup faqs={faqs} />
        </main>

        <Footer />
      </div>
    </>
  );
}
