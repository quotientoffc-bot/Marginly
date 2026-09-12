import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Fix the Custom AI Model subtitle
old_desc = '{ id: \'custom-ai\', icon: BrainCircuit, color: "text-purple-400", name: "Custom AI Model", desc: "OPENAI / ANTHROPIC / LOCAL. Bring your own API key." }'
new_desc = '{ id: \'custom-ai\', icon: BrainCircuit, color: "text-purple-400", name: "Custom AI Model", desc: "OPENAI / ANTHROPIC / GEMINI. Bring your own API key." }'
content = content.replace(old_desc, new_desc)

old_tile_text = '<p className="text-[9px] text-white/50">OPENAI / ANTHROPIC / LOCAL</p>'
new_tile_text = '<p className="text-[9px] text-white/50">OPENAI / ANTHROPIC / GEMINI</p>'
content = content.replace(old_tile_text, new_tile_text)

# Fix the input label
old_label = '{selected.id === \'custom-ai\' && "API Key (OpenAI / Anthropic)"}'
new_label = '{selected.id === \'custom-ai\' && "API Key (OpenAI / Anthropic / Gemini)"}'
content = content.replace(old_label, new_label)

# Add autoComplete="off" to the password input to prevent iCloud autofill
old_input = """                      <input 
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}"""
                        
new_input = """                      <input 
                        type="password"
                        autoComplete="new-password"
                        data-1p-ignore
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}"""

content = content.replace(old_input, new_input)


with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
