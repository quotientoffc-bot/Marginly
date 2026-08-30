import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Add Ferrofluid import
if 'import Ferrofluid' not in content:
    content = content.replace('import BorderGlow from "./BorderGlow";', 'import BorderGlow from "./BorderGlow";\nimport Ferrofluid from "./Ferrofluid";')

# Replace the static background with Ferrofluid
old_bg = '''      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-black/50" />'''

new_bg = '''      {/* Ferrofluid Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Ferrofluid
          colors={["#8b5cf6","#f472b6","#38bdf8"]}
          speed={0.5}
          scale={1}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={3}
          shimmer={1}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.3}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none" />'''

# Wait, the user asked for colors={["#ffffff","#ffffff","#ffffff"]} in their snippet!
new_bg_white = new_bg.replace('["#8b5cf6","#f472b6","#38bdf8"]', '["#ffffff","#ffffff","#ffffff"]')

content = content.replace(old_bg, new_bg_white)

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
