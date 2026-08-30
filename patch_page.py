import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# 1. Add CinematicDemo import and remove DemoVideoModal, CinematicText imports
content = content.replace('import DemoVideoModal from "@/components/marketing/DemoVideoModal";', '')
content = content.replace('import CinematicText from "@/components/marketing/CinematicText";', 'import CinematicDemo from "@/components/marketing/CinematicDemo";')

# 2. Remove isDemoOpen state
content = re.sub(r'const \[isDemoOpen, setIsDemoOpen\] = useState\(false\);\n', '', content)

# 3. Replace <CinematicText /> with <CinematicDemo />
content = content.replace('<CinematicText />', '<CinematicDemo />')

# 4. Remove the <button> See it in action </button> from #highlights
button_regex = r'<button onClick=\{.*?setIsDemoOpen.*?\}.*?See it in action.*?<\/button>'
content = re.sub(button_regex, '', content, flags=re.DOTALL)

# 5. Remove <DemoVideoModal /> from the bottom
modal_regex = r'<DemoVideoModal isOpen=\{isDemoOpen\}.*?\/>'
content = re.sub(modal_regex, '', content)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
