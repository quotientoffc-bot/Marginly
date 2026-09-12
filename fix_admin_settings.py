import re

with open('src/app/dashboard/settings/page.tsx', 'r') as f:
    content = f.read()

# Revert min-h-full to h-full for the admin root container
old_code = '<div className="max-w-6xl mx-auto min-h-full flex flex-col pt-8">'
new_code = '<div className="max-w-6xl mx-auto h-full flex flex-col pt-8">'

content = content.replace(old_code, new_code)

with open('src/app/dashboard/settings/page.tsx', 'w') as f:
    f.write(content)
