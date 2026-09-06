"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("marginly_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("marginly_cookie_consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("marginly_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-center animate-in slide-in-from-bottom-10 fade-in duration-700">
      <div className="glass-panel p-6 squircle-md border border-white/10 shadow-2xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 bg-black/80 backdrop-blur-xl">
        <div className="flex-1 text-sm text-white/70">
          <p className="mb-1 text-white font-medium">We value your privacy</p>
          We use strictly necessary cookies to make our site work. We'd also like to set optional analytics cookies to help us improve it. We won't set optional cookies unless you enable them. Using this tool will set a cookie on your device to remember your preferences. For more detailed information, please read our <Link href="/cookies" className="text-white underline underline-offset-2 hover:text-purple-400 transition-colors">Cookie Policy</Link>.
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            Decline All
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors text-sm font-medium"
          >
            Accept All
          </button>
        </div>
        <button onClick={handleDecline} className="absolute top-4 right-4 md:hidden text-white/40 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
