"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];

interface AdminChartsProps {
  revenueData: { month: string; revenue: number }[];
  userGrowthData: { month: string; users: number }[];
  subscriptionData: { name: string; value: number }[];
}

export function AdminCharts({ revenueData, userGrowthData, subscriptionData }: AdminChartsProps) {
  return (
    <>
      {/* Charts Section */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Revenue Over Time */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground">Revenue Overview</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="month" stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: '12px' }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: any) => [`$${value}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground">User Growth</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">New user registrations by month</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="month" stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: '12px' }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: any) => [`${value}`, "New Users"]}
                />
                <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Distribution */}
      <div className="grid gap-5">
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground">Subscription Distribution</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Active subscriptions by plan</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                >
                  {subscriptionData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: '12px' }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
