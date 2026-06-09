#!/usr/bin/env python3
"""
Generate complete menu-data.ts with all descriptions and Dutch translations
"""

import json

# Map of item id to (English description, Dutch description)
menu_updates = {
    # Starters (continuing from what's already been updated)
    'pani-puri': (
        'Filled shells with potato, chickpeas, mint and tamarind water.',
        'Gevulde deegballen met aardappel, kikkererwten, munt- en tamarindesaus en tangy water.'
    ),
    'dahi-puri': (
        'Filled shells with potato, chickpeas, yogurt and tamarind sauce.',
        'Gevulde deegballen met aardappel, kikkererwten, munt-, tamarindesaus, en yogurt.'
    ),
    'aloo-tikki': (
        'Pan-fried spiced potato patties with chutneys.',
        'Aardappel Kotelet.'
    ),
    'papdi-chaat': (
        'Crispy wafers with potato, tamarind and mint sauce.',
        'Meelcrisps met aardappelmix, tamarinde- en muntsaus.'
    ),
    'mixed-chaat': (
        'Combo with samosa, aloo tikki, papdi and yogurt sauce.',
        'Combo Veg. Samosa (1), Aloo Tikki (1) Papdi (verpletterd), yogurt en saus.'
    ),
    'plain-papad': (
        'Crispy lentil wafers.',
        'Knapperige linzencracker.'
    ),
    'masala-papad': (
        'Papad with spices, onion and tomato.',
        'Papad met kruiden, ui en tomaat.'
    ),
}

# Generate replacement patterns 
print("# Item Update Mapping for menu-data.ts")
print("# Format: item_id -> (en_desc, nl_desc)")
print()

for item_id, (en_desc, nl_desc) in menu_updates.items():
    print(f"'{item_id}': (")
    print(f"  '{en_desc}',")
    print(f"  '{nl_desc}'")
    print("),")
