import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import Navbar
if 'import Navbar from "@/components/marketing/Navbar";' not in content:
    content = content.replace('import CinematicDemo from "@/components/marketing/CinematicDemo";', 'import CinematicDemo from "@/components/marketing/CinematicDemo";\nimport Navbar from "@/components/marketing/Navbar";')

# 2. Find and replace the entire <nav>...</nav> block
nav_regex = r'<nav className="fixed top-6.*?<\/nav>'
content = re.sub(nav_regex, '<Navbar />', content, flags=re.DOTALL)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
