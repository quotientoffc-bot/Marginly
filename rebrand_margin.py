import os
import re

directories = ["src", "."]

replacements = {
    r'\bQuotara\b': 'Margin',
    r'\bquotara\b': 'margin',
    r'\bQUOTARA\b': 'MARGIN',
    r'\bQuotient\b': 'Margin',
    r'\bquotient\b': 'margin',
    r'\bQUOTIENT\b': 'MARGIN'
}

for root_dir in directories:
    if root_dir == ".":
        # Only check package.json in root
        files_to_check = ["package.json"]
    else:
        files_to_check = []
        for dirpath, dirnames, filenames in os.walk(root_dir):
            for file in filenames:
                if file.endswith(('.tsx', '.ts', '.css', '.js', '.mjs', '.html', '.json')):
                    files_to_check.append(os.path.join(dirpath, file))

    for filepath in files_to_check:
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

print("Done rebranding to Margin")
