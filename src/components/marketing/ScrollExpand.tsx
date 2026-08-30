import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandProps {
  src?: string;
  title: string;
  children?: React.ReactNode;
}

export default function ScrollExpand({ src, title, children }: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // When container enters from bottom (0), scale is 0.7. 
  // When container hits top (0.33 of 300vh), scale is 1.
  const scale = useTransform(scrollYProgress, [0, 0.33], [0.7, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.33], ["40px", "0px"]);
  
  // After it hits top and is pinned (0.33 to 0.66), text fades in
  const opacity = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
  const yContent = useTransform(scrollYProgress, [0.33, 0.66], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden p-0 md:p-0">
        <motion.div 
          style={{ scale, borderRadius }} 
          className="relative w-full h-screen bg-white/5 border border-white/10 overflow-hidden shadow-2xl origin-center"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'})` }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          
          <motion.div 
            style={{ opacity, y: yContent }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{title}</h2>
            <div className="text-xl md:text-2xl text-white/70 max-w-2xl">{children}</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
