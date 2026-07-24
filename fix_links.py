import os
import re

base_dir = r"c:\Users\ranki\Downloads\chopras-website-main (2)\chopras-website-main\src\app\[locale]"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    sections = re.split(r'(<section)', content)
    new_sections = []
    
    for i, part in enumerate(sections):
        if part == '<section':
            new_sections.append(part)
        else:
            # We are inside a section or outside
            if 'bg-[#1B2B5E]' not in part and 'bg-black' not in part:
                # Replace links
                part = part.replace('text-white hover:text-[#000066]', 'text-[#000066] hover:text-[#0000B3]')
                part = part.replace('text-white hover:text-transparent', 'text-[#000066] hover:text-[#0000B3]')
            new_sections.append(part)
            
    content = "".join(new_sections)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".tsx"):
            process_file(os.path.join(root, file))

print("Done.")
