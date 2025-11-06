import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasRole } from "@/lib/rbac";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { UserMenu } from "@/components/user-menu";
import { AdminNav } from "@/components/admin-nav";
import { CollapsibleSidebarLayout } from "@/components/collapsible-sidebar-layout";
import { Home } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const isAdmin = await hasRole("ADMIN") || await hasRole("SUPER_ADMIN");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  const logo = (
    <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
      <Home className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-medium truncate">Back to App</span>
    </Link>
  );

  const header = (
    <>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <UserMenu />
    </>
  );

  return (
    <SessionProvider session={session}>
      <CollapsibleSidebarLayout
        logo={logo}
        navigation={<AdminNav />}
        header={header}
        isAdmin={true}
      >
        {children}
      </CollapsibleSidebarLayout>
    </SessionProvider>
  );
}
