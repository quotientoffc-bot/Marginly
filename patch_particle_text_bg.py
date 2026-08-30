import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Replace the ParticleText container
old_container = '''      <div 
        ref={particleContainerRef} 
        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none"
      >
        {mounted && (
          <div style={{ width: '100%', height: 360 }}>
            <ParticleText'''

new_container = '''      <div 
        ref={particleContainerRef} 
        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none"
      >
        {/* Foggy box background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] max-w-5xl h-[250px] md:h-[300px] bg-black/40 backdrop-blur-md rounded-[40px] border border-white/10" />
        
        {mounted && (
          <div className="relative z-10" style={{ width: '100%', height: 360 }}>
            <ParticleText'''

content = content.replace(old_container, new_container)

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
