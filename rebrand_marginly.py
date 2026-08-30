import os
import re

directories = ["src"]

replacements = {
    r'\bMargin\b': 'Marginly',
    r'\bmargin\b': 'marginly',
    r'\bMARGIN\b': 'MARGINLY'
}

for root_dir in directories:
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for file in filenames:
            if file.endswith(('.tsx', '.ts', '.css', '.js', '.mjs', '.html', '.json')):
                filepath = os.path.join(dirpath, file)
                try:
                    with open(filepath, 'r') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    for pattern, replacement in replacements.items():
                        content = re.sub(pattern, replacement, content)
                    
                    if content != original_content:
                        with open(filepath, 'w') as f:
                            f.write(content)
                        print(f"Updated {filepath}")
                except Exception as e:
                    pass

print("Done rebranding to Marginly")
