#!/usr/bin/env python3
"""Generate menu description updates"""

import json

menu_updates = {
    # Starters
    'veg-samosa-chaat': {
        'desc': 'Broken samosa with yogurt, chickpeas, mint and tamarind sauce.',
        'descNl': 'Verpletterd samosa met yogurt, kikkererwten, munt en tamarindesaus.'
    },
    'pani-puri': {
        'desc': 'Filled shells with potato, chickpeas, mint and tamarind water.',
        'descNl': 'Gevulde deegballen met aardappel, kikkererwten, munt- en tamarindesaus en tangy water.'
    },
    'dahi-puri': {
        'desc': 'Filled shells with potato, chickpeas, yogurt and tamarind sauce.',
        'descNl': 'Gevulde deegballen met aardappel, kikkererwten, munt-, tamarindesaus, en yogurt.'
    },
    'aloo-tikki': {
        'desc': 'Pan-fried spiced potato patties with chutneys.',
        'descNl': 'Aardappel Kotelet.'
    },
    'papdi-chaat': {
        'desc': 'Crispy wafers with potato, tamarind and mint sauce.',
        'descNl': 'Meelcrisps met aardappelmix, tamarinde- en muntsaus.'
    },
    'mixed-chaat': {
        'desc': 'Combo with samosa, aloo tikki, papdi and yogurt sauce.',
        'descNl': 'Combo Veg. Samosa (1), Aloo Tikki (1) Papdi (verpletterd), yogurt en saus.'
    },
    'plain-papad': {
        'desc': 'Crispy lentil wafers.',
        'descNl': 'Knapperige linzencracker.'
    },
    'masala-papad': {
        'desc': 'Papad with spices, onion and tomato.',
        'descNl': 'Papad met kruiden, ui en tomaat.'
    },
    
    # Tandoori
    'paneer-tikka': {
        'desc': 'Cottage cheese marinated in spiced yogurt and chargrilled.',
        'descNl': 'Blokjes Indiase kaas gegrild met uien en paprika.'
    },
    'malai-soya-chaap': {
        'desc': 'Soya chaap marinated in creamy malai and mild spices, slow-grilled.',
        'descNl': 'Sojablokjes gemarineerd in yoghurt.'
    },
    'achari-soya-chaap': {
        'desc': 'Soya chaap marinated in tangy pickling spices and chargrilled.',
        'descNl': 'Sojablokjes gemarineerd in Indiase augurkensaus.'
    },
    'tandoori-prawn-fish': {
        'desc': 'Fresh prawns or fish marinated in spiced yogurt and chargrilled. Halal seafood.',
        'descNl': 'Gegrilde garnalen/vis gemarineerd in Indiase kruiden.'
    },
    'tandoori-chicken': {
        'desc': 'Whole leg marinated overnight in yogurt and spices, chargrilled in clay oven.',
        'descNl': 'Gegrilde kip gemarineerd in Indiase kruiden.'
    },
    'chicken-tikka': {
        'desc': 'Boneless halal chicken marinated in yogurt and spices, grilled in tandoor.',
        'descNl': 'Gegrilde kipfilet gemarineerd in Indiase kruiden.'
    },
    'chicken-malai-tikka': {
        'desc': 'Boneless halal chicken marinated in rich cream and mild spices, slow-grilled.',
        'descNl': 'Gegrilde kipfilet gemarineerd in room.'
    },
    'chicken-hariyali-tikka': {
        'desc': 'Halal chicken marinated in fresh coriander and mint, chargrilled.',
        'descNl': 'Gegrilde kipfilet gemarineerd in yoghurt en spinazie.'
    },
    'chicken-lasooni-tikka': {
        'desc': 'Halal chicken marinated in bold garlic and spice blend, chargrilled.',
        'descNl': 'Gegrilde kipfilet gemarineerd in knoflook en kruiden.'
    },
    'lamb-seekh-kebab': {
        'desc': 'Minced halal lamb mixed with fresh herbs and spices, grilled on skewers.',
        'descNl': 'Gekruid lamsgehakt spies.'
    },
    'chicken-seekh-kebab': {
        'desc': 'Minced halal chicken blended with fresh herbs and spices, chargrilled on skewers.',
        'descNl': 'Gekruid kipgehakt spies.'
    },
    'chopras-non-veg-platter': {
        'desc': 'Mix of various clay oven selections. Halal certified.',
        'descNl': 'Mix van diverse vlees kleioven (zonder vis en garnalen).'
    },
    
    # Soups
    'tomato-soup': {
        'desc': 'Fresh tomato soup with Indian spices and a hint of cream.',
        'descNl': 'Soep gemaakt met tomaten.'
    },
    'lentil-soup': {
        'desc': 'Homemade yellow lentil soup tempered with cumin and fresh herbs.',
        'descNl': 'Soep gemaakt met linzen.'
    },
    'veg-manchow-soup': {
        'desc': 'Wok-tossed vegetables in spiced Indo Chinese broth with crispy noodles.',
        'descNl': 'Soep met groenten, noedels en Aziatische kruiden.'
    },
    'chicken-soup': {
        'desc': 'Warming homemade soup made with fresh spices and tender halal chicken.',
        'descNl': 'Soep gemaakt met kip.'
    },
    
    # Veg Curries
    'dal-makhani': {
        'desc': 'Black lentils slow cooked overnight with butter and cream.',
        'descNl': 'Zwarte linzencurry met room.'
    },
    'dal-tadka': {
        'desc': 'Yellow lentils slow cooked and tempered with butter, cumin and garlic.',
        'descNl': 'Geel linzencurry met Indiase specerijen.'
    },
    'rajma-raseela': {
        'desc': 'Red kidney beans cooked in rich tomato and onion gravy.',
        'descNl': 'Kidney bonen in tomatensaus.'
    },
    'chana-masala': {
        'desc': 'Chickpeas slow cooked in tangy tomato and spice gravy.',
        'descNl': 'Kikkererwten curry, komijn, gember, koriander.'
    },
    'aloo-gobi': {
        'desc': 'Cauliflower and potato cooked with fresh turmeric and cumin.',
        'descNl': 'Aardappel en bloemkool.'
    },
    'aloo-jeera': {
        'desc': 'Potatoes tempered with cumin seeds and fresh coriander.',
        'descNl': 'Aardappel met komijn.'
    },
    'mixed-veg': {
        'desc': 'Seasonal vegetables cooked in light tomato and spice gravy.',
        'descNl': 'Maïs, wortel, sperziebonen, paprika, erwten, Indiase kaas.'
    },
    'bhindi-masala': {
        'desc': 'Fresh okra cooked with onions, tomatoes and Indian spices.',
        'descNl': 'Oker met ui en tomaat.'
    },
    'baingan-bharta': {
        'desc': 'Fire-roasted aubergine mashed with fresh spices and tomatoes.',
        'descNl': 'Aubergine met ui, tomaat, koriander.'
    },
    'malai-kofta': {
        'desc': 'Soft cottage cheese and potato dumplings in rich creamy tomato and cashew gravy.',
        'descNl': 'Gebakken balletjes gevuld met aardappel, Indiase kaas in cashewnootsaus.'
    },
    'palak-paneer': {
        'desc': 'Fresh paneer cubes simmered in smooth spiced spinach sauce.',
        'descNl': 'Indiase kaas in romige spinaziesaus.'
    },
    'karahi-paneer': {
        'desc': 'Paneer cubes cooked with bell peppers and tomatoes in spiced karahi gravy.',
        'descNl': 'Indiase kaas met paprika, ui en tomaat gekookt in dikke saus.'
    },
    'shahi-paneer': {
        'desc': 'Fresh cottage cheese in rich creamy tomato and cashew gravy.',
        'descNl': 'Indiase kaas in zoetzure romige saus met tomaat en cashewnoten.'
    },
    'handi-paneer': {
        'desc': 'Fresh paneer slow cooked in sealed clay pot with aromatic whole spices.',
        'descNl': 'Indiase kaas in romige saus met tomaat, cashewnoten en ui.'
    },
    'paneer-butter-masala': {
        'desc': 'Soft paneer in rich buttery tomato sauce with whole spices.',
        'descNl': 'Indiase kaas in romige saus met boter, tomaat, ui en cashewnoten.'
    },
    'tawa-paneer-masala': {
        'desc': 'Paneer cooked on hot tawa with peppers, onions and robust Indian spices.',
        'descNl': 'Indiase kaas met tomatenblokjes in saus met tomaat en ui.'
    },
    'chopras-special-paneer': {
        'desc': 'Paneer in a layered spice gravy unique to Chopras kitchen.',
        'descNl': 'Gekookte Indiase kaas (verrassingsgerecht).'
    },
    
    # Chicken Curries
    'butter-chicken': {
        'desc': 'Tender halal chicken in rich slow-cooked tomato and cream sauce.',
        'descNl': 'Kip in romige saus met tomaat en cashewnoten.'
    },
    'karahi-chicken': {
        'desc': 'Halal chicken cooked with fresh tomatoes and peppers in spiced karahi.',
        'descNl': 'Kip met paprika, ui en tomaat gekookt in dikke saus.'
    },
    'chicken-curry': {
        'desc': 'Classic halal chicken cooked in homemade onion and tomato gravy.',
        'descNl': 'Kip in saus met lndiase specerijen.'
    },
    'chicken-tikka-masala': {
        'desc': 'Chargrilled chicken pieces in creamy spiced tomato gravy.',
        'descNl': 'Kipfilet in romige saus met boter, tomaat, ui en cashewnoten.'
    },
    'chicken-handi': {
        'desc': 'Slow-cooked halal chicken sealed in clay pot with aromatic whole spices.',
        'descNl': 'Kip in romige saus met tomaat, cashewnoten en ui.'
    },
    'chicken-vindaloo': {
        'desc': 'Fiery halal chicken cooked in bold Goan-style vinegar and spice gravy.',
        'descNl': 'Kip met aardappel in pittige saus.'
    },
    'chicken-methi-malai': {
        'desc': 'Tender halal chicken cooked with fragrant fenugreek leaves in creamy sauce.',
        'descNl': 'Kip in romige fenegriek saus.'
    },
    
    # Lamb Curries
    'mutton-rogan-josh': {
        'desc': 'Slow-cooked halal lamb in deep Kashmiri spice gravy.',
        'descNl': 'Lams in pittige saus.'
    },
    'mutton-vindaloo': {
        'desc': 'Fiery halal mutton cooked in bold vinegar and spice gravy.',
        'descNl': 'Lams met aardappel in pittige saus.'
    },
    'tawa-mutton-masala': {
        'desc': 'Halal mutton cooked on hot tawa with peppers and robust spices.',
        'descNl': 'Indiase kaas met tomatenblokjes in saus met tomaat en ui.'
    },
    'mutton-karahi': {
        'desc': 'Halal mutton cooked with fresh tomatoes and peppers in spiced karahi gravy.',
        'descNl': 'Lams met paprika, ui en tomaat gekookt in dikke saus.'
    },
    'mutton-korma': {
        'desc': 'Halal lamb slow cooked in mild creamy almond and saffron sauce.',
        'descNl': 'Lams in romige tomatensaus.'
    },
    'mutton-handi': {
        'desc': 'Halal mutton slow cooked in sealed clay pot with whole spices and fresh herbs.',
        'descNl': 'Lams in romige saus met tomaat, cashewnoten en ui.'
    },
    'rara-gosht': {
        'desc': 'Tender halal lamb cooked with minced mutton in deeply spiced gravy.',
        'descNl': 'Lamsgehakt met lamsfilet gebakken in Indiase kruiden.'
    },
    'keema-saag': {
        'desc': 'Minced halal lamb cooked with fresh spinach in fragrant spiced gravy.',
        'descNl': 'Lamsgehakt gebakken met spinazie en tomaat.'
    },
}

# Print as Python code for insertion
for item_id, updates in menu_updates.items():
    print(f"\n# {item_id}")
    print(f"description: '{updates['desc']}'")
    print(f"descriptionNl: '{updates['descNl']}'")
