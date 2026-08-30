import re

with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# 1. Add LineSidebar import
if 'import LineSidebar' not in content:
    content = content.replace('import Navbar from "@/components/marketing/Navbar";', 'import Navbar from "@/components/marketing/Navbar";\nimport LineSidebar from "@/components/marketing/LineSidebar";')

# 2. Add IntersectionObserver logic in MarketingPage component
old_state = 'const [activeFeature, setActiveFeature] = useState(0);'
new_state = '''const [activeFeature, setActiveFeature] = useState(0);
  const [activeSection, setActiveSection] = useState<number>(0);

  const SECTIONS = [
    { id: 'hero', label: 'Overview' },
    { id: 'demo', label: 'Cinematic' },
    { id: 'highlights', label: 'Features' },
    { id: 'closer-look', label: 'Workspace' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = SECTIONS.findIndex(s => s.id === entry.target.id);
          if (index !== -1) setActiveSection(index);
        }
      });
    }, { threshold: 0.2 });

    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
'''
content = content.replace(old_state, new_state)

# 3. Add ID to the hero section
content = content.replace('<section ref={heroRef} className="relative', '<section id="hero" ref={heroRef} className="relative')

# 4. Insert the LineSidebar component into the render tree
sidebar_jsx = '''      {/* Sticky Line Sidebar */}
      <div className="fixed left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block mix-blend-difference">
        <LineSidebar
          items={SECTIONS.map(s => s.label)}
          activeIndex={activeSection}
          accentColor="#ffffff"
          textColor="#ffffff"
          markerColor="#ffffff"
          showIndex={false}
          showMarker={true}
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={40}
          markerGap={0}
          tickScale={0.5}
          scaleTick={true}
          itemGap={20}
          fontSize={1.1}
          smoothing={100}
          onItemClick={(idx) => {
            const el = document.getElementById(SECTIONS[idx].id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* Navigation */}'''

content = content.replace('{/* Navigation */}', sidebar_jsx)

with open('src/app/(marketing)/page.tsx', 'w') as f:
    f.write(content)
