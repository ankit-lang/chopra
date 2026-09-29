with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("`,\n,", "`,\n")
content = content.replace("`,\n\n,", "`,\n\n")
content = content.replace("`\n,", "`,\n")

with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
