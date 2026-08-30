import re

with open('src/components/marketing/CinematicDemo.tsx', 'r') as f:
    content = f.read()

# Import BorderGlow
if 'import BorderGlow' not in content:
    content = content.replace('import ParticleText from "./ParticleText";', 'import ParticleText from "./ParticleText";\nimport BorderGlow from "./BorderGlow";')

# Replace the outer div with BorderGlow
old_div = '<div className="relative w-[95vw] md:w-[85vw] max-w-7xl aspect-video bg-[#0a0a0a] rounded-2xl md:rounded-[40px] border border-white/10 shadow-2xl overflow-hidden">'
new_borderglow = '''<BorderGlow
          className="relative w-[95vw] md:w-[85vw] max-w-7xl aspect-video shadow-2xl"
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#0a0a0a"
          borderRadius={40}
          glowRadius={60}
          glowIntensity={1.2}
          coneSpread={25}
          animated={true}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >'''

content = content.replace(old_div, new_borderglow)

# Find the matching closing </div> and replace it with </BorderGlow>
# The closing </div> is right before '</div>\n      </div>\n    </div>'
old_ending = '''          )}
          
        </div>
      </div>
    </div>'''
new_ending = '''          )}
          
        </BorderGlow>
      </div>
    </div>'''
content = content.replace(old_ending, new_ending)

# Also need to re-enable pointer events on the video container so the hover glow works!
# Right now the wrapper has 'pointer-events-none'. We need to make it interactive when visible.
# I'll just remove pointer-events-none completely, or let GSAP control it.
# Wait, if pointer-events-none is on the container, BorderGlow onPointerMove won't fire!
content = content.replace('opacity-0 pointer-events-none"', 'opacity-0"')

with open('src/components/marketing/CinematicDemo.tsx', 'w') as f:
    f.write(content)
