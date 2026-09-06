import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# 1. Add imports for the avatar
imports = """
import { useRef, useEffect } from "react";
// import { createAvatar, type AvatarController } from '@bible-strong/avatar-react';
// import '@bible-strong/avatar-react/styles.css';
// import avatarJson from './avatar.avatar.json';

// NOTE: Once you upload avatar.avatar.json, uncomment the lines above and below
// const StrobiAvatar = createAvatar(avatarJson);
"""
content = content.replace('import { createClient } from "@/lib/supabase-client";', 'import { createClient } from "@/lib/supabase-client";\n' + imports)

# 2. Add avatar state & ref
state_code = """
  // Avatar Controller Ref
  // const avatarRef = useRef<AvatarController>(null);
  
  // Mouse tracking logic for the avatar container
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 20; // max 20deg tilt
      const y = (clientY / innerHeight - 0.5) * -20;
      
      containerRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
"""

content = content.replace('  const supabase = createClient();', '  const supabase = createClient();\n' + state_code)

# 3. Add error animation trigger
error_trigger = """
    if (error) {
      setError(error.message);
      setIsLoading(false);
      
      // Trigger the wrong password animation
      // if (avatarRef.current) {
      //   avatarRef.current.play('wrong_password'); // or whatever the red animation key is
      //   avatarRef.current.setExpression('sad');
      // }
    }
"""

content = content.replace("""    if (error) {
      setError(error.message);
      setIsLoading(false);
    }""", error_trigger)

# 4. Inject the Avatar into the UI
ui_avatar = """
        <div className="flex items-center justify-center mb-8">
          <div ref={containerRef} className="relative w-24 h-24 mb-4 transition-transform duration-75 ease-out flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl">
            {/* 
              Uncomment when avatar.avatar.json is available:
              <StrobiAvatar ref={avatarRef} defaultAnimation="neutral" size={96} className="w-full h-full" />
            */}
            <span className="text-[10px] text-white/30 text-center px-2">Waiting for avatar.json</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-medium text-white mb-2 text-center">Welcome back.</h1>
"""

content = re.sub(r'<div className="flex items-center justify-center mb-8">.*?<h1 className="text-2xl font-medium text-white mb-2 text-center">Welcome back.</h1>', ui_avatar, content, flags=re.DOTALL)


with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
