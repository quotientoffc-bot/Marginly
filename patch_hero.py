import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Replace the entire Hero section
hero_pattern = re.compile(r'\{\/\* Scroll-Driven Hero Section \(Apple Pro Style\) \*\/\}.*?<\/section>', re.DOTALL)

new_hero = """{/* Standard Hero Section */}
      <section className="relative w-full min-h-screen pt-32 pb-20 z-10 bg-black flex flex-col items-center justify-center overflow-hidden">
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#F5F5F0] font-medium tracking-widest uppercase text-sm mb-4"
          >
            Quotient
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
              Get Quotient Free
            </Link>
            <p className="text-sm text-white/50 font-medium">
              No credit card required.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl aspect-[16/9] mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            <ElasticMesh
              image="/dashboard-screen.png"
              interaction="drag"
              tilt={16}
              shading={1}
            />
          </motion.div>
        </div>
      </section>"""

content = hero_pattern.sub(new_hero, content)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
