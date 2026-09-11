import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Make the tilt and movement much more aggressive and smooth
tilt_old = """      const x = (clientX / innerWidth - 0.5) * 20; // max 20deg tilt
      const y = (clientY / innerHeight - 0.5) * -20;
      
      containerRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;"""

tilt_new = """      // Calculate normalized coordinates (-1 to 1)
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = (clientY / innerHeight) * 2 - 1;
      
      // Aggressive tilt (up to 35 degrees)
      const rotateX = ny * -35; 
      const rotateY = nx * 35;
      
      // Slight translation towards the cursor
      const translateX = nx * 20;
      const translateY = ny * 20;
      
      containerRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;"""

content = content.replace(tilt_old, tilt_new)

# Make the container and avatar much larger
container_old = """          <div ref={containerRef} className="relative w-24 h-24 mb-4 transition-transform duration-75 ease-out flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl">
            <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={96} className="w-full h-full" />
          </div>"""

container_new = """          <div ref={containerRef} className="relative w-40 h-40 mb-4 transition-transform duration-75 ease-out flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl">
            <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={160} className="w-full h-full" />
          </div>"""

content = content.replace(container_old, container_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
