import re

try:
    with open('src/app/(auth)/signup/page.tsx', 'r') as f:
        content = f.read()

    if 'supabase.auth.getUser().then(' not in content:
        # Assuming there is a useEffect, otherwise we inject one.
        if 'useEffect(() => {' in content:
            hook = """  useEffect(() => {
        const checkUser = async () => {
          const { data } = await supabase.auth.getUser();
          if (data?.user) {
            router.push('/dashboard');
          }
        };
        checkUser();"""
            content = content.replace("  useEffect(() => {", hook + "\n", 1)
        else:
            # Add useEffect if missing
            imports = "import { useEffect } from 'react';"
            if 'import { useEffect' not in content:
                content = content.replace('import { useState', 'import { useState, useEffect')
            
            hook = """  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);"""
            content = content.replace("const router = useRouter();", "const router = useRouter();\n" + hook)

    with open('src/app/(auth)/signup/page.tsx', 'w') as f:
        f.write(content)
except FileNotFoundError:
    pass
