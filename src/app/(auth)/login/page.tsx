"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase-client";

import { useRef, useEffect } from "react";
import { createAvatar, type AvatarController } from '@bible-strong/avatar-react';
import '@bible-strong/avatar-react/styles.css';
import avatarJson from './avatar.avatar.json';


const StrobiAvatar = createAvatar(avatarJson as any);


const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Avatar Controller Ref
  const avatarRef = useRef<AvatarController>(null);
  const currentExpressionRef = useRef<string>('idle');
  
  // Lock tracking during error animations
  const trackingLockRef = useRef<boolean>(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Mouse tracking logic for the avatar container
  const containerRef = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push('/dashboard');
      }
    };
    checkUser();

    const handleMouseMove = (e: MouseEvent) => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      const rotateX = Math.max(-20, Math.min(20, -(deltaY / 20)));
      const rotateY = Math.max(-20, Math.min(20, (deltaX / 20)));
      
      const translateX = Math.max(-10, Math.min(10, deltaX / 30));
      const translateY = Math.max(-10, Math.min(10, deltaY / 30));
      
      containerRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // True Live Eye/Head Tracking Logic
      if (avatarRef.current && !trackingLockRef.current) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let targetExpression = 'idle';
        
        if (distance >= 80) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          
          if (angle >= -22.5 && angle < 22.5) {
            targetExpression = 'far-right-glance';
          } else if (angle >= 22.5 && angle < 67.5) {
            targetExpression = 'asymmetric-down-right';
          } else if (angle >= 67.5 && angle < 112.5) {
            targetExpression = 'downward-gaze';
          } else if (angle >= 112.5 && angle < 157.5) {
            targetExpression = 'wide-down-left';
          } else if (angle >= 157.5 || angle < -157.5) {
            targetExpression = 'attentive-left';
          } else if (angle >= -157.5 && angle < -112.5) {
            targetExpression = 'asymmetric-up-left';
          } else if (angle >= -112.5 && angle < -67.5) {
            targetExpression = 'upward-side-glance';
          } else if (angle >= -67.5 && angle < -22.5) {
            targetExpression = 'upward-side-glance';
          }
        }
        
        // ONLY update the API if the expression actually changed
        if (currentExpressionRef.current !== targetExpression) {
          currentExpressionRef.current = targetExpression;
          if (targetExpression === 'idle') {
            avatarRef.current.play('idle');
          } else {
            avatarRef.current.setExpression(targetExpression as any);
          }
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    // Always default to client view when logging in
    localStorage.setItem("user_role", "client");

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });


    if (error) {
      setError(error.message);
      setIsLoading(false);
      
      // Trigger the wrong password animation
      if (avatarRef.current) {
        trackingLockRef.current = true;
        
        // Stop any idle animations and force the red shake expression
        avatarRef.current.stop();
        avatarRef.current.setExpression('angry-brows');
        currentExpressionRef.current = 'angry-brows';
        
        // Release the lock after 2.5 seconds to resume tracking
        if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
        lockTimeoutRef.current = setTimeout(() => {
          trackingLockRef.current = false;
        }, 2500);
      }
    }
 else {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Always default to client view when logging in
      localStorage.setItem("user_role", "client");
      
      console.log("Initiating Google Sign In...");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account'
          }
        }
      });
      
      if (error) {
        console.error("Supabase OAuth Error:", error);
        setError(error.message);
      } else {
        console.log("Supabase OAuth Success:", data);
      }
    } catch (err: any) {
      console.error("Caught error:", err);
      setError(err.message || "An unexpected error occurred during Google Sign In.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-50 bg-black">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="glass-panel p-10 squircle-lg w-full max-w-md relative z-10 border border-white/10 shadow-2xl">
        
        <div className="flex items-center justify-center mb-8">
          {/* Static background circle */}
          <div ref={trackingRef} className="relative w-56 h-56 mb-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-2xl">
            {/* Moving avatar container */}
            <div ref={containerRef} className="absolute inset-0 transition-transform duration-200 ease-out" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
              <StrobiAvatar ref={avatarRef} defaultAnimation="idle" size={224} className="w-full h-full" />
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-medium text-white mb-2 text-center">Welcome back.</h1>

        <p className="text-white/50 text-center mb-8 text-sm">Sign in to your workspace.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/60 tracking-wider uppercase">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                {...register("email")}
                type="email" 
                placeholder="you@company.com" 
                className="w-full glass-input squircle-sm py-3 pl-10 pr-4" 
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-white/60 tracking-wider uppercase">Password</label>
              <Link href="#" className="text-xs text-white/40 hover:text-white transition-colors">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                {...register("password")}
                type="password" 
                placeholder="••••••••" 
                className="w-full glass-input squircle-sm py-3 pl-10 pr-4" 
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black font-medium py-3 squircle-sm mt-4 hover:bg-white/90 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-white/10 w-full"></div>
          <span className="px-3 text-white/40 text-xs uppercase tracking-wider">or</span>
          <div className="border-t border-white/10 w-full"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full mt-6 bg-white/5 border border-white/10 text-white font-medium py-3 squircle-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-sm text-white/40 mt-6">
          Don't have an account? <Link href="/signup" className="text-white hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
