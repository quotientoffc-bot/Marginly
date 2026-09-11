import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

# Add trackingRef
ref_old = """  // Mouse tracking logic for the avatar container
  const containerRef = useRef<HTMLDivElement>(null);"""

ref_new = """  // Mouse tracking logic for the avatar container
  const containerRef = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<HTMLDivElement>(null);"""

content = content.replace(ref_old, ref_new)

# Update DOM structure so the background circle is static
dom_old = """        <div className="flex items-center justify-center mb-8">
          <div ref={containerRef} className="relative w-56 h-56 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl transition-transform duration-500 ease-out" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={224} className="w-full h-full" />
          </div>
        </div>"""

dom_new = """        <div className="flex items-center justify-center mb-8">
          {/* Static background circle */}
          <div ref={trackingRef} className="relative w-56 h-56 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl">
            {/* Moving avatar container */}
            <div ref={containerRef} className="absolute inset-0 transition-transform duration-200 ease-out" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
              <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={224} className="w-full h-full" />
            </div>
          </div>
        </div>"""

content = content.replace(dom_old, dom_new)

# Update mouse tracking logic to use trackingRef and be much more responsive
logic_old = """  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      
      const rect = containerRef.current.getBoundingClientRect();
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
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);"""

logic_new = """  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !trackingRef.current) return;
      const { clientX, clientY } = e;
      
      // Use the STATIC tracking rect so math doesn't create feedback loops
      const rect = trackingRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      // Aggressive 3D physical tilt (up to 35 degrees)
      const rotateX = Math.max(-35, Math.min(35, -(deltaY / 15)));
      const rotateY = Math.max(-35, Math.min(35, (deltaX / 15)));
      
      // Aggressive physical translation towards cursor
      const translateX = Math.max(-30, Math.min(30, deltaX / 15));
      const translateY = Math.max(-30, Math.min(30, deltaY / 15));
      
      containerRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // True Live Eye/Head Tracking Logic
      if (avatarRef.current) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let targetExpression = 'idle';
        
        // Removed the large 80px deadzone so it ALWAYS tracks the mouse unless perfectly centered
        if (distance >= 10) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          
          if (angle >= -22.5 && angle < 22.5) {
            targetExpression = 'far-right-glance'; // Right
          } else if (angle >= 22.5 && angle < 67.5) {
            targetExpression = 'asymmetric-down-right'; // Down-Right
          } else if (angle >= 67.5 && angle < 112.5) {
            targetExpression = 'downward-gaze'; // Down
          } else if (angle >= 112.5 && angle < 157.5) {
            targetExpression = 'wide-down-left'; // Down-Left
          } else if (angle >= 157.5 || angle < -157.5) {
            targetExpression = 'surprised-left'; // Left (attentive-left doesn't look far enough, surprised-left goes to y:-16)
          } else if (angle >= -157.5 && angle < -112.5) {
            targetExpression = 'surprised-left'; // Up-Left (using surprised-left as there is no good extreme up-left)
          } else if (angle >= -112.5 && angle < -67.5) {
            targetExpression = 'upward-side-glance'; // Up
          } else if (angle >= -67.5 && angle < -22.5) {
            targetExpression = 'angry-right'; // Up-Right (angry-right has y:17, z:-11)
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
      }
    };
    
    // When mouse leaves the window, reset to idle and reset 3D transform
    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(1000px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)`;
      }
      if (avatarRef.current) {
        currentExpressionRef.current = 'idle';
        avatarRef.current.play('idle');
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);"""

content = content.replace(logic_old, logic_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
