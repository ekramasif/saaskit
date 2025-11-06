import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Coins, CreditCard, TrendingUp, Zap, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: {
        include: { plan: true },
      },
      chats: {
        take: 10,
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  const creditUsage = await prisma.creditUsage.aggregate({
    where: { userId: session.user.id },
    _sum: { credits: true },
  });

  const totalChats = await prisma.chat.count({
    where: { userId: session.user.id },
  });

  // Get credit usage history over last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const creditUsageHistory = await prisma.creditUsage.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: thirtyDaysAgo },
    },
    select: {
      credits: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group credit usage by day
  const creditUsageByDay = creditUsageHistory.reduce((acc: any, usage: any) => {
    const day = new Date(usage.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += usage.credits;
    return acc;
  }, {});

  const creditData = Object.entries(creditUsageByDay).map(([day, credits]: any) => ({
    day,
    credits,
  }));

  // Get chat activity over last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentChats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: sevenDaysAgo },
    },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const chatsByDay = recentChats.reduce((acc: any, chat: any) => {
    const day = new Date(chat.createdAt).toLocaleDateString("en-US", { weekday: "short" });
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day]++;
    return acc;
  }, {});

  const chatActivityData = Object.entries(chatsByDay).map(([day, count]: any) => ({
    day,
    chats: count,
  }));

  // Calculate percentage of credits used
  const maxCredits = user?.subscription?.plan?.creditsPerMonth || 100;
  const usedCredits = creditUsage._sum.credits || 0;
  const creditsPercentage = Math.min(100, (usedCredits / maxCredits) * 100);

  return (
    <div className="light min-h-screen bg-white p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-lg text-gray-600">Here's an overview of your account activity</p>
      </div>

      {/* Stats Grid with Gradient Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Available Credits Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <Coins className="h-6 w-6" />
            </div>
            <div className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold">
              {maxCredits} max
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{user?.credits || 0}</div>
          <div className="text-sm text-purple-100 mb-3">Available Credits</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full transition-all"
              style={{ width: `${100 - creditsPercentage}%` }}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Total Chats Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 to-pink-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="rounded-full bg-green-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Active
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{totalChats}</div>
          <div className="text-sm text-pink-100">Total Conversations</div>
          <p className="text-xs text-pink-200 mt-2">
            {usedCredits || 0} credits used
          </p>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Current Plan Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <CreditCard className="h-6 w-6" />
            </div>
            {user?.subscription?.plan.name !== "Free" && (
              <div className="rounded-full bg-yellow-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Pro
              </div>
            )}
          </div>
          <div className="text-3xl font-extrabold mb-1">
            {user?.subscription?.plan.name || "Free"}
          </div>
          <div className="text-sm text-blue-100 mb-3">
            {user?.subscription?.status || "No active subscription"}
          </div>
          {user?.subscription?.plan.name === "Free" && (
            <Link href="/dashboard/billing">
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs font-bold"
              >
                Upgrade Plan
              </Button>
            </Link>
          )}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts
        creditData={creditData}
        chatActivityData={chatActivityData}
      />

      {/* Recent Chats */}
      <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Recent Chats</CardTitle>
              <CardDescription className="text-gray-600">Your most recent AI conversations</CardDescription>
            </div>
            <Link href="/dashboard/chat">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {user?.chats && user.chats.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {user.chats.slice(0, 6).map((chat: any, index: number) => (
                <Link
                  key={chat.id}
                  href={`/dashboard/chat/${chat.id}`}
                  className="group block rounded-2xl border-2 border-gray-100 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4 transition-all hover:border-purple-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold shrink-0">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 line-clamp-1 mb-1">{chat.title}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">No chats yet</h3>
              <p className="text-gray-600 mb-4">Start your first AI conversation now!</p>
              <Link href="/dashboard/chat">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Your First Chat
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
