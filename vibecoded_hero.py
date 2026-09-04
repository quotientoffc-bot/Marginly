import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Make sure Play is imported
if 'Play' not in content:
    content = content.replace('import { ArrowRight', 'import { ArrowRight, Play')

# Replace the entire Hero Section
# We'll use regex to replace from {/* 1. Hero Section to {/* 2. Cinematic Text
hero_pattern = re.compile(r'\{\/\* 1\. Hero Section.*?(?=\{\/\* 2\. Cinematic Text)', re.DOTALL)

new_hero = '''{/* 1. Hero Section (Vibecoded Editorial Luxury) */}
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

      '''

content = hero_pattern.sub(new_hero, content)

# Remove Navbar from main flow and make it fixed/absolute if needed, 
# actually it's fine where it is if it's absolute. Let's check Navbar component.
with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
