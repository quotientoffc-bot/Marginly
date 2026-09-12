import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Make sure createClient is imported for client-side Supabase auth
if 'createClient' not in content:
    content = content.replace('import { saveIntegrationToken } from "@/app/actions/ai";', 'import { saveIntegrationToken } from "@/app/actions/ai";\nimport { createClient } from "@/lib/supabase-client";')

old_handle = """  const handleConnect = async () => {
    setConnecting(true);
    try {
      if (selected && !['gmail', 'calendar', 'drive', 'docs'].includes(selected.id)) {
        await saveIntegrationToken(selected.id, apiKey);
      }
      setConnected(prev => [...prev, selected.id]);
      setTimeout(() => {
        setSelected(null);
        setApiKey("");
      }, 1000);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save integration");
    } finally {
      setConnecting(false);
    }
  };"""

new_handle = """  const handleConnect = async () => {
    setConnecting(true);
    
    // Execute real Google OAuth redirect for Google services
    if (selected && ['gmail', 'calendar', 'drive', 'docs'].includes(selected.id)) {
      try {
        const supabase = createClient();
        
        // Define specific scopes based on the integration
        let scopes = 'email profile';
        if (selected.id === 'gmail') scopes += ' https://www.googleapis.com/auth/gmail.readonly';
        if (selected.id === 'calendar') scopes += ' https://www.googleapis.com/auth/calendar.readonly';
        if (selected.id === 'drive' || selected.id === 'docs') scopes += ' https://www.googleapis.com/auth/drive.readonly';
        
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            scopes: scopes,
            redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/integrations`,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            }
          }
        });
        
        if (error) throw error;
        // The browser will redirect to Google, so we don't need to do anything else here.
        return;
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to initialize Google OAuth");
        setConnecting(false);
        return;
      }
    }

    try {
      if (selected) {
        await saveIntegrationToken(selected.id, apiKey);
      }
      setConnected(prev => [...prev, selected.id]);
      setTimeout(() => {
        setSelected(null);
        setApiKey("");
      }, 1000);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save integration");
    } finally {
      setConnecting(false);
    }
  };"""

content = content.replace(old_handle, new_handle)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
