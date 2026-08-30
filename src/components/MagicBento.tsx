"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagicBentoProps {
  children: React.ReactNode;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  className?: string;
}

const MagicBentoCard = ({
  children,
  enableSpotlight,
  enableBorderGlow,
  enableTilt,
  spotlightRadius,
  glowColor,
  textAutoHide
}: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalized mouse coordinates for tilt (-0.5 to 0.5)
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    
    // Pixel coordinates for spotlight
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX: enableTilt && isHovered ? rotateX : 0,
        rotateY: enableTilt && isHovered ? rotateY : 0,
        transformPerspective: 1000,
      }}
      className={`relative h-full w-full rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden group transition-colors duration-300 ${enableBorderGlow && isHovered ? 'border-white/30' : ''}`}
    >
      {/* Spotlight Effect */}
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at var(--mouse-x) var(--mouse-y), rgba(${glowColor}, 0.15), transparent 80%)`,
          }}
        />
      )}
      
      {/* Border Glow Effect */}
      {enableBorderGlow && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 20px rgba(${glowColor}, 0.05)`,
          }}
        />
      )}

      <div className={`relative z-10 h-full w-full p-5 flex flex-col justify-between transition-opacity duration-300 ${textAutoHide && !isHovered ? 'opacity-70' : 'opacity-100'}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default function MagicBento({
  children,
  textAutoHide = false,
  enableStars = false,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = false,
  clickEffect = false,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255",
  className = ""
}: MagicBentoProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <MagicBentoCard
            key={index}
            textAutoHide={textAutoHide}
            enableSpotlight={enableSpotlight}
            enableBorderGlow={enableBorderGlow}
            enableTilt={enableTilt}
            spotlightRadius={spotlightRadius}
            glowColor={glowColor}
          >
            {child}
          </MagicBentoCard>
        );
      })}
    </div>
  );
}
