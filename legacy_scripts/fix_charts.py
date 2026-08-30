import re

with open('src/components/DashboardCharts.tsx', 'r') as f:
    content = f.read()

# Fix aspect ratios and colors
content = content.replace('<LineChart data={revenueData} xDataKey="date">', '<LineChart data={revenueData} xDataKey="date" aspectRatio="">')
content = content.replace('<BarChart data={timeData} xDataKey="date">', '<BarChart data={timeData} xDataKey="date" aspectRatio="">')

content = content.replace('stroke="var(--chart-1)"', 'stroke="#c084fc"')
content = content.replace('stroke="var(--chart-2)"', 'stroke="#38bdf8"')

# Also let's just make sure the Bar colors are set
content = content.replace('<Bar dataKey="hours" name="Billable Hours" />', '<Bar dataKey="hours" name="Billable Hours" fill="#c084fc" />')
content = content.replace('<Bar dataKey="internal" name="Internal Time" />', '<Bar dataKey="internal" name="Internal Time" fill="#38bdf8" />')

with open('src/components/DashboardCharts.tsx', 'w') as f:
    f.write(content)
