import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Add states for API keys
state_old = """  const [selected, setSelected] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);"""

state_new = """  const [selected, setSelected] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState("");"""

content = content.replace(state_old, state_new)

# Reset API key when modal opens
modal_close = """              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >"""

new_modal_close = """              <button 
                onClick={() => { setSelected(null); setApiKey(""); }}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >"""

content = content.replace(modal_close, new_modal_close)

# Modify the modal body
body_old = """                <h3 className="text-2xl font-medium text-white mb-2">Connect {selected.name}</h3>
                <p className="text-white/50 text-sm mb-8">{selected.desc}</p>
              </div>

              <div className="bg-black/20 p-6 border-t border-white/5">
                {connected.includes(selected.id) ? (
                  <div className="w-full py-3.5 bg-green-500/10 text-green-400 font-medium rounded-xl flex items-center justify-center gap-2 border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                    Integration Active
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    disabled={connecting}
                    className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                  >"""

body_new = """                <h3 className="text-2xl font-medium text-white mb-2">Connect {selected.name}</h3>
                <p className="text-white/50 text-sm mb-6">{selected.desc}</p>
                
                {selected.id === 'custom-ai' && !connected.includes(selected.id) && (
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
                )}
              </div>

              <div className="bg-black/20 p-6 border-t border-white/5">
                {connected.includes(selected.id) ? (
                  <div className="w-full py-3.5 bg-green-500/10 text-green-400 font-medium rounded-xl flex items-center justify-center gap-2 border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                    Integration Active
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    disabled={connecting || (selected.id === 'custom-ai' && !apiKey.trim())}
                    className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >"""

content = content.replace(body_old, body_new)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
