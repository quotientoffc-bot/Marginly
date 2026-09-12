import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Add Book icon import
content = content.replace("Calendar, HardDrive, FileText, Video, BrainCircuit, Users,", "Calendar, HardDrive, FileText, Video, BrainCircuit, Users, Book,")

# Add Notion to INTEGRATIONS
old_docs = '{ id: \'docs\', icon: FileText, color: "text-blue-300", name: "Google Docs", desc: "Generate and sync change order PDFs." },'
new_docs = '{ id: \'docs\', icon: FileText, color: "text-blue-300", name: "Google Docs", desc: "Generate and sync change order PDFs." },\n  { id: \'notion\', icon: Book, color: "text-neutral-200", name: "Notion", desc: "Sync project specifications and documentation." },'
content = content.replace(old_docs, new_docs)

# Add Notion to grid layout
# Currently grid has:
# Row 1: 0, 1, 2, 3, 4, 5, 6 (monday)
# Row 2: 7, 8, 9, 3, 0, 1
# Row 3: 3, 4, 0 (col-span-2), 1, 2, 8
# Wait, why are there duplicate indices in the grid? e.g. 3, 0, 1 on row 2, and 3, 4 on row 3?
# The UI was just using random repeats to fill the space visually.
# Let's replace one of the repeats with Notion (index 10).
# I'll replace the `{renderTile(INTEGRATIONS[3], "aspect-square flex items-center justify-center")}` in Row 2 with Notion.

content = content.replace('{renderTile(INTEGRATIONS[3], "aspect-square flex items-center justify-center")}', '{renderTile(INTEGRATIONS[10], "aspect-square flex items-center justify-center")}', 1)

# Add Notion to token input label logic
old_label = "{selected.id === 'github' && \"GitHub Personal Access Token (classic)\"}"
new_label = "{selected.id === 'github' && \"GitHub Personal Access Token (classic)\"}\n                      {selected.id === 'notion' && \"Notion Internal Integration Token\"}"
content = content.replace(old_label, new_label)

# Add placeholder logic for Notion
old_placeholder = "placeholder={selected.id === 'slack' ? \"xoxb-...\" : selected.id === 'github' ? \"ghp_...\" : \"Enter token...\"}"
new_placeholder = "placeholder={selected.id === 'slack' ? \"xoxb-...\" : selected.id === 'github' ? \"ghp_...\" : selected.id === 'notion' ? \"secret_...\" : \"Enter token...\"}"
content = content.replace(old_placeholder, new_placeholder)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
