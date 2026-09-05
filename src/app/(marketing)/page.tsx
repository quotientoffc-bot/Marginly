"use client";

import { ArrowRight, Play, Mail, Zap, Clock, Briefcase, FileText, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Components

import DemoVideoModal from "@/components/marketing/DemoVideoModal";
import Navbar from "@/components/marketing/Navbar";
import ScrollExpand from "@/components/marketing/ScrollExpand";
import ImmersiveCards from "@/components/marketing/ImmersiveCards";
import ElasticMesh from "@/components/marketing/ElasticMesh";
import ParticleText from "@/components/marketing/ParticleText";

export default function MarketingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Hero Scroll Parallax
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const meshScale = useTransform(heroScroll, [0, 1], [1, 1.25]);
  const meshRotateX = useTransform(heroScroll, [0, 1], [0, 25]);
  const meshOpacity = useTransform(heroScroll, [0, 0.8, 1], [1, 0.5, 0]);
  const textY = useTransform(heroScroll, [0, 1], [0, 150]);

  return (
    <div className="relative w-full bg-[#050505] min-h-screen text-[#FDFBF7] font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
      
      {/* Background Deep Mesh Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen">
        <div className="w-[80vw] h-[80vw] bg-gradient-to-br from-purple-900/20 via-emerald-900/10 to-transparent rounded-full blur-[120px]" />
      </div>

      <Navbar />

      {/* 1. Hero Section (Vibecoded Editorial Luxury) */}
      <section id="hero" ref={heroRef} className="relative w-full min-h-[100dvh] z-10 overflow-hidden">
        
        {/* Full-bleed Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#050505]/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent z-10" />
          <motion.img 
            style={{ y: textY, scale: meshScale }}
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Cinematic abstract" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="relative z-20 w-full h-[100dvh] mx-auto pointer-events-none">
          
          {/* Bottom Left: Huge Editorial Typography & CTA */}
          <motion.div 
            style={{ y: textY }}
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-6 md:left-16 bottom-16 md:bottom-24 max-w-2xl pointer-events-auto"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-medium tracking-tight text-[#FDFBF7] leading-[1.05] mb-6 drop-shadow-2xl">
              The Agency <br/> 
              <span className="font-serif italic text-white/80 font-light tracking-normal">Operating System.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-md font-medium leading-relaxed drop-shadow-md">
              Unify your quotes, track your time, and protect your scope from one premium command center.
            </p>
            
            <Link href="/dashboard" className="inline-flex items-center justify-center min-h-[44px] gap-4 pl-8 pr-2 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-[#FDFBF7] font-medium text-lg shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 group">
              Start your free trial
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-[#FDFBF7]" />
              </div>
            </Link>
          </motion.div>

          {/* Bottom Right: Floating Video/Demo Card */}
          <motion.div 
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex absolute right-16 bottom-24 w-[400px] aspect-[16/10] rounded-[2rem] p-1.5 bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl pointer-events-auto cursor-pointer group"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="relative w-full h-full rounded-[calc(2rem-0.375rem)] overflow-hidden bg-black">
              <img src="/dashboard-screen.png" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      

      {/* 3. 3D Immersive Cards Cascade */}
      <div id="features" className="relative z-20 border-t border-white/10 bg-[#050505]">
        <ImmersiveCards />
      </div>

      {/* 4. Asymmetrical Bento Grid (Double Bezel Architecture) */}
      <section id="use-cases" className="relative w-full min-h-[100dvh] bg-[#050505] flex flex-col justify-center py-32 px-4 md:px-12 border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-balance mb-16 text-center">
            The architecture of <br/> <span className="text-white/40">premium margins.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
            {/* Massive Hero Card (Col Span 8) */}
            <div className="md:col-span-8 md:row-span-2 group relative p-1.5 rounded-[2rem] bg-white/5 border border-white/10 ring-1 ring-black/5 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop)' }} />
              <div className="relative h-full min-h-[400px] bg-[#050505]/60 backdrop-blur-3xl rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] p-10 flex flex-col justify-end">
                <h3 className="text-4xl md:text-6xl font-medium mb-4 tracking-tight">Intelligent Quoting.</h3>
                <p className="text-xl text-white/50 max-w-lg">Lightning-fast scope analysis using your custom LLMs.</p>
              </div>
            </div>

            {/* Side Card 1 (Col Span 4) */}
            <div className="md:col-span-4 group relative p-1.5 rounded-[2rem] bg-white/5 border border-white/10 ring-1 ring-black/5 overflow-hidden">
              <div className="relative h-full min-h-[250px] bg-[#050505] rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 flex flex-col justify-between">
                <Zap className="w-8 h-8 text-white/40 mb-4" />
                <div>
                  <h3 className="text-2xl font-medium mb-2">Ironclad Scope.</h3>
                  <p className="text-white/40">Tougher than any client revision.</p>
                </div>
              </div>
            </div>

            {/* Side Card 2 (Col Span 4) */}
            <div className="md:col-span-4 group relative p-1.5 rounded-[2rem] bg-white/5 border border-white/10 ring-1 ring-black/5 overflow-hidden">
              <div className="relative h-full min-h-[250px] bg-[#050505] rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 flex flex-col justify-between">
                <Briefcase className="w-8 h-8 text-white/40 mb-4" />
                <div>
                  <h3 className="text-2xl font-medium mb-2">Real-time Tracking.</h3>
                  <p className="text-white/40">Pro-level financial accuracy.</p>
                </div>
              </div>
            </div>

            {/* Wide Bottom Card (Col Span 12) */}
            <div className="md:col-span-12 group relative p-1.5 rounded-[2rem] bg-white/5 border border-white/10 ring-1 ring-black/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent pointer-events-none" />
              <div className="relative h-full min-h-[200px] bg-[#050505]/80 backdrop-blur-xl rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <h3 className="text-3xl font-medium mb-2">Bring Your Own AI.</h3>
                  <p className="text-xl text-white/40">Plug in any custom LLM model to parse client emails directly.</p>
                </div>
                <button className="mt-6 md:mt-0 pl-6 pr-2 py-2 rounded-full bg-white text-black font-medium inline-flex items-center gap-3 hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 group/btn">
                  Connect AI
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:bg-black/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scroll Expand Feature */}
      <div className="relative z-20 bg-[#050505] border-t border-white/10">
        <ScrollExpand 
          title="Unleash your agency." 
          src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2564&auto=format&fit=crop"
        >
          <p className="mt-4 text-white/70">See exactly where your money goes. Every project, every hour, natively connected.</p>
        </ScrollExpand>
      </div>

      {/* 6. Interactive Particle Text Section */}
      <section className="relative w-full py-48 bg-[#050505] border-t border-white/10 flex items-center justify-center overflow-hidden z-20">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 w-full h-64 cursor-crosshair">
            <ParticleText
                text="SCALE"
                particleSize={2.5}
                density={4}
                color="#FDFBF7"
                highlightColor="#8B5CF6"
                gatherDuration={1200}
                scatter={0.15}
                stagger={0.05}
                pointerRepel={true}
                repelRadius={80}
                idleDrift={true}
                trigger="hover"
                className="w-full h-full font-bold uppercase tracking-tighter"
            />
            <p className="text-center text-white/40 text-lg uppercase tracking-[0.3em] mt-8 font-medium">Interact with the text</p>
        </div>
      </section>

      {/* 7. Contact Us */}
      <section id="contact" className="relative w-full py-32 px-6 bg-[#050505] border-t border-white/10 z-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-balance">Have questions? Contact us.</h2>
          <p className="text-lg text-white/50 mb-10 max-w-2xl text-balance">
            Whether you need a custom enterprise plan or just want to chat about agency scaling, our team is here to help.
          </p>
          <a href="mailto:hello@marginly.com" className="inline-flex items-center justify-center min-h-[44px] gap-4 pl-8 pr-2 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-[#FDFBF7] font-medium text-lg shadow-[0_0_30px_rgba(245,245,240,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 group">
            hello@marginly.com
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Mail className="w-5 h-5 text-[#FDFBF7]" />
            </div>
          </a>
        </div>
      </section>
            
      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 z-20 bg-[#050505] relative text-xs text-white/40 font-medium">
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          <Link href="/refunds" className="hover:text-white transition-colors">Sales and Refunds</Link>
        </div>
        <p>Copyright © 2026 Marginly Inc. All rights reserved.</p>
      </footer>
      
      <DemoVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}
