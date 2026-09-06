import re

with open('src/app/layout.tsx', 'r') as f:
    content = f.read()

if 'CookieConsent' not in content:
    content = content.replace('import SmoothScroll from "@/components/SmoothScroll";', 'import SmoothScroll from "@/components/SmoothScroll";\nimport CookieConsent from "@/components/CookieConsent";')
    content = content.replace('</body>', '  <CookieConsent />\n      </body>')

with open('src/app/layout.tsx', 'w') as f:
    f.write(content)
