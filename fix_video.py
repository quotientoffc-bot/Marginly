import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Import DemoVideoModal
if 'import DemoVideoModal' not in content:
    content = content.replace('import CinematicDemo from "@/components/marketing/CinematicDemo";\n', 'import DemoVideoModal from "@/components/marketing/DemoVideoModal";\n')
else:
    # If CinematicDemo was already removed, let's just insert it safely
    if 'import DemoVideoModal' not in content:
        content = content.replace('import ScrollExpand from "@/components/marketing/ScrollExpand";', 'import DemoVideoModal from "@/components/marketing/DemoVideoModal";\nimport ScrollExpand from "@/components/marketing/ScrollExpand";')

# Add state
state_pattern = r'const heroRef = useRef<HTMLDivElement>\(null\);'
content = re.sub(state_pattern, 'const heroRef = useRef<HTMLDivElement>(null);\n  const [isVideoOpen, setIsVideoOpen] = useState(false);', content)

# Add onClick to the video card
click_target = 'className="hidden md:flex absolute right-16 bottom-24 w-[400px] aspect-[16/10] rounded-[2rem] p-1.5 bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl pointer-events-auto cursor-pointer group"'
content = content.replace(click_target, click_target + '\n            onClick={() => setIsVideoOpen(true)}')

# Add DemoVideoModal component at the end of the return statement
content = content.replace('    </div>\n  );\n}', '      <DemoVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />\n    </div>\n  );\n}')

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
