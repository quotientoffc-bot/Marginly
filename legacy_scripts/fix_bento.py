with open('src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

broken_part = """              <div>
                <p className="text-3xl font-medium tracking-tight mb-1 text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
          </div>
        </BorderGlow>
            </div>
          ))}
        </MagicBento>"""

fixed_part = """              <div>
                <p className="text-3xl font-medium tracking-tight mb-1 text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            </div>
          ))}
        </MagicBento>"""

content = content.replace(broken_part, fixed_part)

with open('src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)
