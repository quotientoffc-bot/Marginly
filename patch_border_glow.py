import re

with open('src/components/marketing/BorderGlow.css', 'r') as f:
    content = f.read()

# Add border-radius and overflow hidden to inner container
old_inner = '''.border-glow-inner {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  z-index: 1;
  width: 100%;
  height: 100%;
}'''

new_inner = '''.border-glow-inner {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: inherit;
  z-index: 1;
  width: 100%;
  height: 100%;
}'''

content = content.replace(old_inner, new_inner)

with open('src/components/marketing/BorderGlow.css', 'w') as f:
    f.write(content)
