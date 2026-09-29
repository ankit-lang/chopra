import re

# 1. Update menu-data.ts
with open('src/lib/menu-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def remove_gluten_free(dish_id, text):
    pattern = r"(id:\s*'" + dish_id + r"'.*?dietary:\s*\[.*?\])"
    match = re.search(pattern, text, flags=re.DOTALL)
    if match:
        block = match.group(1)
        # remove 'glutenFree', or 'glutenFree' (handling commas)
        new_block = re.sub(r",\s*'glutenFree'", "", block)
        new_block = re.sub(r"'glutenFree',\s*", "", new_block)
        new_block = re.sub(r"'glutenFree'", "", new_block)
        return text.replace(block, new_block)
    return text

for dish in ['tomato-soup', 'veg-manchow-soup', 'plain-papad', 'masala-papad']:
    content = remove_gluten_free(dish, content)

with open('src/lib/menu-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Update page.tsx
with open('src/app/[locale]/gluten-free-menu/page.tsx', 'r', encoding='utf-8') as f:
    page_content = f.read()

# Lines 26 & 45
page_content = page_content.replace(
    'chana masala, dal tadka, plain papad, onion bhaji, veg manchow soup, rice dishes',
    'chana masala, dal tadka, onion bhaji, rice dishes'
)
page_content = page_content.replace(
    'chana masala, dal tadka, plain papad, onion bhaji, vegetable manchow soep, rijstgerechten',
    'chana masala, dal tadka, onion bhaji, rijstgerechten'
)

# Remove the plain papad FAQ (faqsEn)
faq_en_papad = """      {
            question: 'Is the plain papad at Chopras gluten free?',
            answer: 'Yes. Plain papad at Chopras is made from lentil flour only and is completely gluten-free. It is crispy, light and served as a traditional Indian starter. One serving is 3.5 euro.',
      },"""
page_content = page_content.replace(faq_en_papad + '\n', '')
page_content = page_content.replace(faq_en_papad, '')

# Remove the plain papad FAQ (faqsNl)
faq_nl_papad = """      {
            question: 'Is de plain papad bij Chopras glutenvrij?',
            answer: 'Ja. Plain papad bij Chopras is gemaakt van alleen lintenmeel en is volledig glutenvrij. Het is knapperig, licht en geserveerd als traditionele Indiase starter. Een portie kost 3,50 euro.',
      },"""
page_content = page_content.replace(faq_nl_papad + '\n', '')
page_content = page_content.replace(faq_nl_papad, '')

# Update the grid text
page_content = page_content.replace(
    "{ title: \"Groentecurry's\", items: 'Aloo gobi, baingan bharta, bhindi masala, veg manchow soup' }",
    "{ title: \"Groentecurry's\", items: 'Aloo gobi, baingan bharta, bhindi masala' }"
)
page_content = page_content.replace(
    "{ title: 'Vegetable Curries', items: 'Aloo gobi, baingan bharta, bhindi masala, veg manchow soup' }",
    "{ title: 'Vegetable Curries', items: 'Aloo gobi, baingan bharta, bhindi masala' }"
)
page_content = page_content.replace(
    "{ title: 'Starters en Bijgerechten', items: 'Onion bhaji, plain papad, rijstgerechten' }",
    "{ title: 'Starters en Bijgerechten', items: 'Onion bhaji, rijstgerechten' }"
)
page_content = page_content.replace(
    "{ title: 'Starters and Sides', items: 'Onion bhaji, plain papad, rice dishes' }",
    "{ title: 'Starters and Sides', items: 'Onion bhaji, rice dishes' }"
)

with open('src/app/[locale]/gluten-free-menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Updated gluten free menus successfully")
