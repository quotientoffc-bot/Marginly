import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove the useEffect auto-redirect
hook = """  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push('/dashboard');
      }
    };
    checkUser();

    const handleMouseMove = (e: MouseEvent) => {"""

content = content.replace(hook, "  useEffect(() => {\n    const handleMouseMove = (e: MouseEvent) => {")


# 2. Fix the login redirect to use window.location.href for a hard redirect
old_success = """    }
 else {
      router.push("/dashboard");
    }"""
new_success = """    }
 else {
      window.location.href = "/dashboard";
    }"""
content = content.replace(old_success, new_success)


with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
