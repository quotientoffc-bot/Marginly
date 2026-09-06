import re

with open('src/components/marketing/Scene.tsx', 'r') as f:
    content = f.read()

# Add Suspense import
if 'Suspense' not in content:
    content = content.replace('import { useRef, useMemo } from "react";', 'import { useRef, useMemo, Suspense } from "react";')

# Wrap Canvas children in Suspense
content = content.replace('<ambientLight intensity={0.5} />', '<Suspense fallback={null}>\n        <ambientLight intensity={0.5} />')
content = content.replace('<Environment preset="city" />\n      </Canvas>', '<Environment preset="city" />\n        </Suspense>\n      </Canvas>')

with open('src/components/marketing/Scene.tsx', 'w') as f:
    f.write(content)
