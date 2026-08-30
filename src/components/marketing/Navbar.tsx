"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide navbar if scrolling down, show if scrolling up
    if (latest > lastY && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(latest);
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 flex justify-between items-center w-[95%] max-w-5xl bg-gradient-to-r from-[#F9F8F6]/90 via-[#F5F4F0]/90 to-[#EFECE6]/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/20 text-black"
    >
      <div className="flex items-center gap-2">
        <img src="/logo.jpg" alt="Marginly" className="w-8 h-8 rounded-xl object-cover" />
        <span className="font-medium text-lg tracking-tight hidden sm:block">Marginly</span>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="#closer-look" className="text-black/60 hover:text-black font-semibold transition-colors">Closer Look</Link>
        <Link href="#contact" className="text-black/60 hover:text-black font-semibold transition-colors">Contact Us</Link>
        <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-black text-white hover:scale-105 transition-transform font-bold">
          Get Marginly
        </Link>
      </div>
    </motion.nav>
  );
}
