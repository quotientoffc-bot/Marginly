// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function ShinyButton({ children, className, icon, type = "button", ...props }: ShinyButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-black px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-black/90 gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
}

export default ShinyButton;
