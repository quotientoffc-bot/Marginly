import re

with open('src/app/layout.tsx', 'r') as f:
    content = f.read()

if 'SmoothScroll' not in content:
    content = content.replace('import { AnimatedRays } from "@/components/ui/animated-rays";', 'import { AnimatedRays } from "@/components/ui/animated-rays";\nimport SmoothScroll from "@/components/SmoothScroll";')
    content = content.replace('{children}', '<SmoothScroll>{children}</SmoothScroll>')

with open('src/app/layout.tsx', 'w') as f:
    f.write(content)
