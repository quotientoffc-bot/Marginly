import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Replace the import
content = content.replace('import ImmersiveCards from "@/components/marketing/ImmersiveCards";', 'import MassiveFeatures from "@/components/marketing/MassiveFeatures";')

# Replace the component usage
old_section = '''      {/* 3. 3D Immersive Cards Cascade */}
      <div id="features" className="relative z-20 border-t border-white/10 bg-[#050505]">
        <ImmersiveCards />
      </div>'''

new_section = '''      {/* 3. Massive 3D Features (Un-clumped) */}
      <div id="features" className="relative z-20 border-t border-white/10 bg-[#050505]">
        <MassiveFeatures />
      </div>'''

content = content.replace(old_section, new_section)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
