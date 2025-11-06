import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, MessageSquare, TrendingUp, CreditCard, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { hasRole } from "@/lib/rbac";
import { AdminCharts } from "@/components/admin/AdminCharts";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const isAdmin = await hasRole("ADMIN") || await hasRole("SUPER_ADMIN");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Get analytics data
  const totalUsers = await prisma.user.count();
  const activeSubscriptions = await prisma.subscription.count({
    where: { status: "active" },
  });
  const totalChats = await prisma.chat.count();
  const totalRevenue = await prisma.payment.aggregate({
    where: { status: "succeeded" },
    _sum: { amount: true },
  });

  // Get data for charts - Revenue over last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const payments = await prisma.payment.findMany({
    where: {
      status: "succeeded",
      createdAt: { gte: sixMonthsAgo },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group payments by month
  const revenueByMonth = payments.reduce((acc: any, payment: any) => {
    const month = new Date(payment.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += payment.amount;
    return acc;
  }, {});

  const revenueData = Object.entries(revenueByMonth).map(([month, revenue]: any) => ({
    month,
    revenue: parseFloat(revenue.toFixed(2)),
  }));

  // Get user growth data
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const usersByMonth = users.reduce((acc: any, user: any) => {
    const month = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {});

  const userGrowthData = Object.entries(usersByMonth).map(([month, count]: any) => ({
    month,
    users: count,
  }));

  // Get subscription distribution
  const subscriptionsByPlan = await prisma.subscription.groupBy({
    by: ["planId"],
    where: { status: "active" },
    _count: true,
  });

  const plans = await prisma.plan.findMany();
  const subscriptionData = subscriptionsByPlan.map((sub: any) => {
    const plan = plans.find((p: any) => p.id === sub.planId);
    return {
      name: plan?.name || "Unknown",
      value: sub._count,
    };
  });

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      subscription: {
        include: { plan: true },
      },
    },
  });

  // Calculate growth percentages (mock data for demo)
  const userGrowth = 12.5;
  const revenueGrowth = 8.3;
  const chatGrowth = 23.1;

  return (
    <div className="light min-h-screen bg-white p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">System overview and analytics</p>
      </div>

      {/* Stats Grid with Gradient Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Users Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <Users className="h-6 w-6" />
            </div>
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${userGrowth > 0 ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {userGrowth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(userGrowth)}%
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{totalUsers}</div>
          <div className="text-sm text-purple-100">Total Users</div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Active Subscriptions Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 to-pink-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${revenueGrowth > 0 ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {revenueGrowth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(revenueGrowth)}%
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{activeSubscriptions}</div>
          <div className="text-sm text-pink-100">Active Subscriptions</div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Total Chats Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${chatGrowth > 0 ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {chatGrowth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(chatGrowth)}%
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{totalChats}</div>
          <div className="text-sm text-blue-100">Total Chats</div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Total Revenue Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold">
              <Activity className="h-3 w-3" />
              Live
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">
            ${totalRevenue._sum.amount?.toFixed(2) || "0.00"}
          </div>
          <div className="text-sm text-cyan-100">Total Revenue</div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>
      </div>

      {/* Charts Section */}
      <AdminCharts
        revenueData={revenueData}
        userGrowthData={userGrowthData}
        subscriptionData={subscriptionData}
      />

      {/* Recent Users */}
      <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Recent Users</CardTitle>
          <CardDescription className="text-gray-600">Latest user registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user: any, index: number) => {
              const colors = ["from-purple-500 to-purple-600", "from-pink-500 to-pink-600", "from-blue-500 to-blue-600", "from-cyan-500 to-cyan-600", "from-indigo-500 to-indigo-600"];
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-2xl border-2 border-gray-100 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4 transition-all hover:border-purple-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${colors[index % colors.length]} text-white font-bold`}>
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user.name || "Anonymous"}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {user.subscription?.plan.name || "Free"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.credits} credits
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
