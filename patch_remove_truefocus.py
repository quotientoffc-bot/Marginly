import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Find and remove the True Focus section
truefocus_regex = r'\{\/\* True Focus Apple Intro \*\/\}.*?</section>\n'
content = re.sub(truefocus_regex, '', content, flags=re.DOTALL)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
