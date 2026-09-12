import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Make sure we use useSearchParams to detect the successful redirect
if 'useSearchParams' not in content:
    content = content.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect } from "react";\nimport { useSearchParams, useRouter } from "next/navigation";')

# Add the search params hook
state_hook = '  const [isClient, setIsClient] = useState(false);'
state_hook_new = '  const [isClient, setIsClient] = useState(false);\n  const searchParams = useSearchParams();\n  const router = useRouter();'
content = content.replace(state_hook, state_hook_new)

# Automatically add the integration if redirected back successfully
effect_old = """  // Load persisted connections on mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("marginly_active_integrations");
    if (saved) {
      try {
        setConnected(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);"""

effect_new = """  // Load persisted connections on mount
  useEffect(() => {
    setIsClient(true);
    let initialConnected: string[] = [];
    
    const saved = localStorage.getItem("marginly_active_integrations");
    if (saved) {
      try {
        initialConnected = JSON.parse(saved);
        setConnected(initialConnected);
      } catch (e) {}
    }

    // Check if we just returned from a successful OAuth flow
    const connectedParam = searchParams.get('connected');
    if (connectedParam && !initialConnected.includes(connectedParam)) {
      setConnected(prev => {
        const updated = [...prev, connectedParam];
        localStorage.setItem("marginly_active_integrations", JSON.stringify(updated));
        return updated;
      });
      // Clean up the URL
      router.replace('/dashboard/integrations');
    }
  }, [searchParams, router]);"""
content = content.replace(effect_old, effect_new)

# Update the redirect URL
old_redirect = 'redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/integrations`,'
new_redirect = 'redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/integrations?connected=${selected.id}`,'
content = content.replace(old_redirect, new_redirect)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
