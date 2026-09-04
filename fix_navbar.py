import re

with open('src/components/marketing/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace('"rgba(5, 5, 5, 0.8)"', '"rgba(5, 5, 5, 0.5)"')

with open('src/components/marketing/Navbar.tsx', 'w') as f:
    f.write(content)
