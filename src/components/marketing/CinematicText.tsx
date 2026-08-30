import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Pin the section and scale the text massively so the user "flies through" it
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Text starts massive and transparent, then scales down into place and fades in
      tl.fromTo(textRef.current, {
        scale: 4,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 1
      }, 0);
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <h2 
        ref={textRef}
        className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-center leading-none text-white origin-center px-4"
      >
        Stop losing money <br />
        to scope creep.
      </h2>
    </div>
  );
}
