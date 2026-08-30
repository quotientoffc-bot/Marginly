import re

with open('src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Add import if missing
if 'import BorderGlow' not in content:
    content = content.replace('import MagicBento from "@/components/MagicBento";', 'import MagicBento from "@/components/MagicBento";\nimport BorderGlow from "@/components/marketing/BorderGlow";')

# Define the replacement template
glow_props = """
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#120F17"
          borderRadius={24}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={25}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
          className="relative overflow-hidden group h-full"
        >
          <div className="p-6">
"""

# Replace the tile wrappers
# Each tile currently starts with:
# <div className="glass-panel squircle p-6 border border-white/5 relative overflow-hidden group">
#   ...
# </div>
content = content.replace('<div className="glass-panel squircle p-6 border border-white/5 relative overflow-hidden group">', glow_props)

# Now we need to close the inner div and the BorderGlow component.
# This requires regex or carefully replacing the closing div.
# We know there are exactly 4 tiles in the grid.
# The structure is:
#         </div>
#         <h3 className="text-3xl font-medium text-white tracking-tight mb-1">{...}</h3>
#         <p className="text-sm text-white/50">...</p>
#       </div>

content = re.sub(r'(<p className="text-sm text-white/50">.*?</p>)\n\s*</div>', r'\1\n          </div>\n        </BorderGlow>', content)


with open('src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)
