import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

old_profile = """model profiles {
  id              String         @id @db.Uuid
  organization_id String?        @db.Uuid
  email           String
  full_name       String?
  role            String?        @default("member")
  created_at      DateTime       @default(dbgenerated("timezone('utc'::text, now())")) @db.Timestamptz(6)
  users           users          @relation(fields: [id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  organizations   organizations? @relation(fields: [organization_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@schema("public")
}"""

new_profile = """model profiles {
  id              String         @id @db.Uuid
  organization_id String?        @db.Uuid
  email           String
  full_name       String?
  role            String?        @default("member")
  integrations    Json?          @default("{}")
  created_at      DateTime       @default(dbgenerated("timezone('utc'::text, now())")) @db.Timestamptz(6)
  users           users          @relation(fields: [id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  organizations   organizations? @relation(fields: [organization_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@schema("public")
}"""

content = content.replace(old_profile, new_profile)

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)
