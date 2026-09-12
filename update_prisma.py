import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

old_team = """model teams {
  id            String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  business_name String
  business_type String?
  team_password String
  owner_id      String          @db.Uuid
  created_at    DateTime?       @default(now()) @db.Timestamptz(6)
  feed_messages feed_messages[]
  tasks         tasks[]
  team_members  team_members[]
  users         users           @relation(fields: [owner_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@schema("public")
}"""

new_team = """model teams {
  id            String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  business_name String
  business_type String?
  team_password String
  owner_id      String          @db.Uuid
  created_at    DateTime?       @default(now()) @db.Timestamptz(6)
  integrations  Json?           @default("{}")
  feed_messages feed_messages[]
  tasks         tasks[]
  team_members  team_members[]
  users         users           @relation(fields: [owner_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@schema("public")
}"""

content = content.replace(old_team, new_team)

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)
