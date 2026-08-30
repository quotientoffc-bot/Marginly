with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

content = content.replace('w-[90vw] md:w-[70vw] max-w-5xl', 'w-[95vw] md:w-[95vw] max-w-[1400px]')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
