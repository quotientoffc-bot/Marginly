import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Restore Ferrofluid visibility
old_props = '''        <Ferrofluid
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

# Increase opacity back to 0.8 and make glow slightly stronger so it isn't invisible
new_props = '''        <Ferrofluid
          colors={["#ffffff","#ffffff","#ffffff"]}
          speed={0.2}
          scale={2.5}
          turbulence={0.4}
          fluidity={0.3}
          rimWidth={0.1}
          sharpness={1.5}
          shimmer={0.5}
          glow={1}
          flowDirection="down"
          opacity={0.8}
          mouseInteraction={true}
          mouseStrength={0.5}
          mouseRadius={0.5}
        />'''

content = content.replace(old_props, new_props)

# Reduce the black overlay from 70% back to 50%
content = content.replace('className="absolute inset-0 z-0 bg-black/70 pointer-events-none"', 'className="absolute inset-0 z-0 bg-black/50 pointer-events-none"')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
