with open('src/components/layout/BottomDock.tsx', 'r') as f:
    content = f.read()

import re

# Remove Clients from clientNavigation array
content = re.sub(r'\s*\{\s*name:\s*"Clients",\s*href:\s*"/dashboard/clients",\s*icon:\s*Users\s*\},', '', content)

with open('src/components/layout/BottomDock.tsx', 'w') as f:
    f.write(content)
