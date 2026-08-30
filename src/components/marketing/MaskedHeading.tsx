import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MaskedHeadingProps {
  text: string;
  src?: string;
  mediaType?: "image" | "video";
  fillScale?: number;
}

export default function MaskedHeading({ text, src, mediaType = "image", fillScale = 1.2 }: MaskedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, fillScale]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-32 overflow-hidden bg-black border-4 border-blue-500">
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        {mediaType === "video" ? (
          <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-60" 
            style={{ backgroundImage: `url(${src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'})` }} 
          />
        )}
      </motion.div>
      <h2 
        className="relative z-10 text-[15vw] font-black uppercase tracking-tighter leading-none"
        style={{
          backgroundImage: `url(${src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))"
        }}
      >
        {text}
      </h2>
    </div>
  );
}
