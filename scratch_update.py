import os
import re

base_dir = r"c:\Users\ranki\Downloads\chopras-website-main (2)\chopras-website-main\src\app\[locale]"
gradient_str = "text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF]"
hero_shadow = "style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}"
new_hero_shadow = "style={{ textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)' }}"

def process_file(filepath):
    if "vacancy" in filepath:
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Replace font-vibes with font-heading
    content = content.replace("font-vibes", "font-heading")

    # 2. Hero headings that have the gradient and a textShadow
    # The hero section h1 usually has `style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}`
    # We want to replace the gradient with `text-white` in these cases, and update the textShadow
    
    # We can just replace the gradient in the whole file. 
    # But wait, how do we know if it should be white or blue?
    # If it's a hero h1, it usually has `text-white` or `text-transparent ...` inside a `bg-[#1B2B5E]` block.
    # Let's split the file into sections `<section ...>` and process each section.
    
    sections = re.split(r'(<section)', content)
    new_sections = []
    
    for i, part in enumerate(sections):
        if i == 0:
            # Code before the first section
            new_sections.append(part.replace(gradient_str, "text-[#000066]"))
        elif part == '<section':
            new_sections.append(part)
        else:
            # We are inside a section
            if 'bg-[#1B2B5E]' in part:
                # Dark section -> text should be white
                part = part.replace(gradient_str, "text-white")
            elif 'bg-white' in part or 'bg-[#F7F8FC]' in part:
                # Light section -> text should be dark blue
                part = part.replace(gradient_str, "text-[#000066]")
            else:
                # Unknown section -> default to text-[#000066]
                part = part.replace(gradient_str, "text-[#000066]")
            new_sections.append(part)
            
    content = "".join(new_sections)
    
    # Update text shadow for hero
    content = content.replace(hero_shadow, new_hero_shadow)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")


for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".tsx"):
            process_file(os.path.join(root, file))

print("Done.")
