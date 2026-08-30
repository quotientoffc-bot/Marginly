import re

with open('src/components/marketing/ScrollExpand.tsx', 'r') as f:
    content = f.read()

# Replace the uniform black overlay with a gradient that fades to solid black at the bottom
old_overlay = '<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />'
new_overlay = '<div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black backdrop-blur-[2px]" />'

content = content.replace(old_overlay, new_overlay)

with open('src/components/marketing/ScrollExpand.tsx', 'w') as f:
    f.write(content)
