import fs from 'fs';
import path from 'path';

// Dutch translations mapping
const dutchDescriptions = {
  'onion-bhaji': 'Uienbeignets geserveerd met munt en tamarindesaus.',
  'samosa': 'Driehoekig, goudgebakken hartig gebakje met kikkererwtenvullingen.',
  'veg-samosa-chaat': 'Verpletterd samosa met yogurt, kikkererwten, munt en tamarindesaus.',
  'pani-puri': 'Gevulde deegballen met aardappel, kikkererwten, munt- en tamarindesaus en tangy water.',
  'dahi-puri': 'Gevulde deegballen met aardappel, kikkererwten, munt-, tamarindesaus, en yogurt.',
  'aloo-tikki': 'Aardappel Kotelet.',
  'papdi-chaat': 'Meelcrisps met aardappelmix, tamarinde- en muntsaus.',
  'mixed-chaat': 'Combo Veg. Samosa (1), Aloo Tikki (1) Papdi (verpletterd), yogurt en saus.',
  'plain-papad': 'Knapperige linzencracker.',
  'masala-papad': 'Papad met kruiden, ui en tomaat.',
  
  'paneer-tikka': 'Blokjes Indiase kaas gegrild met uien en paprika.',
  'malai-soya-chaap': 'Sojablokjes gemarineerd in yoghurt.',
  'achari-soya-chaap': 'Sojablokjes gemarineerd in Indiase augurkensaus.',
  'tandoori-prawn-fish': 'Gegrilde garnalen/vis gemarineerd in Indiase kruiden.',
  'tandoori-chicken': 'Gegrilde kip gemarineerd in Indiase kruiden.',
  'chicken-tikka': 'Gegrilde kipfilet gemarineerd in Indiase kruiden.',
  'chicken-malai-tikka': 'Gegrilde kipfilet gemarineerd in room.',
  'chicken-hariyali-tikka': 'Gegrilde kipfilet gemarineerd in yoghurt en spinazie.',
  'chicken-lasooni-tikka': 'Gegrilde kipfilet gemarineerd in knoflook en kruiden.',
  'lamb-seekh-kebab': 'Gekruid lamsgehakt spies.',
  'chicken-seekh-kebab': 'Gekruid kipgehakt spies.',
  'chopras-non-veg-platter': 'Mix van diverse vlees kleioven (zonder vis en garnalen).',
  
  'tomato-soup': 'Soep gemaakt met tomaten.',
  'lentil-soup': 'Soep gemaakt met linzen.',
  'veg-manchow-soup': 'Soep met groenten, noedels en Aziatische kruiden.',
  'chicken-soup': 'Soep gemaakt met kip.',
  
  'dal-makhani': 'Zwarte linzencurry met room.',
  'dal-tadka': 'Geel linzencurry met Indiase specerijen.',
  'rajma-raseela': 'Kidney bonen in tomatensaus.',
  'chana-masala': 'Kikkererwten curry, komijn, gember, koriander.',
  'aloo-gobi': 'Aardappel en bloemkool.',
  'aloo-jeera': 'Aardappel met komijn.',
  'mixed-veg': 'Maïs, wortel, sperziebonen, paprika, erwten, Indiase kaas.',
  'bhindi-masala': 'Oker met ui en tomaat.',
  'baingan-bharta': 'Aubergine met ui, tomaat, koriander.',
  'malai-kofta': 'Gebakken balletjes gevuld met aardappel, Indiase kaas in cashewnootsaus.',
  
  'palak-paneer': 'Indiase kaas in romige spinaziesaus.',
  'karahi-paneer': 'Indiase kaas met paprika, ui en tomaat gekookt in dikke saus.',
  'shahi-paneer': 'Indiase kaas in zoetzure romige saus met tomaat en cashewnoten.',
  'handi-paneer': 'Indiase kaas in romige saus met tomaat, cashewnoten en ui.',
  'paneer-butter-masala': 'Indiase kaas in romige saus met boter, tomaat, ui en cashewnoten.',
  'tawa-paneer-masala': 'Indiase kaas met tomatenblokjes in saus met tomaat en ui.',
  'chopras-special-paneer': 'Gekookte Indiase kaas (verrassingsgerecht).',
  
  'butter-chicken': 'Kip in romige saus met tomaat en cashewnoten.',
  'karahi-chicken': 'Kip met paprika, ui en tomaat gekookt in dikke saus.',
  'chicken-curry': 'Kip in saus met lndiase specerijen.',
  'chicken-tikka-masala': 'Kipfilet in romige saus met boter, tomaat, ui en cashewnoten.',
  'chicken-handi': 'Kip in romige saus met tomaat, cashewnoten en ui.',
  'chicken-vindaloo': 'Kip met aardappel in pittige saus.',
  'chicken-methi-malai': 'Kip in romige fenegriek saus.',
  
  'mutton-rogan-josh': 'Lams in pittige saus.',
  'mutton-vindaloo': 'Lams met aardappel in pittige saus.',
  'tawa-mutton-masala': 'Indiase kaas met tomatenblokjes in saus met tomaat en ui.',
  'mutton-karahi': 'Lams met paprika, ui en tomaat gekookt in dikke saus.',
  'mutton-korma': 'Lams in romige tomatensaus.',
  'mutton-handi': 'Lams in romige saus met tomaat, cashewnoten en ui.',
  'rara-gosht': 'Lamsgehakt met lamsfilet gebakken in Indiase kruiden.',
  'keema-saag': 'Lamsgehakt gebakken met spinazie en tomaat.',
  
  'veg-spring-roll': 'Vegetarische loempia.',
  'chicken-spring-roll': 'Kip loempia.',
  'chilli-paneer': 'Indiase kaas in pittige saus.',
  'chilli-chicken': 'Crispy kip in pittige saus.',
  'veg-noodles': 'Vegetarische bami.',
  
  'veg-biryani': 'Rijst met kruiden en groenten.',
  'chicken-biryani': 'Kip gekookt met rijst.',
  'prawn-biryani': 'Garnalen gekookt met rijst.',
  'lamb-biryani': 'Lam gekookt met rijst.',
  
  'tandoori-roti': 'Volkoren platbrood, gebakken in kleioven.',
  'butter-roti': 'Volkoren platbrood met boter, gebakken in kleioven.',
  'onion-roti': 'Volkoren platbrood met uien, gebakken in kleioven.',
  'garlic-roti': 'Volkoren platbrood met knoflook, gebakken in kleioven.',
  'missi-roti': 'Volkoren en kikkererwtenmeel platbrood met kruiden, gebakken in kleioven.',
  'lachha-paratha': 'Gelaagd volkoren platbrood gebakken in kleioven.',
  'pudina-paratha': 'Volkoren platbrood met muntblaadjes, gebakken in kleioven.',
  'aloo-paratha': 'Volkoren platbrood met aardappel, gebakken in kleioven.',
  'paneer-paratha': 'Volkoren platbrood met Indiase kaas, gebakken in kleioven.',
  'plain-naan': 'Platbrood van wit tarwemeel, gebakken in kleioven.',
  'butter-naan': 'Platbrood van wit tarwemeel met boter, gebakken in kleioven.',
  'garlic-naan': 'Platbrood van wit tarwemeel met knoflook, gebakken in kleioven.',
  'paneer-naan': 'Platbrood van wit tarwemeel met Indiase kaas, gebakken in kleioven.',
  'cheese-naan': 'Platbrood van wit tarwemeel met Nederlandse kaas, gebakken in kleioven.',
  'keema-naan': 'Platbrood van wit tarwemeel met lams- of kipgehakt, gebakken in kleioven.',
  
  'paneer-roll': 'Wrap gevuld met gekruide Indiase kaas en verse salade.',
  'egg-kathi-roll': 'Wrap gevuld met omelet, kruiden en verse salade.',
  'chicken-tikka-roll': 'Wrap gevuld met gegrilde kipfilet en verse salade.',
  'mutton-seekh-roll': 'Wrap gevuld met lamsvlees en verse salade.',
  
  'steamed-rice': 'Gestoomde rijst.',
  'jeera-rice': 'Rijst met komijn.',
  'veg-fried-rice': 'Roergebakken rijst met diverse groenten.',
  'chicken-fried-rice': 'Roergebakken rijst met kip.',
  'veg-thali': 'Schotel met diverse vegetarische gerechten.',
  'non-veg-thali': 'Schotel met diverse vegetarische en vlees gerechten.',
  'fries-nuggets': 'Frietjes, kipnuggets en komkommer.',
  'onion-salad': 'Verse ui.',
  'mixed-salad': 'Verse ui, komkommer, tomaat, wortel.',
  'boondi-raita': 'Yogurt met gefrituurde kikkererwtenbolletjes.',
  'cucumber-raita': 'Yogurt met komkommer.',
  'mixed-raita': 'Yogurt met komkommer en gefrituurde kikkererwtenbolletjes.',
  'green-chillies': 'Verse groene pepers (5 pcs).',
  'mixed-pickle': 'Pittige marinade van fruit en groenten in specerijen en olie.',
  'mint-chutney': 'Verse saus gemaakt van munt, koriander, spinazie, groene chili, gember, knoflook, citroen, yoghurt en Indiase kruiden.',
  'tamarind-chutney': 'Verse tamarindesaus met jaggery, suiker, Indiase kruiden, komijn en gedroogd gemberpoeder, voor een zoetzure smaak.',
  'vinegar-onion': 'Gesnipperde ui in azijn met suiker en rode biet, voor een zoetzure smaak.',
  
  'moong-dal-halwa': 'Zoete linzenpudding.',
  'saffron-kheer': 'Rijstpudding met saffraan.',
  'rasmalai': 'Indiase kaas bolletjes in zoete saffraan melk.',
  'gulab-jamun': 'Gebakken deegballetjes in rozenwatersiroop.',
  'kulfi-pistachio': 'Indiaas ijs met stokje - pistachemaak.',
  'kulfi-malai': 'Indiaas ijs met stokje - melkroomsmaak.',
  'kulfi-coconut': 'Indiaas ijs met stokje - kokossmaak.',
  'kulfi-mango': 'Indiaas ijs met stokje - mangosmaak.',
  'ice-cream-vanilla': 'Ijs - vanillesmaak.',
  'ice-cream-chocolate': 'Ijs - chocoladesmaak.',
  'ice-cream-strawberry': 'Ijs - aardbeiensmaak.',
  
  'mango-lassi': 'Yoghurt gemengd met mangopulp.',
  'salted-lassi': 'Yoghurt gemengd met zout.',
  'sweet-lassi': 'Yoghurt gemengd met suiker.',
  'shikanji': 'Indiase drank met water, citroen, zout, suiker en specerijen.',
  'jal-jeera': 'Zoetzuur kruidwater met komijn, munt, citroen en zwart zout.',
  'masala-soda': 'Soda met toegevoegde Indiase specerijen en citroen.',
  'masala-coke': 'Coca-Cola met toegevoegde Indiase specerijen.',
  'masala-tea': 'Traditionele Indiase thee met zwarte thee, melk en kruiden.',
  'thums-up': 'Indiase frisdrank zoals Coca-Cola, meer bruisend.',
  'limca': 'Indiase frisdrank met citroenlimoensmaak.',
  'maaza': 'Mango Sap Homemade.',
  'cola-cola-zero': '0% Suiker.',
  'fanta': 'Yellow/Green/Orange.',
  'sprite': 'Sprite.',
  'fernandes': 'Fernandes.',
  'heineken-00': 'Heineken 0.0%.',
  'redbull': 'RedBull.',
  'virgin-mojito': 'Virgin Mojito.',
  'apple-juice': 'Apple Juice.',
  'orange-juice': 'Orange Juice.',
  'chocolate-milk': 'Chocolate Milk.',
  'iced-coffee': 'Iced Coffee.',
  'ice-tea-peach': 'Ice Tea Peach.',
  'ginger-ale': 'Ginger Ale.',
  'coffee-cappuccino': 'Coffee / Cappuccino.',
  'green-tea': 'Green Tea.',
  'still-water-250ml': 'Still Water 250ml.',
  'sparkling-water-250ml': 'Sparkling Water 250ml.',
  'still-water-15l': 'Still Water 1.5 litre.',
};

