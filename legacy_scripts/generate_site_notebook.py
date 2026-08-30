import os

output_file = "/Users/daanu/.gemini/antigravity/brain/01a4288b-38a4-4ecc-bac8-0fb11bded5af/quotient-marketing-site.md"

# ONLY include marketing site directories
directories = [
    "src/app/(marketing)",
    "src/components/marketing",
    "src/components/ui",
]

project_info = """# Quotient - Marketing Site Architecture & Source Code

## Project Overview
**Quotient** is a premium operating system designed for protecting time, margins, and project scope. This document contains the complete frontend architecture and source code for the **Quotient Marketing Landing Page**.

## Target Audience
Creative Agencies, freelancers, and enterprise teams dealing with scope creep. It is specifically directed towards professionals who need a high-end, trustworthy tool to manage their agency workflow.

## Key Features & Usage
1. **Marketing Site:** A highly cinematic, dark-themed landing page featuring complex scroll-driven animations (Framer Motion + GSAP), frosted glass (glassmorphism) UI elements, and interactive 3D WebGL features.
2. **Cinematic Scroll Expansion:** The `ScrollExpand` component uses a 300vh container to create a 100vh scroll "dead zone" (cinematic pause), allowing a hero image to scale up and fade text in seamlessly. It perfectly blends into the solid black footer using a vertical gradient (`bg-gradient-to-b`).
3. **Particle Text & Ferrofluid:** The `ParticleText` component renders physics-based text particles over a bright white `Ferrofluid` moving background, separated by a responsive frosted glass box for legibility.
4. **Immersive UI:** A dynamic top Navbar with a beige glassy gradient, interactive video modals, and elastic mesh backgrounds to create a premium feel.

---

## Marketing Site Source Code

"""

with open(output_file, 'w') as out:
    out.write(project_info)
    
    for root_dir in directories:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            for file in filenames:
                if file.endswith(('.tsx', '.ts', '.css', '.js', '.mjs')):
                    filepath = os.path.join(dirpath, file)
                    try:
                        with open(filepath, 'r') as f:
                            content = f.read()
                        
                        ext = file.split('.')[-1]
                        lang = "tsx" if ext in ["tsx", "ts"] else ext
                        
                        out.write(f"### `{filepath}`\n\n```{lang}\n{content}\n```\n\n")
                    except Exception as e:
                        pass

print("Done")
