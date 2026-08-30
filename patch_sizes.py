import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# 1. Increase ParticleText fontSize
content = content.replace('fontSize="clamp(3rem, 12vw, 8rem)"', 'fontSize="clamp(4rem, 15vw, 12rem)"')

# 2. Make video container bigger by changing max-w-6xl to max-w-[90vw] and reducing outer padding
content = content.replace('className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-12 opacity-0 pointer-events-none"', 'className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-8 opacity-0 pointer-events-none"')
content = content.replace('className="relative w-full max-w-6xl aspect-video bg-[#0a0a0a] rounded-2xl md:rounded-[32px] border border-white/10 shadow-2xl overflow-hidden"', 'className="relative w-[95vw] md:w-[85vw] max-w-7xl aspect-video bg-[#0a0a0a] rounded-2xl md:rounded-[40px] border border-white/10 shadow-2xl overflow-hidden"')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
