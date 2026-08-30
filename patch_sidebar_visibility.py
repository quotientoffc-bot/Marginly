import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Add framer-motion import if missing
if 'import { motion, AnimatePresence }' not in content:
    content = content.replace('import { useEffect, useRef, useState } from "react";', 'import { useEffect, useRef, useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";')
elif 'import { motion }' in content and 'AnimatePresence' not in content:
    content = content.replace('import { motion }', 'import { motion, AnimatePresence }')

# Wrap the LineSidebar wrapper in a motion.div
old_jsx = '''      {/* Sticky Line Sidebar */}
      <div className="fixed left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block mix-blend-difference">
        <LineSidebar'''

new_jsx = '''      {/* Sticky Line Sidebar */}
      <AnimatePresence>
        {(activeSection === 0 || activeSection === 3 || activeSection === 4) && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block mix-blend-difference"
          >
            <LineSidebar'''

content = content.replace(old_jsx, new_jsx)

# Close the wrapper
old_close = '''          }}
        />
      </div>

      {/* Navigation */}'''

new_close = '''          }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}'''

content = content.replace(old_close, new_close)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
