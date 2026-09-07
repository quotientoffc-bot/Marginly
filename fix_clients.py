import re

with open('src/app/dashboard/clients/page.tsx', 'r') as f:
    content = f.read()

# Add imports
content = content.replace('import GenerateButton from "@/components/ui/generate-button";', 
                          'import GenerateButton from "@/components/ui/generate-button";\nimport CreateForm from "@/components/ui/CreateForm";\nimport { createClient } from "@/app/dashboard/actions";')

# Create form fields
form_fields = """
  const clientFields = [
    { name: 'name', label: 'Business Name', type: 'text' },
    { name: 'email', label: 'Contact Email', type: 'email' }
  ];
"""

content = content.replace("const [loading, setLoading] = useState(true);", form_fields + "\n  const [loading, setLoading] = useState(true);")

# Replace button
button_old = """<button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/90 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Client
          </button>"""
        
button_new = '<CreateForm title="New Client" buttonLabel="Add Client" action={createClient} fields={clientFields} />'

content = content.replace(button_old, button_new)

with open('src/app/dashboard/clients/page.tsx', 'w') as f:
    f.write(content)
