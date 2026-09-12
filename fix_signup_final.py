import re
import os

if os.path.exists('src/app/(auth)/signup/page.tsx'):
    with open('src/app/(auth)/signup/page.tsx', 'r') as f:
        content = f.read()

    # Remove the useEffect auto redirect
    hook = """  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);"""
    content = content.replace(hook, "")

    # Replace router.push with window.location.href
    content = content.replace('router.push("/dashboard")', 'window.location.href = "/dashboard"')
    content = content.replace("router.push('/dashboard')", "window.location.href = '/dashboard'")

    with open('src/app/(auth)/signup/page.tsx', 'w') as f:
        f.write(content)
