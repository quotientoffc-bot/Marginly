import re

with open('src/app/dashboard/integrations/page.tsx', 'r') as f:
    content = f.read()

# Add Suspense import
if 'Suspense' not in content:
    content = content.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect, Suspense } from "react";')

# Rename the default export to IntegrationsContent and wrap it in a new default export with Suspense
old_export = "export default function IntegrationsPage() {"
new_export = """function IntegrationsContent() {"""
content = content.replace(old_export, new_export)

wrapper = """
export default function IntegrationsPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-white/50">Loading integrations...</div>}>
      <IntegrationsContent />
    </Suspense>
  );
}
"""
content = content + wrapper

with open('src/app/dashboard/integrations/page.tsx', 'w') as f:
    f.write(content)
