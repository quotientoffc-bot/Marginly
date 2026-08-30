with open('src/components/layout/BottomDock.tsx', 'r') as f:
    content = f.read()

new_use_effect = """  useEffect(() => {
    const handleRoleCheck = () => {
      let savedRole = localStorage.getItem("user_role");
      if (typeof window !== 'undefined' && window.location.search.includes('force_role=manager')) {
        savedRole = 'manager';
      } else if (typeof window !== 'undefined' && window.location.search.includes('force_role=client')) {
        savedRole = 'client';
      }
      if (savedRole) setRole(savedRole);
    };
    
    handleRoleCheck();
    setMounted(true);
    
    // Listen for custom event in case page changes it
    window.addEventListener('role_updated', handleRoleCheck);
    return () => window.removeEventListener('role_updated', handleRoleCheck);
  }, [pathname, window.location.search]);"""

import re
content = re.sub(r'  useEffect\(\(\) => \{\n    const savedRole = localStorage\.getItem\("user_role"\);\n    if \(savedRole\) setRole\(savedRole\);\n    setMounted\(true\);\n  \}, \[\]\);', new_use_effect, content)

with open('src/components/layout/BottomDock.tsx', 'w') as f:
    f.write(content)
