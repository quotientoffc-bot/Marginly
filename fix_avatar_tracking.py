import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Remove the CSS transition to make tracking instant
container_old = """          <div ref={containerRef} className="relative w-40 h-40 mb-4 transition-transform duration-75 ease-out flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl">"""

container_new = """          <div ref={containerRef} className="relative w-40 h-40 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>"""

content = content.replace(container_old, container_new)

# Make tracking math instant and snappier
tilt_old = """      // Calculate normalized coordinates (-1 to 1)
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = (clientY / innerHeight) * 2 - 1;
      
      // Aggressive tilt (up to 35 degrees)
      const rotateX = ny * -35; 
      const rotateY = nx * 35;
      
      // Slight translation towards the cursor
      const translateX = nx * 20;
      const translateY = ny * 20;
      
      containerRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;"""

tilt_new = """      // Calculate normalized coordinates based on the center of the avatar, not the window!
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center of avatar
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      // Normalize and damp the rotation
      const rotateX = Math.max(-45, Math.min(45, -(deltaY / 10)));
      const rotateY = Math.max(-45, Math.min(45, (deltaX / 10)));
      
      // Calculate slight translation
      const translateX = Math.max(-20, Math.min(20, deltaX / 20));
      const translateY = Math.max(-20, Math.min(20, deltaY / 20));
      
      // Apply immediate transform with no CSS transition lag
      containerRef.current.style.transform = `perspective(800px) translate3d(${translateX}px, ${translateY}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;"""

content = content.replace(tilt_old, tilt_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
