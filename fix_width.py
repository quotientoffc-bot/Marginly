import re

with open('src/components/ui/glass-dock.tsx', 'r') as f:
    content = f.read()

# Replace min-w-[100px] with w-max min-w-[100px]
old_code = "'min-w-[100px] '"
new_code = "'w-max min-w-[100px] '"

content = content.replace(old_code, new_code)

with open('src/components/ui/glass-dock.tsx', 'w') as f:
    f.write(content)
