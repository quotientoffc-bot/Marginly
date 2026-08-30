with open('src/components/marketing/LineSidebar.tsx', 'r') as f:
    content = f.read()

# Add activeIndex to props
content = content.replace('defaultActive?: number | null;', 'defaultActive?: number | null;\n  activeIndex?: number | null;')
content = content.replace('defaultActive = null,', 'defaultActive = null,\n  activeIndex: externalActiveIndex,')

# Add useEffect to sync externalActiveIndex
sync_effect = '''  useEffect(() => {
    if (externalActiveIndex !== undefined && externalActiveIndex !== activeIndex) {
      setActiveIndex(externalActiveIndex);
    }
  }, [externalActiveIndex]);

  const activeRef = useRef<number | null>(defaultActive);'''

content = content.replace('  const activeRef = useRef<number | null>(defaultActive);', sync_effect)

with open('src/components/marketing/LineSidebar.tsx', 'w') as f:
    f.write(content)
