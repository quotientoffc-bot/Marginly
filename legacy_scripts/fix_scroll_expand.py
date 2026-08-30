with open('src/components/marketing/ScrollExpand.tsx', 'r') as f:
    content = f.read()

content = content.replace('h-[500vh]', 'h-[300vh]')
content = content.replace('[0, 0.2]', '[0, 0.33]')
content = content.replace('[0.2, 0.4]', '[0.33, 0.66]')

with open('src/components/marketing/ScrollExpand.tsx', 'w') as f:
    f.write(content)
