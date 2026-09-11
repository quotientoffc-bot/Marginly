import re

with open('src/app/(auth)/login/page.tsx', 'r') as f:
    content = f.read()

tracking_old = """      // Calculate normalized coordinates based on the center of the avatar, not the window!
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center of avatar
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      // Normalize and damp the rotation
      const rotateX = Math.max(-45, Math.min(45, -(deltaY / 10)));
      const rotateY = Math.max(-45, Math.min(45, (deltaX / 10)));
      
      // Calculate slight translation
      const translateX = Math.max(-20, Math.min(20, deltaX / 20));
      const translateY = Math.max(-20, Math.min(20, deltaY / 20));
      
      // Apply immediate transform with no CSS transition lag
      containerRef.current.style.transform = `perspective(800px) translate3d(${translateX}px, ${translateY}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;"""

tracking_new = """      const rect = containerRef.current.getBoundingClientRect();
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

content = content.replace(tracking_old, tracking_new)

with open('src/app/(auth)/login/page.tsx', 'w') as f:
    f.write(content)
