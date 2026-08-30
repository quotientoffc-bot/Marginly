"use client";

import { ArrowRight, Mail, ShieldAlert, Zap, Clock, Briefcase, FileText, PlayCircle, Eye, Command, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "@/components/marketing/Scene";
import CinematicDemo from "@/components/marketing/CinematicDemo";
import Navbar from "@/components/marketing/Navbar";
import LineSidebar from "@/components/marketing/LineSidebar";
import TrueFocus from "@/components/marketing/TrueFocus";
import MaskedHeading from "@/components/marketing/MaskedHeading";
import ScrollExpand from "@/components/marketing/ScrollExpand";
import ImmersiveParallax from "@/components/marketing/ImmersiveParallax";
import ImmersiveCards from "@/components/marketing/ImmersiveCards";

import ElasticMesh from "@/components/marketing/ElasticMesh";
import { motion, AnimatePresence, } from "framer-motion";

export default function MarketingPage() {

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [showProgress, setShowProgress] = useState(false);

  const highlightsSectionRef = useRef<HTMLElement>(null);
  const highlightsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!highlightsSectionRef.current || !highlightsContainerRef.current) return;
      
      gsap.to(highlightsContainerRef.current, {
        x: () => -(highlightsContainerRef.current!.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: highlightsSectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + highlightsContainerRef.current!.scrollWidth
        }
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setShowProgress(true);
    const t = setTimeout(() => setShowProgress(false), 2500);
    return () => clearTimeout(t);
  }, [activeSection]);

  const SECTIONS = [
    { id: 'hero', label: 'Overview' },
    { id: 'demo', label: 'Cinematic' },
    { id: 'highlights', label: 'Features' },
    { id: 'closer-look', label: 'Workspace' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = SECTIONS.findIndex(s => s.id === entry.target.id);
          if (index !== -1) setActiveSection(index);
        }
      });
    }, { threshold: 0.2 });

    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  
  


  const closerLookFeatures = [
    { title: "Scope Monitor", icon: ShieldAlert, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", desc: "Instantly detect out-of-bounds requests before a single hour is billed." },
    { title: "Dynamic Quoting", icon: FileText, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop", desc: "Generate mathematically precise quotes driven by your historical project data." },
    { title: "Time Intelligence", icon: Clock, img: "https://images.unsplash.com/photo-1507208534125-998df6c201a9?q=80&w=2000&auto=format&fit=crop", desc: "Seamlessly map hours worked directly against your budget burn rate." },
    { title: "Unified Dashboard", icon: Command, img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000&auto=format&fit=crop", desc: "Your entire premium workspace, centralized in one command center." }
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white font-sans selection:bg-white/20 selection:text-black">
      
            {/* Sticky Line Sidebar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block mix-blend-difference"
          >
            <LineSidebar
          items={SECTIONS.map(s => s.label)}
          activeIndex={activeSection}
          accentColor="#ffffff"
          textColor="#ffffff"
          markerColor="#ffffff"
          showIndex={false}
          showMarker={true}
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={40}
          markerGap={0}
          tickScale={0.5}
          scaleTick={true}
          itemGap={20}
          fontSize={1.1}
          smoothing={100}
          onItemClick={(idx) => {
            const el = document.getElementById(SECTIONS[idx].id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar />

      {/* Standard Hero Section */}
      <section id="hero" ref={heroRef} className="relative w-full min-h-screen pt-32 pb-20 z-10 bg-black flex flex-col items-center justify-center overflow-hidden">
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#F5F5F0] font-medium tracking-widest uppercase text-sm mb-4"
          >
            Marginly
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-5xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[0.9] text-white text-center"
          >
            The Agency <br />
            <span className="text-[#F5F5F0]">
              Operating System.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-6 text-lg md:text-xl text-white/50 max-w-2xl text-center font-medium"
          >
            Unify your quotes, track your time, and protect your scope from one premium command center.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 mt-12 mb-16"
          >
            <Link href="/dashboard" className="px-8 py-3.5 rounded-full bg-[#F5F5F0] hover:bg-white text-black font-medium transition-colors shadow-[0_0_40px_rgba(245,245,240,0.15)]">
              Get Marginly Free
            </Link>
            <p className="text-sm text-white/50 font-medium">
              No credit card required.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl aspect-[1024/461] mx-auto"
          >
            <ElasticMesh
              image="/dashboard-screen.png"
              interaction="drag"
              tilt={16}
              shading={1}
            />
          </motion.div>
        </div>
      </section>

      {/* Cinematic Fly-Through Text */}
      <CinematicDemo />

      
      {/* Get the Highlights (Horizontal Scroll) */}
      <section id="highlights" ref={highlightsSectionRef} className="highlights-section relative w-full h-screen bg-black flex flex-col justify-center border-t border-white/5 overflow-hidden">
        <div className="absolute top-12 left-12 z-20 flex justify-between w-[calc(100%-6rem)]">
          <h2 className="text-4xl md:text-5xl font-medium">Core features at a glance.</h2>
        </div>

        <div ref={highlightsContainerRef} className="flex gap-8 px-12 w-max h-[60vh] flex-nowrap mt-12">
          {[
            { title: "Intelligent Quoting.", subtitle: "Lightning-fast scope analysis.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
            { title: "Ironclad Scope.", subtitle: "Tougher than any client revision.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" },
            { title: "Real-time Margins.", subtitle: "Pro-level financial accuracy.", img: "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop" },
            { title: "Seamless Calendar.", subtitle: "Deep two-way sync integrations.", img: "https://images.unsplash.com/photo-1506784951206-b96e43c57cb3?q=80&w=2000&auto=format&fit=crop" },
            { title: "Bring Your Own AI.", subtitle: "Plug in any custom LLM model.", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000&auto=format&fit=crop" }
          ].map((card, i) => (
            <div key={i} className="highlight-card w-[80vw] md:w-[60vw] h-full rounded-[40px] relative overflow-hidden flex-shrink-0 snap-center group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <h3 className="text-3xl md:text-5xl font-medium mb-2">{card.title}</h3>
                <p className="text-xl text-white/70">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Take a Closer Look (Interactive Features) */}
      <section id="closer-look" className="relative w-full min-h-screen py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-24 text-center">Explore the workspace.</h2>
          
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Feature List */}
            <div className="flex-1 flex flex-col gap-4">
              {closerLookFeatures.map((feat, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`flex items-center gap-4 p-4 rounded-full border transition-all duration-300 w-full max-w-sm ${
                    activeFeature === i 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-transparent border-transparent text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    activeFeature === i ? "bg-[#F5F5F0] text-black" : "border border-white/20"
                  }`}>
                    {activeFeature === i ? <Eye className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                  <span className="font-medium text-lg">{feat.title}</span>
                </button>
              ))}
            </div>

            {/* Interactive Display */}
            <div className="flex-1 relative w-full aspect-[9/16] max-w-sm mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-[40px] border-8 border-neutral-900 bg-neutral-950 overflow-hidden shadow-2xl"
                >
                  <img 
                    src={closerLookFeatures[activeFeature].img} 
                    alt="Feature" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-10 left-8 right-8 text-center">
                    {(() => {
                      const ActiveIcon = closerLookFeatures[activeFeature].icon;
                      return <ActiveIcon className="w-10 h-10 mx-auto mb-4 text-[#F5F5F0]" />;
                    })()}
                    <h4 className="text-2xl font-medium mb-2">{closerLookFeatures[activeFeature].title}</h4>
                    <p className="text-sm text-white/70">{closerLookFeatures[activeFeature].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Expand Feature */}
      <ScrollExpand 
        title="Unleash your agency." 
        src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2564&auto=format&fit=crop"
      >
        <p className="mt-4">See exactly where your money goes. Every project, every hour, natively connected.</p>
      </ScrollExpand>

      

      
      {/* Contact Us */}
      <section id="contact" className="relative w-full py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">Have questions? Contact us.</h2>
          <p className="text-lg text-white/50 mb-10 max-w-2xl">
            Whether you need a custom enterprise plan or just want to chat about agency scaling, our team is here to help.
          </p>
          <a href="mailto:hello@marginly.com" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-[#F5F5F0] font-medium text-lg shadow-[0_0_30px_rgba(245,245,240,0.05)] hover:shadow-[0_0_40px_rgba(245,245,240,0.1)]">
            <Mail className="w-5 h-5" />
            hello@marginly.com
          </a>
        </div>
      </section>

            
      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 z-10 bg-black relative text-xs text-white/40 font-medium">
        <div className="flex gap-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/refunds">Sales and Refunds</Link>
        </div>
        <p>Copyright © 2026 Marginly Inc. All rights reserved.</p>
      </footer>
      
    </div>
  );

}
