import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Add id="features" to ImmersiveCards section
content = content.replace('      {/* 3. 3D Immersive Cards Cascade */}\n      <div className="relative z-20 border-t border-white/10 bg-[#050505]">', '      {/* 3. 3D Immersive Cards Cascade */}\n      <div id="features" className="relative z-20 border-t border-white/10 bg-[#050505]">')

# Add id="use-cases" to the Bento Grid
content = content.replace('      {/* 4. Asymmetrical Bento Grid (Double Bezel Architecture) */}\n      <section className="relative w-full min-h-[100dvh] bg-[#050505]', '      {/* 4. Asymmetrical Bento Grid (Double Bezel Architecture) */}\n      <section id="use-cases" className="relative w-full min-h-[100dvh] bg-[#050505]')

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
