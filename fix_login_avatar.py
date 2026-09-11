import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Uncomment imports
content = content.replace("// import { createAvatar, type AvatarController } from '@bible-strong/avatar-react';", "import { createAvatar, type AvatarController } from '@bible-strong/avatar-react';")
content = content.replace("// import '@bible-strong/avatar-react/styles.css';", "import '@bible-strong/avatar-react/styles.css';")
content = content.replace("// import avatarJson from './avatar.avatar.json';", "import avatarJson from './avatar.avatar.json';")

# Remove note
content = content.replace("// NOTE: Once you upload avatar.avatar.json, uncomment the lines above and below", "")

# Uncomment component creation
content = content.replace("// const StrobiAvatar = createAvatar(avatarJson);", "const StrobiAvatar = createAvatar(avatarJson as any);")

# Uncomment ref
content = content.replace("// const avatarRef = useRef<AvatarController>(null);", "const avatarRef = useRef<AvatarController>(null);")

# Uncomment animation logic in onSubmit
anim_logic_old = """
      // if (avatarRef.current) {
      //   avatarRef.current.play('wrong_password'); // or whatever the red animation key is
      //   avatarRef.current.setExpression('sad');
      // }
"""
anim_logic_new = """
      if (avatarRef.current) {
        avatarRef.current.play('angry'); // Using 'angry' from JSON
        avatarRef.current.setExpression('angry-brows');
      }
"""
content = content.replace(anim_logic_old, anim_logic_new)

# Replace JSX
jsx_old = """
            {/* 
              Uncomment when avatar.avatar.json is available:
              <StrobiAvatar ref={avatarRef} defaultAnimation="neutral" size={96} className="w-full h-full" />
            */}
            <span className="text-[10px] text-white/30 text-center px-2">Waiting for avatar.json</span>
"""
jsx_new = """
            <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={96} className="w-full h-full" />
"""
content = content.replace(jsx_old, jsx_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
