with open('src/app/(marketing)/page.tsx', 'r') as f:
    content = f.read()

# Let's just remove any <DemoVideoModal ... /> strings first
content = content.replace("      <DemoVideoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />\n", "")
content = content.replace("<DemoVideoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />", "")

# Now find the last </div> before the final );
parts = content.rsplit('    </div>\n  );', 1)
if len(parts) == 2:
    new_content = parts[0] + "      <DemoVideoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />\n    </div>\n  );" + parts[1]
    with open('src/app/(marketing)/page.tsx', 'w') as f:
        f.write(new_content)
        print("Success")
else:
    print("Could not find the target string")
