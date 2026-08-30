import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Replace the highlight cards array
old_array = '''          {[
            { title: "Intelligent Quoting.", subtitle: "Lightning-fast scope analysis.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
            { title: "Ironclad Scope.", subtitle: "Tougher than any client revision.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" },
            { title: "Real-time Margins.", subtitle: "Pro-level financial accuracy.", img: "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop" }
          ].map'''

new_array = '''          {[
            { title: "Intelligent Quoting.", subtitle: "Lightning-fast scope analysis.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
            { title: "Ironclad Scope.", subtitle: "Tougher than any client revision.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" },
            { title: "Real-time Margins.", subtitle: "Pro-level financial accuracy.", img: "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop" },
            { title: "Seamless Calendar.", subtitle: "Deep two-way sync integrations.", img: "https://images.unsplash.com/photo-1506784951206-b96e43c57cb3?q=80&w=2000&auto=format&fit=crop" },
            { title: "Bring Your Own AI.", subtitle: "Plug in any custom LLM model.", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000&auto=format&fit=crop" }
          ].map'''

content = content.replace(old_array, new_array)

# Also update the width of the container from 300vw to 400vw so it can scroll all 5 cards
content = content.replace('w-[300vw]', 'w-[400vw] md:w-[350vw]')

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
