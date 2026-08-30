import re

with open('src/components/DashboardCharts.tsx', 'r') as f:
    content = f.read()

# Replace recharts imports
recharts_import = """import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";"""

bklit_imports = """import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { ChartTooltip } from "@/components/charts/tooltip";
import { XAxis } from "@/components/charts/x-axis";
import { BarXAxis } from "@/components/charts/bar-x-axis";"""

content = content.replace(recharts_import, bklit_imports)

# Update revenueData
old_revenue = """const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
  { name: 'Aug', revenue: 5490, expenses: 3100 },
  { name: 'Sep', revenue: 6490, expenses: 2800 },
  { name: 'Oct', revenue: 7200, expenses: 3200 },
  { name: 'Nov', revenue: 8100, expenses: 3800 },
  { name: 'Dec', revenue: 9500, expenses: 4300 },
];"""

new_revenue = """const revenueData = [
  { date: '2024-01-01', revenue: 4000, expenses: 2400 },
  { date: '2024-02-01', revenue: 3000, expenses: 1398 },
  { date: '2024-03-01', revenue: 2000, expenses: 9800 },
  { date: '2024-04-01', revenue: 2780, expenses: 3908 },
  { date: '2024-05-01', revenue: 1890, expenses: 4800 },
  { date: '2024-06-01', revenue: 2390, expenses: 3800 },
  { date: '2024-07-01', revenue: 3490, expenses: 4300 },
  { date: '2024-08-01', revenue: 5490, expenses: 3100 },
  { date: '2024-09-01', revenue: 6490, expenses: 2800 },
  { date: '2024-10-01', revenue: 7200, expenses: 3200 },
  { date: '2024-11-01', revenue: 8100, expenses: 3800 },
  { date: '2024-12-01', revenue: 9500, expenses: 4300 },
];"""
content = content.replace(old_revenue, new_revenue)

# Replace the recharts AreaChart and BarChart
old_chart_area = """        {activeTab === 'revenue' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F87171" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                height={40}
                tick={{ dy: 10 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
                itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', opacity: 0.8 }}/>
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4ADE80" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#F87171" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeLogData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                height={40}
                tick={{ dy: 10 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', opacity: 0.8 }}/>
              <Bar dataKey="quoted" name="Quoted Hours" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Actual Hours" fill="#60A5FA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}"""

new_chart_area = """        {activeTab === 'revenue' ? (
          <div className="w-full h-full relative">
            <LineChart data={revenueData} className="w-full h-full">
              <Line dataKey="revenue" stroke="#4ADE80" strokeWidth={2} />
              <Line dataKey="expenses" stroke="#F87171" strokeWidth={2} />
              <XAxis />
              <ChartTooltip />
            </LineChart>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <BarChart data={timeLogData} xDataKey="name" className="w-full h-full">
              <Bar dataKey="quoted" fill="rgba(255,255,255,0.2)" />
              <Bar dataKey="actual" fill="#60A5FA" />
              <BarXAxis />
              <ChartTooltip />
            </BarChart>
          </div>
        )}"""

content = content.replace(old_chart_area, new_chart_area)

with open('src/components/DashboardCharts.tsx', 'w') as f:
    f.write(content)
