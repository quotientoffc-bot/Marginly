import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

old_footer_links = """        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          <Link href="/refunds" className="hover:text-white transition-colors">Sales and Refunds</Link>
        </div>"""

new_footer_links = """        <div className="flex gap-4 flex-wrap">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          <Link href="/refunds" className="hover:text-white transition-colors">Sales and Refunds</Link>
        </div>"""

content = content.replace(old_footer_links, new_footer_links)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
