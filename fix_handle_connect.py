import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

old_handle = """    try {
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
    }"""

new_handle = """    try {
      if (selected) {
        const result = await saveIntegrationToken(selected.id, apiKey);
        if (result && result.error) {
          alert(result.error);
          setConnecting(false);
          return;
        }
      }
      setConnected(prev => [...prev, selected.id]);
      setTimeout(() => {
        setSelected(null);
        setApiKey("");
      }, 1000);
    } catch (error) {
      alert("Failed to save integration");
    } finally {
      setConnecting(false);
    }"""

content = content.replace(old_handle, new_handle)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
