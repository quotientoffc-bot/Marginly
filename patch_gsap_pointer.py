with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

content = content.replace('opacity: 0,\n        scale: 0.95,\n        y: 20\n      }', 'opacity: 0,\n        scale: 0.95,\n        y: 20,\n        pointerEvents: "none"\n      }')
content = content.replace('opacity: 1,\n        scale: 1,\n        y: 0,\n        duration: 1\n      }', 'opacity: 1,\n        scale: 1,\n        y: 0,\n        pointerEvents: "auto",\n        duration: 1\n      }')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
