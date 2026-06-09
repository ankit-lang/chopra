#!/usr/bin/env node

/**
 * Complete Menu Description Updater
 * Updates all menu items with concise English descriptions and Dutch translations
 */

const fs = require('fs');
const path = require('path');

// Complete mapping of item ID to [English description, Dutch description]
const menuUpdates = {
  // Starters
  'dahi-puri': [
    'Filled shells with potato, chickpeas, yogurt and tamarind sauce.',
    'Gevulde deegballen met aardappel, kikkererwten, munt-, tamarindesaus, en yogurt.'
  ],
  'aloo-tikki': [
    'Pan-fried spiced potato patties with chutneys.',
    'Aardappel Kotelet.'
  ],
  'papdi-chaat': [
    'Crispy wafers with potato, tamarind and mint sauce.',
    'Meelcrisps met aardappelmix, tamarinde- en muntsaus.'
  ],
  'mixed-chaat': [
    'Combo with samosa, aloo tikki, papdi and yogurt sauce.',
    'Combo Veg. Samosa (1), Aloo Tikki (1) Papdi (verpletterd), yogurt en saus.'
  ],
  'plain-papad': [
    'Crispy lentil wafers.',
    'Knapperige linzencracker.'
  ],
  'masala-papad': [
    'Papad with spices, onion and tomato.',
    'Papad met kruiden, ui en tomaat.'
  ],

  // Tandoori
  'paneer-tikka': [
    'Cottage cheese marinated in spiced yogurt and chargrilled.',
    'Blokjes Indiase kaas gegrild met uien en paprika.'
  ],
  'malai-soya-chaap': [
    'Soya chaap marinated in creamy malai and mild spices, slow-grilled.',
    'Sojablokjes gemarineerd in yoghurt.'
  ],
  'achari-soya-chaap': [
    'Soya chaap marinated in tangy pickling spices and chargrilled.',
    'Sojablokjes gemarineerd in Indiase augurkensaus.'
  ],
  'tandoori-prawn-fish': [
    'Fresh prawns or fish marinated in spiced yogurt and chargrilled. Halal seafood.',
    'Gegrilde garnalen/vis gemarineerd in Indiase kruiden.'
  ],
  'tandoori-chicken': [
    'Whole leg marinated overnight in yogurt and spices, chargrilled in clay oven.',
    'Gegrilde kip gemarineerd in Indiase kruiden.'
  ],
  'chicken-tikka': [
    'Boneless halal chicken marinated in yogurt and spices, grilled in tandoor.',
    'Gegrilde kipfilet gemarineerd in Indiase kruiden.'
  ],
  'chicken-malai-tikka': [
    'Boneless halal chicken marinated in rich cream and mild spices, slow-grilled.',
    'Gegrilde kipfilet gemarineerd in room.'
  ],
  'chicken-hariyali-tikka': [
    'Halal chicken marinated in fresh coriander and mint, chargrilled.',
    'Gegrilde kipfilet gemarineerd in yoghurt en spinazie.'
  ],
  'chicken-lasooni-tikka': [
    'Halal chicken marinated in bold garlic and spice blend, chargrilled.',
    'Gegrilde kipfilet gemarineerd in knoflook en kruiden.'
  ],
  'lamb-seekh-kebab': [
    'Minced halal lamb mixed with fresh herbs and spices, grilled on skewers.',
    'Gekruid lamsgehakt spies.'
  ],
  'chicken-seekh-kebab': [
    'Minced halal chicken blended with fresh herbs and spices, chargrilled on skewers.',
    'Gekruid kipgehakt spies.'
  ],
  'chopras-non-veg-platter': [
    'Mix of various clay oven selections. Halal certified.',
    'Mix van diverse vlees kleioven (zonder vis en garnalen).'
  ],

  // Soups
  'tomato-soup': [
    'Fresh tomato soup with Indian spices and a hint of cream.',
    'Soep gemaakt met tomaten.'
  ],
  'lentil-soup': [
    'Homemade yellow lentil soup tempered with cumin and fresh herbs.',
    'Soep gemaakt met linzen.'
  ],
  'veg-manchow-soup': [
    'Wok-tossed vegetables in spiced Indo Chinese broth with crispy noodles.',
    'Soep met groenten, noedels en Aziatische kruiden.'
  ],
  'chicken-soup': [
    'Warming homemade soup made with fresh spices and tender halal chicken.',
    'Soep gemaakt met kip.'
  ],

  // Veg Curries
  'dal-makhani': [
    'Black lentils slow cooked overnight with butter and cream.',
    'Zwarte linzencurry met room.'
  ],
  'dal-tadka': [
    'Yellow lentils slow cooked and tempered with butter, cumin and garlic.',
    'Geel linzencurry met Indiase specerijen.'
  ],
  'rajma-raseela': [
    'Red kidney beans cooked in rich tomato and onion gravy.',
    'Kidney bonen in tomatensaus.'
  ],
  'chana-masala': [
    'Chickpeas slow cooked in tangy tomato and spice gravy.',
    'Kikkererwten curry, komijn, gember, koriander.'
  ],
  'aloo-gobi': [
    'Cauliflower and potato cooked with fresh turmeric and cumin.',
    'Aardappel en bloemkool.'
  ],
  'aloo-jeera': [
    'Potatoes tempered with cumin seeds and fresh coriander.',
    'Aardappel met komijn.'
  ],
  'mixed-veg': [
    'Seasonal vegetables cooked in light tomato and spice gravy.',
    'Maïs, wortel, sperziebonen, paprika, erwten, Indiase kaas.'
  ],
  'bhindi-masala': [
    'Fresh okra cooked with onions, tomatoes and Indian spices.',
    'Oker met ui en tomaat.'
  ],
  'baingan-bharta': [
    'Fire-roasted aubergine mashed with fresh spices and tomatoes.',
    'Aubergine met ui, tomaat, koriander.'
  ],
  'malai-kofta': [
    'Soft cottage cheese and potato dumplings in rich creamy tomato and cashew gravy.',
    'Gebakken balletjes gevuld met aardappel, Indiase kaas in cashewnootsaus.'
  ],
  'palak-paneer': [
    'Fresh paneer cubes simmered in smooth spiced spinach sauce.',
    'Indiase kaas in romige spinaziesaus.'
  ],
  'karahi-paneer': [
    'Paneer cubes cooked with bell peppers and tomatoes in spiced karahi gravy.',
    'Indiase kaas met paprika, ui en tomaat gekookt in dikke saus.'
  ],
  'shahi-paneer': [
    'Fresh cottage cheese in rich creamy tomato and cashew gravy.',
    'Indiase kaas in zoetzure romige saus met tomaat en cashewnoten.'
  ],
  'handi-paneer': [
    'Fresh paneer slow cooked in sealed clay pot with aromatic whole spices.',
    'Indiase kaas in romige saus met tomaat, cashewnoten en ui.'
  ],
  'paneer-butter-masala': [
    'Soft paneer in rich buttery tomato sauce with whole spices.',
    'Indiase kaas in romige saus met boter, tomaat, ui en cashewnoten.'
  ],
  'tawa-paneer-masala': [
    'Paneer cooked on hot tawa with peppers, onions and robust Indian spices.',
    'Indiase kaas met tomatenblokjes in saus met tomaat en ui.'
  ],
  'chopras-special-paneer': [
    'Paneer in a layered spice gravy unique to Chopras kitchen.',
    'Gekookte Indiase kaas (verrassingsgerecht).'
  ],

  // Chicken
  'karahi-chicken': [
    'Halal chicken cooked with fresh tomatoes and peppers in spiced karahi.',
    'Kip met paprika, ui en tomaat gekookt in dikke saus.'
  ],
  'chicken-curry': [
    'Classic halal chicken cooked in homemade onion and tomato gravy.',
    'Kip in saus met lndiase specerijen.'
  ],
  'chicken-tikka-masala': [
    'Chargrilled chicken pieces in creamy spiced tomato gravy.',
    'Kipfilet in romige saus met boter, tomaat, ui en cashewnoten.'
  ],
  'chicken-handi': [
    'Slow-cooked halal chicken sealed in clay pot with aromatic whole spices.',
    'Kip in romige saus met tomaat, cashewnoten en ui.'
  ],
  'chicken-vindaloo': [
    'Fiery halal chicken cooked in bold Goan-style vinegar and spice gravy.',
    'Kip met aardappel in pittige saus.'
  ],
  'chicken-methi-malai': [
    'Tender halal chicken cooked with fragrant fenugreek leaves in creamy sauce.',
    'Kip in romige fenegriek saus.'
  ],

  // Lamb/Mutton
  'mutton-rogan-josh': [
    'Slow-cooked halal lamb in deep Kashmiri spice gravy.',
    'Lams in pittige saus.'
  ],
  'mutton-vindaloo': [
    'Fiery halal mutton cooked in bold vinegar and spice gravy.',
    'Lams met aardappel in pittige saus.'
  ],
  'tawa-mutton-masala': [
    'Halal mutton cooked on hot tawa with peppers and robust spices.',
    'Indiase kaas met tomatenblokjes in saus met tomaat en ui.'
  ],
  'mutton-karahi': [
    'Halal mutton cooked with fresh tomatoes and peppers in spiced karahi gravy.',
    'Lams met paprika, ui en tomaat gekookt in dikke saus.'
  ],
  'mutton-korma': [
    'Halal lamb slow cooked in mild creamy almond and saffron sauce.',
    'Lams in romige tomatensaus.'
  ],
  'mutton-handi': [
    'Halal mutton slow cooked in sealed clay pot with whole spices and fresh herbs.',
    'Lams in romige saus met tomaat, cashewnoten en ui.'
  ],
  'rara-gosht': [
    'Tender halal lamb cooked with minced mutton in deeply spiced gravy.',
    'Lamsgehakt met lamsfilet gebakken in Indiase kruiden.'
  ],
  'keema-saag': [
    'Minced halal lamb cooked with fresh spinach in fragrant spiced gravy.',
    'Lamsgehakt gebakken met spinazie en tomaat.'
  ],

  // Indo-Chinese
  'veg-spring-roll': [
    'Crispy golden rolls filled with seasoned vegetables, served with dipping sauce.',
    'Vegetarische loempia.'
  ],
  'chicken-spring-roll': [
    'Crispy golden rolls filled with spiced halal chicken, served with sweet chilli sauce.',
    'Kip loempia.'
  ],
  'chilli-paneer': [
    'Crispy paneer wok-tossed with peppers and onions in bold Indo Chinese sauce.',
    'Indiase kaas in pittige saus.'
  ],
  'chilli-chicken': [
    'Halal chicken wok-tossed with green chillies and soy sauce.',
    'Crispy kip in pittige saus.'
  ],
  'veg-noodles': [
    'Stir-fried noodles with fresh vegetables in Indo Chinese style.',
    'Vegetarische bami.'
  ],

  // Biryani
  'veg-biryani': [
    'Fresh seasonal vegetables layered with aromatic saffron basmati rice and whole spices.',
    'Rijst met kruiden en groenten.'
  ],
  'chicken-biryani': [
    'Halal chicken slow cooked with saffron basmati rice and whole spices.',
    'Kip gekookt met rijst.'
  ],
  'prawn-biryani': [
    'Fresh prawns layered with fragrant saffron basmati rice and aromatic whole spices.',
    'Garnalen gekookt met rijst.'
  ],
  'lamb-biryani': [
    'Halal lamb slow cooked with fragrant saffron basmati rice.',
    'Lam gekookt met rijst.'
  ],
};

