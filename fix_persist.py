import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Add useEffect import if missing
if 'useEffect' not in content:
    content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')
else:
    # it might be `import { useState, useEffect }` already, let's check
    pass

# We need to ensure useEffect is available.
if 'useEffect' not in content:
    # Just generic replace
    content = re.sub(r'import { useState[^}]*} from "react";', 'import { useState, useEffect } from "react";', content)

# Now, update the state initialization and add useEffect for persistence
state_old = """  const [selected, setSelected] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState("");"""

state_new = """  const [selected, setSelected] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Load persisted connections on mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("marginly_active_integrations");
    if (saved) {
      try {
        setConnected(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save connections whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("marginly_active_integrations", JSON.stringify(connected));
    }
  }, [connected, isClient]);"""

content = content.replace(state_old, state_new)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
