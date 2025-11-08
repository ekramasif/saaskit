"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import {
  BookOpen,
  Rocket,
  Shield,
  CreditCard,
  Code,
  Database,
  Settings,
  FileText,
  Zap,
  Cloud,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs", icon: BookOpen },
      { name: "Quick Start", href: "/docs/quickstart", icon: Rocket },
      { name: "Installation", href: "/docs/installation", icon: Settings },
    ],
  },
  {
    title: "Core Features",
    items: [
      { name: "Authentication", href: "/docs/authentication", icon: Shield },
      { name: "Billing & Subscriptions", href: "/docs/billing", icon: CreditCard },
      { name: "API Integration", href: "/docs/api", icon: Code },
      { name: "Database & Prisma", href: "/docs/database", icon: Database },
    ],
  },
  {
    title: "Guides",
    items: [
      { name: "Admin Dashboard", href: "/docs/admin", icon: Settings },
      { name: "Blog System", href: "/docs/blog", icon: FileText },
      { name: "AI Integration", href: "/docs/ai", icon: Zap },
      { name: "Deployment", href: "/docs/deployment", icon: Cloud },
    ],
  },
];

function SidebarNav({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="py-6 pr-6 lg:py-8">
      <div className="mb-6 px-2">
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Documentation
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Everything you need to build with SaasKit
        </p>
      </div>

      {navigation.map((section) => (
        <div key={section.title} className="mb-8">
          <h4 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-violet-600/10 to-indigo-600/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4 transition-transform group-hover:scale-110",
                      isActive && "text-primary"
                    )} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Quick Links */}
      <div className="mt-8 px-2 pt-6 border-t">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Resources
        </h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/api-docs" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Code className="h-3.5 w-3.5" />
              API Reference
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <FileText className="h-3.5 w-3.5" />
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 pt-16">
        {/* Mobile Menu Button */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b md:hidden">
          <div className="container flex items-center justify-between py-4">
            <h2 className="font-semibold">Documentation</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="container flex-1 items-start md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          {/* Sidebar Navigation - Desktop */}
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block md:w-[260px] lg:w-[280px]">
            <SidebarNav />
          </aside>

          {/* Sidebar Navigation - Mobile */}
          {sidebarOpen && (
            <aside className="fixed inset-0 top-[8.5rem] z-30 bg-background overflow-y-auto border-r md:hidden">
              <SidebarNav onItemClick={() => setSidebarOpen(false)} />
            </aside>
          )}

          {/* Main Content */}
          <main className="relative py-6 lg:py-8 xl:py-10">
            <div className="mx-auto w-full min-w-0 max-w-4xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
