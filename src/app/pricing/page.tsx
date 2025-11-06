import { Button } from "@/components/ui/button";
import { Check, ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our platform",
    features: [
      "3 AI chats per month",
      "Basic AI models",
      "Email support",
    ],
    cta: "Get Started",
    href: "/auth/signin",
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Best for individuals and small teams",
    features: [
      "5 AI chats per month",
      "1 PDF upload per chat",
      "Advanced AI models",
      "Priority support",
      "Chat history",
    ],
    cta: "Subscribe Now",
    href: "/dashboard/billing",
    popular: true,
  },
  {
    name: "Business",
    price: "$49.99",
    description: "For growing businesses with advanced needs",
    features: [
      "Unlimited AI chats",
      "Unlimited PDF uploads",
      "All AI models",
      "24/7 Priority support",
      "Advanced analytics",
      "API access",
    ],
    cta: "Subscribe Now",
    href: "/dashboard/billing",
  },
];

export default function PricingPage() {
  return (
    <div className="light min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <CreditCard className="h-4 w-4" />
              <span>Pricing Plans</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-purple-100 md:text-2xl">
              Choose the plan that's right for you. Upgrade or downgrade anytime.
            </p>
            <p className="mt-4 text-sm text-purple-200">
              💰 Save 10% with yearly billing
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan: any, i: number) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-3xl border-2 p-8 transition-all hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular
                    ? "border-purple-500 bg-gradient-to-b from-purple-50 to-white shadow-xl scale-105"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="mb-8 pt-4">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== "$0" && (
                      <span className="text-xl text-gray-600">/month</span>
                    )}
                  </div>
                </div>

                <div className="mb-8 space-y-4">
                  {plan.features.map((feature: any, j: number) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={plan.href} className="block">
                  <Button
                    className={`w-full h-12 text-base font-bold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ or Additional Info */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 text-left">
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards and debit cards through Stripe's secure payment processing.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes! Our Free plan lets you try out the platform with no credit card required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-2 border-gray-200 hover:border-purple-500 hover:text-purple-600"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
