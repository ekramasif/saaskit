import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserMenu } from "@/components/user-menu";
import { SessionProvider } from "next-auth/react";
import { CollapsibleSidebarLayout } from "@/components/collapsible-sidebar-layout";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const logo = (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 flex-shrink-0">
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span className="text-lg font-bold text-gray-900 dark:text-white truncate">AI SaaS</span>
    </Link>
  );

  const header = (
    <>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <UserMenu />
    </>
  );

  return (
    <SessionProvider session={session}>
      <CollapsibleSidebarLayout
        logo={logo}
        navigation={<DashboardNav />}
        header={header}
      >
        {children}
      </CollapsibleSidebarLayout>
    </SessionProvider>
  );
}
