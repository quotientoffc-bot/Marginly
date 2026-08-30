with open('src/components/layout/Sidebar.tsx', 'r') as f:
    content = f.read()

import re

old_logo = r'<div className="relative w-8 h-8 rounded-xl overflow-hidden mr-3">\s*<Image\s*src="/logo\.jpg"\s*alt="Marginly Logo"\s*fill\s*className="object-cover"\s*/>\s*</div>'

new_logo = r'''<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex-shrink-0 flex items-center justify-center mr-3">
          <span className="text-sm font-bold text-white">M</span>
        </div>'''

content = re.sub(old_logo, new_logo, content)

with open('src/components/layout/Sidebar.tsx', 'w') as f:
    f.write(content)

print("Patched Sidebar")
