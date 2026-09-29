import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# I need to find the `contentNl: \`...\`` for the second post and ensure it has a comma.
# Let's locate the second post's contentNl. 
post_start = content.find("slug: 'chopras-indian-restaurant-featured-in-times-of-india'")

# The contentNl ends with:
#   </a>
# </div>
# `
# We can search for `contentNl: ` in the second post, then find the closing backtick and add a comma if it's missing.

match = re.search(r'contentNl:\s*`.*?`', content[post_start:], flags=re.DOTALL)
if match:
    full_match = match.group(0)
    # Check if the character after the backtick is a comma
    end_idx = post_start + match.end()
    # It might be followed by whitespace then comma, or just whitespace then '}'
    after = content[end_idx:end_idx+20]
    if not after.lstrip().startswith(','):
        # We need to insert a comma right after the backtick
        content = content[:end_idx] + ',' + content[end_idx:]

with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
