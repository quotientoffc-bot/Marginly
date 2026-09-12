import re

with open('src/components/ui/glass-dock.tsx', 'r') as f:
    content = f.read()

old_code = 'className="relative h-4 flex items-center justify-center overflow-hidden w-full"'
new_code = 'className="relative h-6 flex items-center justify-center overflow-hidden w-full"'

content = content.replace(old_code, new_code)

with open('src/components/ui/glass-dock.tsx', 'w') as f:
    f.write(content)
