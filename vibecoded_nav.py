content = '''"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav 
      animate={{ 
        backgroundColor: scrolled ? "rgba(5, 5, 5, 0.8)" : "rgba(5, 5, 5, 0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(255,255,255,0)"
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex justify-between items-center text-[#FDFBF7]"
    >
      {/* Left Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
        <Link href="#method" className="hover:text-white/70 transition-colors flex items-center gap-1">The Method <span className="text-xs opacity-50">v</span></Link>
        <Link href="#who" className="hover:text-white/70 transition-colors flex items-center gap-1">For Who <span className="text-xs opacity-50">v</span></Link>
        <Link href="#offers" className="hover:text-white/70 transition-colors">Our Offers</Link>
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="font-serif italic text-2xl font-light tracking-wide leading-none">Marginly</span>
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-sans mt-1">OS</span>
      </div>

      {/* Right Links & CTA */}
      <div className="flex items-center gap-8 text-sm font-medium tracking-wide">
        <div className="hidden sm:flex items-center gap-8">
          <button className="opacity-50 hover:opacity-100 transition-opacity">EN</button>
          <Link href="/login" className="hover:text-white/70 transition-colors">Login</Link>
        </div>
        <Link href="/dashboard" className="px-6 py-2.5 rounded-full border border-white/30 hover:bg-white/10 transition-colors">
          Start your free trial
        </Link>
      </div>
    </motion.nav>
  );
}
'''

with open('src/components/marketing/Navbar.tsx', 'w') as f:
    f.write(content)
