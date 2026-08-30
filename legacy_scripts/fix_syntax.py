with open('src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

broken = """                <div>
                  <p className="text-3xl font-medium tracking-tight mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
          </div>
        </BorderGlow>
              </div>"""

fixed = """                <div>
                  <p className="text-3xl font-medium tracking-tight mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              </div>"""

content = content.replace(broken, fixed)

with open('src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)
