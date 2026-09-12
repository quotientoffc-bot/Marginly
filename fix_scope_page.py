import re

with open('src/app/dashboard/scope-monitor/page.tsx', 'r') as f:
    content = f.read()

# Replace the import
content = content.replace('import GenerateButton from "@/components/ui/generate-button";', 'import GenerateButton from "@/components/ui/generate-button";\nimport DraftOrderButton from "@/components/ui/draft-order-button";')

# Replace the first usage
old_btn1 = """                  <GenerateButton 
                    defaultText="Draft Change Order" 
                    generatingText="Drafting..." 
                    className="w-full h-12 rounded-xl"
                  />"""
new_btn1 = """                  <DraftOrderButton defaultText="Draft Change Order" />"""
content = content.replace(old_btn1, new_btn1)

# Replace the second usage
old_btn2 = """                <GenerateButton 
                  defaultText="Draft Manual Change Order" 
                  generatingText="Drafting..." 
                  className="w-full h-12 rounded-xl"
                />"""
new_btn2 = """                <DraftOrderButton defaultText="Draft Manual Change Order" />"""
content = content.replace(old_btn2, new_btn2)

with open('src/app/dashboard/scope-monitor/page.tsx', 'w') as f:
    f.write(content)
