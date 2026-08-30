import os
import re

directories = ["src/components/charts", "src/components/ASCIIText.tsx", "src/components/ui/generate-button.tsx", "src/components/marketing/ParticleText.css", "src/components/marketing/TrueFocus.tsx"]

replacements = {
    r'\bMarginly\b': 'Margin',
    r'\bmarginly\b': 'margin',
    r'\bMARGINLY\b': 'MARGIN'
}

for item in directories:
    if os.path.isfile(item):
        files_to_check = [item]
    else:
        files_to_check = []
        for dirpath, dirnames, filenames in os.walk(item):
            for file in filenames:
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
                print(f"Restored {filepath}")
        except Exception as e:
            pass

print("Done restoring layout margins")
