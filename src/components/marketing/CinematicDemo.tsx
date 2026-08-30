"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Mail, CheckCircle2 } from "lucide-react";
import ParticleText from "./ParticleText";
import BorderGlow from "./BorderGlow";
import Ferrofluid from "./Ferrofluid";

const FERROFLUID_COLORS = ["#ffffff", "#ffffff", "#ffffff"];

export default function CinematicDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [sequence, setSequence] = useState(0);
  
  const isPlayingRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Trigger to mount ParticleText when we reach this section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      onEnter: () => setMounted(true),
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          onEnter: () => {
            if (!isPlayingRef.current) {
              isPlayingRef.current = true;
              
              // Start video sequence after text animations (approx 3s)
              timeoutsRef.current.push(setTimeout(() => setSequence(1), 3000));
              timeoutsRef.current.push(setTimeout(() => setSequence(2), 4500)); 
              timeoutsRef.current.push(setTimeout(() => setSequence(3), 6500)); 
              timeoutsRef.current.push(setTimeout(() => setSequence(4), 7500)); 
              timeoutsRef.current.push(setTimeout(() => setSequence(5), 9500)); 
            }
          }
        }
      });

      // 1. Text fades out
      tl.to(textRef.current, {
        opacity: 0,
        scale: 1.5,
        filter: "blur(10px)",
        duration: 1,
        delay: 1
      });

      // 2. Particle Text appears
      tl.to(particleContainerRef.current, {
        opacity: 1,
        duration: 0.5
      });

      // 3. Video fades in as Particles drift
      tl.to(videoContainerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 1
      }, "+=1");

    }, containerRef);
    
    return () => {
      ctx.revert();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div id="demo" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Ferrofluid
          colors={FERROFLUID_COLORS}
          speed={0.3}
          scale={1.5}
          turbulence={0.8}
          fluidity={0.2}
          rimWidth={0.3}
          sharpness={2}
          shimmer={1}
          glow={1.5}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.8}
          mouseRadius={0.5}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-black/50 pointer-events-none" />
      
      <h2 
        ref={textRef}
        className="absolute z-10 text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-center leading-none text-white px-4"
      >
        Stop losing money <br />
        to scope creep.
      </h2>

      <div 
        ref={particleContainerRef} 
        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[95vw] max-w-[1400px] h-[250px] md:h-[300px] bg-black/40 backdrop-blur-md rounded-[40px] border border-white/10" />
        
        {mounted && (
          <div className="relative z-10" style={{ width: '100%', height: 360 }}>
            <ParticleText
              text="See it in action"
              particleSize={2}
              density={4}
              color="#ffffff"
              highlightColor="#8b5cf6"
              scatter={180}
              gatherDuration={1600}
              stagger={420}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0.7}
              trigger="mount"
              fontSize="clamp(4rem, 15vw, 12rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
            />
          </div>
        )}
      </div>

      <div 
        ref={videoContainerRef} 
        className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-8 opacity-0"
        style={{ scale: 0.95, y: 20 }}
      >
        <BorderGlow
          className="relative w-[95vw] md:w-[85vw] max-w-7xl aspect-video shadow-2xl"
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#0a0a0a"
          borderRadius={40}
          glowRadius={60}
          glowIntensity={1.2}
          coneSpread={25}
          animated={true}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          
          <div className="absolute top-0 w-full h-2 bg-white/5 z-50">
            <motion.div 
              className="h-full bg-[#F5F5F0]"
              initial={{ width: "0%" }}
              animate={sequence > 0 ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </div>

          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {sequence < 2 ? (
                <motion.img 
                  key="dashboard"
                  src="/dashboard-screen.png" 
                  alt="Dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <motion.img 
                  key="scope-monitor"
                  src="/scope-monitor-screen.png" 
                  alt="Scope Monitor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
            </AnimatePresence>

            {sequence >= 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-12 z-40"
              >
                {sequence === 4 ? (
                  <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                      <Mail className="w-5 h-5 text-white/50" />
                      <span className="font-medium text-white">Draft Change Order</span>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 w-1/3 bg-white/10 rounded" />
                      <div className="h-4 w-full bg-white/5 rounded" />
                      <div className="h-4 w-full bg-white/5 rounded" />
                      <div className="h-4 w-3/4 bg-white/5 rounded" />
                    </div>
                    <div className="mt-8 flex justify-end">
                      <div className="px-6 py-2 bg-[#F5F5F0] text-black rounded-lg font-medium text-sm flex items-center gap-2">
                        Send Email
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-medium text-white">Scope Protected</h3>
                    <p className="text-white/50 mt-2">Email sent. $1,800 - $2,400 saved from scope creep.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {sequence > 0 && (
            <motion.div
              initial={{ x: 600, y: 400 }}
              animate={
                sequence === 1 ? { x: 300, y: 250 } : 
                sequence === 2 ? { x: 300, y: 250 } : 
                sequence === 3 ? { x: 220, y: 450 } : 
                sequence === 4 ? { x: 780, y: 480 } : 
                { x: 780, y: 480 }
              }
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute z-50 pointer-events-none top-0 left-0"
            >
              <MousePointer2 className="w-8 h-8 text-white drop-shadow-lg" fill="black" />
              
              <AnimatePresence>
                {(sequence === 1 || sequence === 3 || sequence === 4) && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-1 left-1 w-6 h-6 border-2 border-white rounded-full bg-white/20"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
          
        </BorderGlow>
      </div>
    </div>
  );
}
