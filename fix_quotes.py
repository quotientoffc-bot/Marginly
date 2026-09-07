import re

with open('src/app/dashboard/quotes/page.tsx', 'r') as f:
    content = f.read()

# Add imports
content = content.replace('import { Search, FileText, Plus } from "lucide-react";', 
                          'import { Search, FileText, Plus } from "lucide-react";\nimport CreateForm from "@/components/ui/CreateForm";\nimport { createQuote } from "@/app/dashboard/actions";')

# Fetch projects for the dropdown
fetch_projects = """
  let projects: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('projects')
      .select('id, name')
      .eq('user_id', user.id);
    if (data) projects = data;
  }
"""

content = content.replace("let quotes: any[] = [];", fetch_projects + "\n  let quotes: any[] = [];")

# Create form fields
form_fields = """
  const quoteFields = [
    { 
      name: 'project_id', 
      label: 'Project', 
      type: 'select', 
      options: projects.map(p => ({ label: p.name, value: p.id }))
    },
    { name: 'amount', label: 'Amount ($)', type: 'number' },
    { 
      name: 'type', 
      label: 'Quote Type', 
      type: 'select', 
      options: [
        { label: 'Standard Quote', value: 'Standard Quote' },
        { label: 'Change Order', value: 'Change Order' },
        { label: 'Retainer', value: 'Retainer' }
      ]
    }
  ];
"""

content = content.replace("return (", form_fields + "\n  return (")

# Replace button
button_old = """<button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Quote
        </button>"""
        
button_new = '<CreateForm title="New Quote" buttonLabel="New Quote" action={createQuote} fields={quoteFields} />'

content = content.replace(button_old, button_new)

with open('src/app/dashboard/quotes/page.tsx', 'w') as f:
    f.write(content)
