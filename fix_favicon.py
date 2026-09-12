import re

with open('src/app/layout.tsx', 'r') as f:
    content = f.read()

old_meta = """export const metadata: Metadata = {
  title: "Marginly | Premium Scope & Quote Management",
  description: "AI-powered quoting, client-request, and scope monitor.",
};"""

new_meta = """export const metadata: Metadata = {
  title: "Marginly | Premium Scope & Quote Management",
  description: "AI-powered quoting, client-request, and scope monitor.",
  icons: {
    icon: "/logo.jpg",
  }
};"""

content = content.replace(old_meta, new_meta)

with open('src/app/layout.tsx', 'w') as f:
    f.write(content)
