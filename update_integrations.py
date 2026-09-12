import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Add import for saveIntegrationToken
if 'saveIntegrationToken' not in content:
    content = content.replace('import { motion, AnimatePresence } from "framer-motion";', 'import { motion, AnimatePresence } from "framer-motion";\nimport { saveIntegrationToken } from "@/app/actions/ai";')

# Update handleConnect
old_handle = """  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      if (selected) {
        setConnected(prev => [...prev, selected.id]);
      }
      setTimeout(() => {
        setSelected(null);
        setApiKey("");
      }, 1000);
    }, 1500);
  };"""

new_handle = """  const handleConnect = async () => {
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

content = content.replace(old_handle, new_handle)

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
