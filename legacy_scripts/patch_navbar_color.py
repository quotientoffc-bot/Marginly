with open('src/components/marketing/Navbar.tsx', 'r') as f:
    content = f.read()

old_class = 'bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl border border-black/5 text-black'
new_class = 'bg-gradient-to-r from-[#F9F8F6]/90 via-[#F5F4F0]/90 to-[#EFECE6]/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/40 text-black'

content = content.replace(old_class, new_class)

with open('src/components/marketing/Navbar.tsx', 'w') as f:
    f.write(content)
