"use client";

import { useState } from "react";
import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { XAxis } from "@/components/charts/x-axis";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import BorderGlow from "@/components/marketing/BorderGlow";

const revenueData = [
  { date: "2023-01-01", revenue: 2000, expenses: 1000 },
  { date: "2023-02-01", revenue: 4000, expenses: 2500 },
  { date: "2023-03-01", revenue: 15000, expenses: 3000 },
  { date: "2023-04-01", revenue: 5000, expenses: 2000 },
  { date: "2023-05-01", revenue: 8000, expenses: 4000 },
  { date: "2023-06-01", revenue: 6000, expenses: 3500 },
  { date: "2023-07-01", revenue: 10000, expenses: 5000 },
  { date: "2023-08-01", revenue: 12000, expenses: 7000 },
  { date: "2023-09-01", revenue: 14000, expenses: 6500 },
  { date: "2023-10-01", revenue: 18000, expenses: 8000 },
  { date: "2023-11-01", revenue: 22000, expenses: 9500 },
  { date: "2023-12-01", revenue: 28000, expenses: 11000 },
];

const timeData = [
  { date: "2023-10-01", hours: 45, internal: 12 },
  { date: "2023-10-08", hours: 52, internal: 14 },
  { date: "2023-10-15", hours: 38, internal: 8 },
  { date: "2023-10-22", hours: 65, internal: 20 },
  { date: "2023-10-29", hours: 48, internal: 15 },
  { date: "2023-11-05", hours: 55, internal: 10 },
  { date: "2023-11-12", hours: 60, internal: 18 },
  { date: "2023-11-19", hours: 42, internal: 9 },
];

export default function DashboardCharts() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'time'>('revenue');

  return (
    
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#120F17"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={1.0}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      className="mt-4"
    >
      <div className="glass-panel squircle-md p-6 border border-white/5 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full opacity-50 pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-lg font-medium text-white">Analytics Overview</h2>
          <p className="text-sm text-white/50 mt-1">Track your financial growth and time efficiency.</p>
        </div>

        <div className="relative z-10 flex bg-black/40 p-1 rounded-xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'revenue'
                ? 'bg-white/10 text-white shadow-sm border border-white/5'
                : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Revenue & Expenses
          </button>
          <button
            onClick={() => setActiveTab('time')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'time'
                ? 'bg-white/10 text-white shadow-sm border border-white/5'
                : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Time Logs
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {activeTab === 'revenue' ? (
          <LineChart data={revenueData} xDataKey="date" aspectRatio="">
            <ChartTooltip />
            <Line dataKey="revenue"  stroke="#c084fc" />
            <Line dataKey="expenses"  stroke="#38bdf8" />
            <XAxis />
          </LineChart>
        ) : (
          <BarChart data={timeData} xDataKey="date" aspectRatio="">
            <ChartTooltip />
            <Bar dataKey="hours"  fill="#c084fc" />
            <Bar dataKey="internal"  fill="#38bdf8" />
            <BarXAxis />
          </BarChart>
        )}
      </div>
      </div>
    </BorderGlow>
  );
}
