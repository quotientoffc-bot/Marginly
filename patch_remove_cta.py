import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Find and remove the "Footer CTA" section
cta_regex = r'\{\/\* Footer CTA \*\/\}.*?</section>\n'
content = re.sub(cta_regex, '', content, flags=re.DOTALL)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
