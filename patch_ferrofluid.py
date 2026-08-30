import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Modify Ferrofluid props
old_props = '''        <Ferrofluid
          colors={["#ffffff","#ffffff","#ffffff"]}
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
        />'''

new_props = '''        <Ferrofluid
          colors={["#ffffff","#ffffff","#ffffff"]}
          speed={0.2}
          scale={3}
          turbulence={0.4}
          fluidity={0.3}
          rimWidth={0.1}
          sharpness={1.5}
          shimmer={0.5}
          glow={0.5}
          flowDirection="down"
          opacity={0.3}
          mouseInteraction={true}
          mouseStrength={0.5}
          mouseRadius={0.5}
        />'''

content = content.replace(old_props, new_props)

# Increase dimming layer from 40% to 70% to push it further into the background
content = content.replace('className="absolute inset-0 z-0 bg-black/40 pointer-events-none"', 'className="absolute inset-0 z-0 bg-black/70 pointer-events-none"')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
