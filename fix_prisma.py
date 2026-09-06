import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

# Add schemas property to datasource
content = content.replace('datasource db {\n  provider = "postgresql"\n}', 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n  schemas  = ["public", "auth"]\n}')

# Add previewFeatures = ["multiSchema"] to generator
content = content.replace('generator client {\n  provider = "prisma-client-js"\n}', 'generator client {\n  provider = "prisma-client-js"\n  previewFeatures = ["multiSchema"]\n}')

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)
