import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

handle_old = """      setTimeout(() => setSelected(null), 1000);
    }, 1500);"""

handle_new = """      setTimeout(() => {
        setSelected(null);
        setApiKey("");
      }, 1000);
    }, 1500);"""

content = content.replace(handle_old, handle_new)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
