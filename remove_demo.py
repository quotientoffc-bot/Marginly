import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'\{\/\* 2\. Cinematic Text Intro \*\/.*?<\/div>', '', content, flags=re.DOTALL)
content = content.replace('import CinematicDemo from "@/components/marketing/CinematicDemo";', '')

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
