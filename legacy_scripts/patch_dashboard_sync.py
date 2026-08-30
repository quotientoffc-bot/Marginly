with open('src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

new_use_effect = """  useEffect(() => {
    let savedRole = localStorage.getItem("user_role");
    
    // Allow URL override for testing/demoing the 3 views
    if (typeof window !== 'undefined' && window.location.search.includes('force_role=manager')) {
      savedRole = 'manager';
      localStorage.setItem('user_role', 'manager');
      window.dispatchEvent(new Event('role_updated'));
    } else if (typeof window !== 'undefined' && window.location.search.includes('force_role=client')) {
      savedRole = 'client';
      localStorage.setItem('user_role', 'client');
      window.dispatchEvent(new Event('role_updated'));
    }

    if (savedRole) setRole(savedRole);
    setMounted(true);"""

import re
content = re.sub(r'  useEffect\(\(\) => \{\n    let savedRole = localStorage\.getItem\("user_role"\);\n    \n    // Allow URL override for testing/demoing the 3 views\n    if \(typeof window !== \'undefined\' && window\.location\.search\.includes\(\'force_role=manager\'\)\) \{\n      savedRole = \'manager\';\n      localStorage\.setItem\(\'user_role\', \'manager\'\);\n    \} else if \(typeof window !== \'undefined\' && window\.location\.search\.includes\(\'force_role=client\'\)\) \{\n      savedRole = \'client\';\n      localStorage\.setItem\(\'user_role\', \'client\'\);\n    \}\n\n    if \(savedRole\) setRole\(savedRole\);\n    setMounted\(true\);', new_use_effect, content)

with open('src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)
