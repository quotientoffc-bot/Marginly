with open('src/components/DashboardCharts.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace('import { BarXAxis } from "@/components/charts/bar-x-axis";', 'import { BarXAxis } from "@/components/charts/bar-x-axis";\nimport BorderGlow from "@/components/marketing/BorderGlow";')

# Define glow props
glow_start = """
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
"""

content = content.replace('<div className="glass-panel squircle-md p-6 border border-white/5 mt-4 relative overflow-hidden">', glow_start)

# Now close BorderGlow at the very end
content = content.replace('      </div>\n    </div>\n  );\n}', '      </div>\n      </div>\n    </BorderGlow>\n  );\n}')

with open('src/components/DashboardCharts.tsx', 'w') as f:
    f.write(content)
