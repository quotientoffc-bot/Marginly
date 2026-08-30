import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Replace the <nav> definition
old_nav_start = '<nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">'
new_nav_start = '<nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 flex justify-between items-center w-[95%] max-w-5xl bg-[#f5f5f0]/95 backdrop-blur-md rounded-[32px] shadow-2xl border border-black/5 text-black">'
content = content.replace(old_nav_start, new_nav_start)

# Replace the logo background/text (invert it)
old_logo = 'className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-bold"'
new_logo = 'className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-[#f5f5f0] font-bold"'
content = content.replace(old_logo, new_logo)

# Replace the link colors
old_link_class = 'className="text-white/60 hover:text-white transition-colors"'
new_link_class = 'className="text-black/60 hover:text-black font-semibold transition-colors"'
content = content.replace(old_link_class, new_link_class)

# Replace the 'Get Quotient' button
old_button = 'className="px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"'
new_button = 'className="px-5 py-2.5 rounded-full bg-black text-[#f5f5f0] hover:scale-105 transition-transform font-bold"'
content = content.replace(old_button, new_button)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
