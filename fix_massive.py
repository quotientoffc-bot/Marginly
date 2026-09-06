import re

with open('src/components/marketing/MassiveFeatures.tsx', 'r') as f:
    content = f.read()

# Replace static import with dynamic import
content = content.replace('import Scene from "./Scene";', 'import dynamic from "next/dynamic";\nconst Scene = dynamic(() => import("./Scene"), { ssr: false });')

# Add try-catch around GSAP code
old_gsap = '''    let ctx = gsap.context(() => {
      // Pin the entire container for the duration of the 3 sections
      ScrollTrigger.create({'''

new_gsap = '''    let ctx = gsap.context(() => {
      try {
        if (!containerRef.current) return;
        
        // Pin the entire container for the duration of the 3 sections
        ScrollTrigger.create({'''

content = content.replace(old_gsap, new_gsap)

# Add closing bracket for try-catch
old_end = '''        });
      });
      
    }, containerRef);'''

new_end = '''        });
      });
      } catch (e) { console.error("GSAP Error:", e); }
    }, containerRef);'''

content = content.replace(old_end, new_end)

with open('src/components/marketing/MassiveFeatures.tsx', 'w') as f:
    f.write(content)
