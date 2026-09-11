import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Make the container and avatar even larger
container_old = """          <div ref={containerRef} className="relative w-40 h-40 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={160} className="w-full h-full" />
          </div>"""

container_new = """          <div ref={containerRef} className="relative w-56 h-56 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={224} className="w-full h-full" />
          </div>"""

content = content.replace(container_old, container_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
