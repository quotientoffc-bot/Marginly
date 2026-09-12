import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Define the dynamic input fields mapping
input_logic = """                {selected.id === 'custom-ai' && !connected.includes(selected.id) && (
                  <div className="w-full text-left mb-6">
                    <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1 mb-2 block">API Key (OpenAI / Anthropic)</label>
                    <input 
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                )}"""

new_input_logic = """                {!connected.includes(selected.id) && (
                  <div className="w-full text-left mb-6">
                    <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1 mb-2 block">
                      {selected.id === 'custom-ai' && "API Key (OpenAI / Anthropic)"}
                      {['gmail', 'calendar', 'drive', 'docs'].includes(selected.id) && "Google Cloud Service Account JSON"}
                      {selected.id === 'slack' && "Slack Bot Token (xoxb-...)"}
                      {selected.id === 'zoom' && "Zoom Server-to-Server OAuth Token"}
                      {selected.id === 'github' && "GitHub Personal Access Token (classic)"}
                      {selected.id === 'figma' && "Figma Personal Access Token"}
                      {selected.id === 'monday' && "Monday.com API v2 Token"}
                    </label>
                    {['gmail', 'calendar', 'drive', 'docs'].includes(selected.id) ? (
                      <textarea 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder='{\n  "type": "service_account",\n  "project_id": "..."\n}'
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-xs resize-none"
                      />
                    ) : (
                      <input 
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={selected.id === 'slack' ? "xoxb-..." : selected.id === 'github' ? "ghp_..." : "Enter token..."}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    )}
                  </div>
                )}"""

content = content.replace(input_logic, new_input_logic)

# Update the button disabled logic to require apiKey for ALL integrations
btn_old = """                    disabled={connecting || (selected.id === 'custom-ai' && !apiKey.trim())}"""
btn_new = """                    disabled={connecting || !apiKey.trim()}"""
content = content.replace(btn_old, btn_new)

# Update the button text to just be generic "Save Credentials" or "Authenticate"
btn_text_old = """                    ) : selected.id === 'custom-ai' ? (
                      'Save API Key'
                    ) : (
                      `Sign in with ${selected.name}`
                    )}"""
btn_text_new = """                    ) : (
                      `Authenticate ${selected.name}`
                    )}"""
content = content.replace(btn_text_old, btn_text_new)


with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
