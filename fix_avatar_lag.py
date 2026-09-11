import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Add a ref to track the current expression to avoid spamming the API
ref_old = """  // Avatar Controller Ref
  const avatarRef = useRef<AvatarController>(null);
  
  // Mouse tracking logic for the avatar container
  const containerRef = useRef<HTMLDivElement>(null);"""

ref_new = """  // Avatar Controller Ref
  const avatarRef = useRef<AvatarController>(null);
  const currentExpressionRef = useRef<string>('idle');
  
  // Mouse tracking logic for the avatar container
  const containerRef = useRef<HTMLDivElement>(null);"""

content = content.replace(ref_old, ref_new)

# Add CSS smoothing and fix the spamming logic
tracking_old = """      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      const rotateX = Math.max(-25, Math.min(25, -(deltaY / 15)));
      const rotateY = Math.max(-25, Math.min(25, (deltaX / 15)));
      
      const translateX = Math.max(-10, Math.min(10, deltaX / 30));
      const translateY = Math.max(-10, Math.min(10, deltaY / 30));
      
      containerRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // True Live Eye/Head Tracking Logic
      if (avatarRef.current) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance < 80) {
          // Mouse is close to center, return to default
          avatarRef.current.play('idle');
        } else {
          // Calculate angle (-180 to 180 degrees)
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          let expression = 'neutral';
          
          if (angle >= -22.5 && angle < 22.5) {
            expression = 'far-right-glance'; // Right
          } else if (angle >= 22.5 && angle < 67.5) {
            expression = 'asymmetric-down-right'; // Bottom-Right
          } else if (angle >= 67.5 && angle < 112.5) {
            expression = 'downward-gaze'; // Bottom
          } else if (angle >= 112.5 && angle < 157.5) {
            expression = 'wide-down-left'; // Bottom-Left
          } else if (angle >= 157.5 || angle < -157.5) {
            expression = 'attentive-left'; // Left
          } else if (angle >= -157.5 && angle < -112.5) {
            expression = 'asymmetric-up-left'; // Top-Left
          } else if (angle >= -112.5 && angle < -67.5) {
            expression = 'upward-side-glance'; // Top
          } else if (angle >= -67.5 && angle < -22.5) {
            expression = 'upward-side-glance'; // Top-Right (reusing as there's no perfect match)
          }
          
          // Cast to any to avoid strict type errors for the ExpressionKey
          avatarRef.current.setExpression(expression as any);
        }
      }"""

tracking_new = """      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      const rotateX = Math.max(-20, Math.min(20, -(deltaY / 20)));
      const rotateY = Math.max(-20, Math.min(20, (deltaX / 20)));
      
      const translateX = Math.max(-10, Math.min(10, deltaX / 30));
      const translateY = Math.max(-10, Math.min(10, deltaY / 30));
      
      containerRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // True Live Eye/Head Tracking Logic
      if (avatarRef.current) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let targetExpression = 'idle';
        
        if (distance >= 80) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          
          if (angle >= -22.5 && angle < 22.5) {
            targetExpression = 'far-right-glance';
          } else if (angle >= 22.5 && angle < 67.5) {
            targetExpression = 'asymmetric-down-right';
          } else if (angle >= 67.5 && angle < 112.5) {
            targetExpression = 'downward-gaze';
          } else if (angle >= 112.5 && angle < 157.5) {
            targetExpression = 'wide-down-left';
          } else if (angle >= 157.5 || angle < -157.5) {
            targetExpression = 'attentive-left';
          } else if (angle >= -157.5 && angle < -112.5) {
            targetExpression = 'asymmetric-up-left';
          } else if (angle >= -112.5 && angle < -67.5) {
            targetExpression = 'upward-side-glance';
          } else if (angle >= -67.5 && angle < -22.5) {
            targetExpression = 'upward-side-glance';
          }
        }
        
        // ONLY update the API if the expression actually changed
        if (currentExpressionRef.current !== targetExpression) {
          currentExpressionRef.current = targetExpression;
          if (targetExpression === 'idle') {
            avatarRef.current.play('idle');
          } else {
            avatarRef.current.setExpression(targetExpression as any);
          }
        }
      }"""

content = content.replace(tracking_old, tracking_new)

# Add smoothing transition to the container so the 3D parallax is buttery
container_old = """          <div ref={containerRef} className="relative w-56 h-56 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>"""

container_new = """          <div ref={containerRef} className="relative w-56 h-56 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl transition-transform duration-500 ease-out" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>"""

content = content.replace(container_old, container_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
