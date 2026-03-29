export const siteConfig = {
  name: "AI SaaS Kit",
  title: "AI SaaS Kit",
  description:
    "Next.js SaaS starter kit with Auth.js, Stripe billing, Prisma, admin tooling, docs, blog, and AI integrations for production-ready subscription products.",
  keywords: [
    "next.js saas starter kit",
    "saas boilerplate",
    "ai saas boilerplate",
    "next.js starter",
    "auth.js starter",
    "stripe subscription starter",
    "prisma saas starter",
    "admin dashboard starter",
    "next.js billing boilerplate",
    "saas template",
  ],
};

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const normalized = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    return new URL(normalized).origin;
  } catch {
    return "http://localhost:3000";
  }
}
