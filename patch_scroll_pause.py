import re

with open('src/components/marketing/ScrollExpand.tsx', 'r') as f:
    content = f.read()

# Change height to 500vh
content = content.replace('className="relative h-[300vh] w-full bg-black"', 'className="relative h-[500vh] w-full bg-black"')

# Adjust the animation timings based on 500vh
# 100vh / 500vh = 0.2
# 0 to 0.2: scroll into view (scale 0.7 -> 1)
# 0.2 to 0.4: text fade in
# 0.4 to 1.0: massive 300vh dead zone (pause)

content = content.replace('const scale = useTransform(scrollYProgress, [0, 0.33], [0.7, 1]);', 'const scale = useTransform(scrollYProgress, [0, 0.2], [0.7, 1]);')
content = content.replace('const borderRadius = useTransform(scrollYProgress, [0, 0.33], ["40px", "0px"]);', 'const borderRadius = useTransform(scrollYProgress, [0, 0.2], ["40px", "0px"]);')

content = content.replace('const opacity = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);', 'const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);')
content = content.replace('const yContent = useTransform(scrollYProgress, [0.33, 0.66], [50, 0]);', 'const yContent = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);')

with open('src/components/marketing/ScrollExpand.tsx', 'w') as f:
    f.write(content)
