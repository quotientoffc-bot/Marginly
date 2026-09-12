import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# 1. Hide the input container for Google services
old_input_wrap = "{!connected.includes(selected.id) && ("
new_input_wrap = "{!connected.includes(selected.id) && !['gmail', 'calendar', 'drive', 'docs'].includes(selected.id) && ("
content = content.replace(old_input_wrap, new_input_wrap)

# 2. Update the button disabled state (Google services don't need apiKey)
old_btn_disabled = "disabled={connecting || !apiKey.trim()}"
new_btn_disabled = "disabled={connecting || (!['gmail', 'calendar', 'drive', 'docs'].includes(selected.id) && !apiKey.trim())}"
content = content.replace(old_btn_disabled, new_btn_disabled)

# 3. Update the button text for Google services
old_btn_text = """                    ) : (
                      `Authenticate ${selected.name}`
                    )}"""
new_btn_text = """                    ) : ['gmail', 'calendar', 'drive', 'docs'].includes(selected.id) ? (
                      `Sign in with Google`
                    ) : (
                      `Authenticate ${selected.name}`
                    )}"""
content = content.replace(old_btn_text, new_btn_text)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
