import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImmersiveCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const cards = [
    { title: "Scope Monitor", desc: "Instantly detect out-of-bounds requests before a single hour is billed.", color: "from-blue-500/20 to-blue-900/20", border: "border-blue-500/30" },
    { title: "Dynamic Quoting", desc: "Generate mathematically precise quotes driven by your historical project data.", color: "from-[#F5F5F0]/10 to-transparent", border: "border-[#F5F5F0]/20" },
    { title: "Time Intelligence", desc: "Seamlessly map hours worked directly against your budget burn rate.", color: "from-green-500/20 to-green-900/20", border: "border-green-500/30" }
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen py-32 bg-black flex flex-col items-center justify-center perspective-[2000px]">
      <div className="text-center mb-24 max-w-3xl px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Built for precision.</h2>
        <p className="text-xl text-white/50">Stop guessing. Start knowing exactly where your agency stands at every minute of every project.</p>
      </div>

      <motion.div 
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 w-full max-w-6xl"
      >
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -20, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative h-96 rounded-[32px] p-8 flex flex-col justify-end overflow-hidden border ${card.border} bg-gradient-to-br ${card.color} backdrop-blur-xl shadow-2xl cursor-pointer`}
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
              <p className="text-white/70 font-medium leading-relaxed">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
