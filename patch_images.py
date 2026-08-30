import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Change Ironclad Scope image (use a dark blue/teal abstract)
old_ironclad = 'title: "Ironclad Scope.", subtitle: "Tougher than any client revision.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"'
new_ironclad = 'title: "Ironclad Scope.", subtitle: "Tougher than any client revision.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"'
content = content.replace(old_ironclad, new_ironclad)

# Change ScrollExpand image (use a dark fluid geometric abstract)
old_scroll = 'src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"'
new_scroll = 'src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2564&auto=format&fit=crop"'
content = content.replace(old_scroll, new_scroll)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
