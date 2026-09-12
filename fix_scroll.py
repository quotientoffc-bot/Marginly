import re

with open('src/app/dashboard/settings/page.tsx', 'r') as f:
    content = f.read()

# Replace 'h-full' with 'min-h-full' in the client render block
old_code = '<div className="max-w-4xl mx-auto h-full flex flex-col pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">'
new_code = '<div className="max-w-4xl mx-auto min-h-full flex flex-col pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">'

content = content.replace(old_code, new_code)

with open('src/app/dashboard/settings/page.tsx', 'w') as f:
    f.write(content)