// Read the file
const filePath = path.join(__dirname, 'src/lib/menu-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Process each update
let updateCount = 0;
for (const [itemId, [enDesc, nlDesc]] of Object.entries(menuUpdates)) {
  // Find the item block by looking for id: 'itemId'
  const idPattern = `id: '${itemId}'`;
  if (!content.includes(idPattern)) {
    console.warn(`⚠ Item not found: ${itemId}`);
    continue;
  }

  // Find the start of this item
  const itemStart = content.indexOf(idPattern);
  const itemBlockStart = content.lastIndexOf('{', itemStart);
  
  // Find the end of this item (the closing brace)
  let braceCount = 0;
  let itemBlockEnd = itemBlockStart;
  for (let i = itemBlockStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        itemBlockEnd = i;
        break;
      }
    }
  }

  const itemBlock = content.substring(itemBlockStart, itemBlockEnd + 1);
  
  // Check if descriptionNl already exists
  if (itemBlock.includes('descriptionNl:')) {
    console.log(`✓ ${itemId} (already updated)`);
    continue;
  }

  // Replace description and add descriptionNl
  let newItemBlock = itemBlock;
  
  // Update English description
  const oldDescPattern = /description:\s*'([^']*)',/;
  newItemBlock = newItemBlock.replace(oldDescPattern, `description: '${enDesc}',\n    descriptionNl: '${nlDesc}',`);

  // If it worked, update the main content
  if (newItemBlock !== itemBlock) {
    content = content.substring(0, itemBlockStart) + newItemBlock + content.substring(itemBlockEnd + 1);
    console.log(`✓ ${itemId}`);
    updateCount++;
  } else {
    console.warn(`⚠ Failed to update: ${itemId}`);
  }
}

// Write the updated content back
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✅ Updated ${updateCount} menu items with Dutch descriptions`);