const filePath = './src/lib/menu-data.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Simple regex replace for each item
const lines = content.split('\n');
let updatedLines = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  updatedLines.push(line);
  
  // Look for id lines to find items
  if (line.includes("id: '") && line.includes("'")) {
    const idMatch = line.match(/id: '([^']+)'/);
    if (idMatch) {
      const itemId = idMatch[1];
      const dutchDesc = dutchDescriptions[itemId];
      
      // Scan forward to find the description field
      let j = i + 1;
      while (j < lines.length && !lines[j].includes("},")) {
        j++;
      }
      
      // Copy lines until we hit description
      while (i + 1 < j && !lines[i + 1].includes("description:")) {
        i++;
        updatedLines.push(lines[i]);
      }
      
      // Handle description line
      if (i + 1 < j && lines[i + 1].includes("description:")) {
        i++;
        const descLine = lines[i];
        updatedLines.push(descLine);
        
        // Add descriptionNl after description if it doesn't already have it
        if (dutchDesc && !lines[i + 1].includes("descriptionNl:")) {
          updatedLines.push(`    descriptionNl: '${dutchDesc}',`);
        }
      }
    }
  }
  
  i++;
}

// Write back
fs.writeFileSync(filePath, updatedLines.join('\n'));
console.log('✓ Menu descriptions updated with Dutch translations');
