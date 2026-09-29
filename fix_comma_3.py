import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

post_start = content.find("slug: 'best-indian-restaurant-in-den-haag'")

match = re.search(r'contentNl:\s*`.*?`', content[post_start:], flags=re.DOTALL)
if match:
    end_idx = post_start + match.end()
    # Ensure there's a comma after the backtick
    after = content[end_idx:end_idx+20]
    if not after.lstrip().startswith(','):
        content = content[:end_idx] + ',' + content[end_idx:]

with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
