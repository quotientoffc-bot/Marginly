import os

def replace_in_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

page_replacements = {
    'text-orange-500': 'text-[#F5F5F0]',
    'bg-gradient-to-r from-orange-400 to-red-600': 'text-[#F5F5F0]',
    'bg-orange-600 hover:bg-orange-500 text-white font-medium transition-colors shadow-[0_0_40px_rgba(249,115,22,0.4)]': 'bg-[#F5F5F0] hover:bg-white text-black font-medium transition-colors shadow-[0_0_40px_rgba(245,245,240,0.15)]',
    'from-orange-500/20 to-transparent border-orange-500/20': 'from-[#F5F5F0]/10 to-transparent border-[#F5F5F0]/20',
    'bg-orange-500/50': 'bg-[#F5F5F0]/50',
    'text-orange-500 hover:text-orange-400': 'text-[#F5F5F0] hover:text-white',
    'bg-orange-500 text-black': 'bg-[#F5F5F0] text-black',
    'text-orange-500': 'text-[#F5F5F0]',
    'bg-blue-500/10': 'bg-[#F5F5F0]/5',
    'bg-green-500/10': 'bg-[#F5F5F0]/5'
}

demo_modal_replacements = {
    'bg-orange-500': 'bg-[#F5F5F0]',
    'bg-orange-500/20': 'bg-[#F5F5F0]/20',
    'text-orange-500': 'text-[#F5F5F0]',
    'border-orange-500/30': 'border-[#F5F5F0]/30',
    'bg-orange-500 text-white': 'bg-[#F5F5F0] text-black'
}

immersive_cards_replacements = {
    'from-orange-500/20 to-orange-900/20': 'from-[#F5F5F0]/10 to-transparent',
    'border-orange-500/30': 'border-[#F5F5F0]/20'
}

immersive_parallax_replacements = {
    'from-black via-orange-950/20 to-black': 'from-black via-[#F5F5F0]/5 to-black',
    'bg-orange-600/20': 'bg-[#F5F5F0]/5',
    'text-orange-400': 'text-[#F5F5F0]'
}

replace_in_file('src/app/(marketing)/page.tsx', page_replacements)
replace_in_file('src/components/marketing/DemoVideoModal.tsx', demo_modal_replacements)
replace_in_file('src/components/marketing/ImmersiveCards.tsx', immersive_cards_replacements)
replace_in_file('src/components/marketing/ImmersiveParallax.tsx', immersive_parallax_replacements)
