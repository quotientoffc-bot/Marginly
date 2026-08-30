import re

with open('src/app/dashboard/clients/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('useState<string>("manager")', 'useState<string>("client")')
# Wait, I originally wrote useState<string>("client") in clients/page.tsx!
# Let's just do a generic replace
content = content.replace('useState<string>("manager")', 'useState<string>("client")')
content = content.replace('useState("manager")', 'useState("client")')

with open('src/app/dashboard/clients/page.tsx', 'w') as f:
    f.write(content)
