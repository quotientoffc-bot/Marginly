import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Define FERROFLUID_COLORS outside the component
if 'const FERROFLUID_COLORS' not in content:
    content = content.replace('export default function CinematicDemo() {', 'const FERROFLUID_COLORS = ["#ffffff", "#ffffff", "#ffffff"];\n\nexport default function CinematicDemo() {')

# Use it in the component
content = content.replace('colors={["#ffffff","#ffffff","#ffffff"]}', 'colors={FERROFLUID_COLORS}')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
