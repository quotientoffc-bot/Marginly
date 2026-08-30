with open('src/components/layout/BottomDock.tsx', 'r') as f:
    content = f.read()

import re
content = re.sub(r'\}, \[pathname, window\.location\.search\]\);', '}, [pathname]);', content)

with open('src/components/layout/BottomDock.tsx', 'w') as f:
    f.write(content)
