"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";

export default function MassiveFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // Pin the entire container for the duration of the 3 sections
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      });

      // Animate each text block in and out
      textRefs.current.forEach((text, i) => {
        if (!text) return;
        
        gsap.fromTo(text, 
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1, 
            y: 0, 
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 100}% top`,
              end: `top+=${(i + 0.5) * 100}% top`,
              scrub: 1,
            }
          }
        );

        gsap.to(text, {
          opacity: 0,
          y: -100,
          scale: 1.1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(i + 0.5) * 100}% top`,
            end: `top+=${(i + 1) * 100}% top`,
            scrub: 1,
          }
        });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Scope Monitor",
      desc: "Instantly detect out-of-bounds requests before a single hour is billed.",
      tag: "01 // PROTECTION"
    },
    {
      title: "Dynamic Quoting",
      desc: "Generate mathematically precise quotes driven by your historical project data.",
      tag: "02 // PRECISION"
    },
    {
      title: "Time Intelligence",
      desc: "Seamlessly map hours worked directly against your budget burn rate.",
      tag: "03 // INSIGHT"
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* 3D WebGL Background (Refractive Glass Shapes) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Scene />
      </div>

      {/* Massive Foreground Text */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        {features.map((feat, i) => (
          <div 
            key={i} 
            ref={el => { textRefs.current[i] = el; }}
            className="absolute w-full px-6 flex flex-col items-center text-center opacity-0"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-[#FDFBF7]/50 mb-8 font-medium">
              {feat.tag}
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-[140px] font-medium tracking-tighter text-[#FDFBF7] leading-[0.85] mb-8 drop-shadow-2xl text-balance">
              {feat.title}
            </h2>
            <p className="text-xl md:text-3xl text-[#FDFBF7]/70 max-w-3xl font-medium text-balance drop-shadow-lg">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
}
