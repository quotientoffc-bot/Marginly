import re

with open('src/app/dashboard/settings/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('useState("manager")', 'useState("client")')

with open('src/app/dashboard/settings/page.tsx', 'w') as f:
    f.write(content)
