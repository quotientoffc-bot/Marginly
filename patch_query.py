import re

with open('src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Replace the useEffect block to check window.location.search
new_effect = """
  useEffect(() => {
    let savedRole = localStorage.getItem("user_role");
    
    // Allow URL override for testing/demoing the 3 views
    if (typeof window !== 'undefined' && window.location.search.includes('force_role=manager')) {
      savedRole = 'manager';
      localStorage.setItem('user_role', 'manager');
    } else if (typeof window !== 'undefined' && window.location.search.includes('force_role=client')) {
      savedRole = 'client';
      localStorage.setItem('user_role', 'client');
    }

    if (savedRole) setRole(savedRole);
    setMounted(true);

    if (!savedRole || savedRole === "client") {
      fetchDashboardMetrics().then(data => setMetrics(data));
    } else if (savedRole === "manager") {
      getAdminTelemetry().then(data => setTelemetry(data));
    }
  }, []);
"""

content = re.sub(r'  useEffect\(\(\) => \{.*?  \}, \[\]\);', new_effect.strip(), content, flags=re.DOTALL)

with open('src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)
