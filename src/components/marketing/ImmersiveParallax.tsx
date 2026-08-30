import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImmersiveParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] overflow-hidden bg-gradient-to-b from-black via-[#F5F5F0]/5 to-black flex items-center justify-center">
      
      {/* Background Parallax Layer */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
      >
        <div className="w-[80vw] h-[80vw] max-w-4xl max-h-4xl rounded-full bg-[#F5F5F0]/5 blur-[120px]" />
      </motion.div>

      {/* Foreground Content */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          A completely new way to <br /> structure your agency.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          {[
            { title: "Fluid Workflows", desc: "Adapt instantly as client requirements pivot, without losing track of your margins." },
            { title: "Deep Insights", desc: "Understand exactly where your team spends time and where profits leak." },
            { title: "Client Portals", desc: "Give your clients a premium, transparent view into project progress." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-semibold mb-4 text-[#F5F5F0]">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
