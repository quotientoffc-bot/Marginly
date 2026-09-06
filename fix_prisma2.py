import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

content = content.replace('  url      = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n', '')

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)
