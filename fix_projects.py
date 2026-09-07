import re

with open('src/app/dashboard/projects/page.tsx', 'r') as f:
    content = f.read()

# Add imports
content = content.replace('import { Search, Briefcase, Plus } from "lucide-react";', 
                          'import { Search, Briefcase, Plus } from "lucide-react";\nimport CreateForm from "@/components/ui/CreateForm";\nimport { createProject } from "@/app/dashboard/actions";')

# Fetch clients for the dropdown
fetch_clients = """
  let clients: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('clients')
      .select('id, name')
      .eq('user_id', user.id);
    if (data) clients = data;
  }
"""

content = content.replace("let projects: any[] = [];", fetch_clients + "\n  let projects: any[] = [];")

# Create form fields
form_fields = """
  const projectFields = [
    { name: 'name', label: 'Project Name', type: 'text' },
    { 
      name: 'client_id', 
      label: 'Client', 
      type: 'select', 
      options: clients.map(c => ({ label: c.name, value: c.id }))
    },
    { name: 'budget', label: 'Budget ($)', type: 'number' }
  ];
"""

content = content.replace("return (", form_fields + "\n  return (")

# Replace button
button_old = """<button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </button>"""
        
button_new = '<CreateForm title="New Project" buttonLabel="New Project" action={createProject} fields={projectFields} />'

content = content.replace(button_old, button_new)

with open('src/app/dashboard/projects/page.tsx', 'w') as f:
    f.write(content)
