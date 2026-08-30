import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Make the Ferrofluid more vibrant and cover more space
old_props = '''        <Ferrofluid
          colors={FERROFLUID_COLORS}
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

new_props = '''        <Ferrofluid
          colors={FERROFLUID_COLORS}
          speed={0.3}
          scale={1.5}
          turbulence={0.8}
          fluidity={0.2}
          rimWidth={0.3}
          sharpness={2}
          shimmer={1}
          glow={1.5}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.8}
          mouseRadius={0.5}
        />'''

content = content.replace(old_props, new_props)

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
