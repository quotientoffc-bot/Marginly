import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

if 'supabase.auth.getUser().then(' not in content:
    hook = """  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push('/dashboard');
      }
    };
    checkUser();"""
    content = content.replace("  useEffect(() => {", hook + "\n\n    const handleMouseMove = (e: MouseEvent) => {", 1)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
