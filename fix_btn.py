import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

btn_old = """                    ) : (
                      `Connect to ${selected.name}`
                    )}"""

btn_new = """                    ) : selected.id === 'custom-ai' ? (
                      'Save API Key'
                    ) : (
                      `Sign in with ${selected.name}`
                    )}"""

content = content.replace(btn_old, btn_new)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
