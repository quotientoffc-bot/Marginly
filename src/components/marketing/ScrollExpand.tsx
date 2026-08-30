import { motion } from "framer-motion";

interface ScrollExpandProps {
  src?: string;
  title: string;
  children?: React.ReactNode;
}

export default function ScrollExpand({ src, title, children }: ScrollExpandProps) {
  return (
    <div className="relative w-full h-screen bg-black">
      <div className="relative w-full h-screen bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black backdrop-blur-[2px]" />
        
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{title}</h2>
          <div className="text-xl md:text-2xl text-white/70 max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
