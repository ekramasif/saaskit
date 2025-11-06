"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Coins, MessageSquare } from "lucide-react";

interface DashboardChartsProps {
  creditData: { day: string; credits: number }[];
  chatActivityData: { day: string; chats: number }[];
}

export function DashboardCharts({ creditData, chatActivityData }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Credit Usage Chart */}
      <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Credit Usage</CardTitle>
          <CardDescription className="text-gray-600">Your credit consumption over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {creditData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={creditData}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "2px solid #e5e7eb", borderRadius: "12px" }}
                  formatter={(value: any) => [`${value} credits`, "Used"]}
                />
                <Area type="monotone" dataKey="credits" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[250px] text-gray-500">
              <Coins className="h-12 w-12 mb-3 text-gray-300" />
              <p>No credit usage data yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Activity Chart */}
      <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Chat Activity</CardTitle>
          <CardDescription className="text-gray-600">Your conversations over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {chatActivityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chatActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "2px solid #e5e7eb", borderRadius: "12px" }}
                  formatter={(value: any) => [`${value}`, "Chats"]}
                />
                <Bar dataKey="chats" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[250px] text-gray-500">
              <MessageSquare className="h-12 w-12 mb-3 text-gray-300" />
              <p>No recent chat activity</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
