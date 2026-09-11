import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Add lock ref
ref_old = """  // Avatar Controller Ref
  const avatarRef = useRef<AvatarController>(null);
  const currentExpressionRef = useRef<string>('idle');"""

ref_new = """  // Avatar Controller Ref
  const avatarRef = useRef<AvatarController>(null);
  const currentExpressionRef = useRef<string>('idle');
  
  // Lock tracking during error animations
  const trackingLockRef = useRef<boolean>(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);"""

content = content.replace(ref_old, ref_new)

# Protect the mousemove tracking with the lock
tracking_old = """      // True Live Eye/Head Tracking Logic
      if (avatarRef.current) {"""

tracking_new = """      // True Live Eye/Head Tracking Logic
      if (avatarRef.current && !trackingLockRef.current) {"""

content = content.replace(tracking_old, tracking_new)

# Trigger the error animation and set the lock
error_old = """      // Trigger the wrong password animation
      if (avatarRef.current) {
        avatarRef.current.play('angry'); // Using 'angry' from JSON
        avatarRef.current.setExpression('angry-brows');
      }"""

error_new = """      // Trigger the wrong password animation
      if (avatarRef.current) {
        trackingLockRef.current = true;
        
        // Stop any idle animations and force the red shake expression
        avatarRef.current.stop();
        avatarRef.current.setExpression('angry-brows');
        currentExpressionRef.current = 'angry-brows';
        
        // Release the lock after 2.5 seconds to resume tracking
        if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
        lockTimeoutRef.current = setTimeout(() => {
          trackingLockRef.current = false;
        }, 2500);
      }"""

content = content.replace(error_old, error_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
