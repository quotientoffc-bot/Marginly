with open('src/components/marketing/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace('Q\n        </div>', 'M\n        </div>')

with open('src/components/marketing/Navbar.tsx', 'w') as f:
    f.write(content)

print("Patched Navbar Q to M")
