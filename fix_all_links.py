import os
import re

base_dir = r"c:\Users\ranki\Downloads\chopras-website-main (2)\chopras-website-main\src\app\[locale]"

def process_light_section(part):
    # Find all Link, a, EmailLink tags
    # We will use a regex to find them and modify their className
    def replacer(match):
        tag_full = match.group(0)
        # Check if it has className
        if 'className=' in tag_full:
            # Replace text-white with text-[#000066]
            tag_full = re.sub(r'\btext-white\b', 'text-[#000066]', tag_full)
            # Replace hover:text-[something] with hover:text-[#0000B3]
            tag_full = re.sub(r'hover:text-(?:white|transparent|\[[^\]]+\])', 'hover:text-[#0000B3]', tag_full)
        return tag_full

    part = re.sub(r'<(?:Link|a|EmailLink)[^>]+>', replacer, part)
    return part

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
            # If it's a light section (doesn't have bg-[#1B2B5E] or bg-black)
            if 'bg-[#1B2B5E]' not in part and 'bg-black' not in part:
                part = process_light_section(part)
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
