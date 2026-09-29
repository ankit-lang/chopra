import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """    contentNl: `
<img src="/images/blog/16sep.png" alt="Feestzaal in Den Haag voor 25 tot 50 Gasten: Kies het Juiste Evenementenformat" class="w-full max-h-[480px] object-cover rounded-2xl mb-8" />

<p>Het plannen van een evenement gaat om meer dan het vinden van een mooie zaal. De manier waarop gasten eten, rondlopen en met elkaar omgaan, kan een groot verschil maken voor de sfeer. Als u op zoek bent naar een feestzaal in Den Haag voor een verjaardag, bruiloft, babyshower, familiefeest of zakelijk evenement, helpt het om het format te bepalen voordat u de locatie boekt.</p>

<p>Bij Chopras Indian Restaurant is de privé Feestzaal aan de Leyweg 986 in Den Haag ontworpen voor ongeveer 25 tot 50 gasten. De locatie combineert een privé evenementenruimte met Indiase catering, zodat de zaal en het eten samen door één team kunnen worden georganiseerd.</p>

<h2>Perfect voor uw speciale gelegenheden</h2>

<p>Een zittend diner is een natuurlijke keuze wanneer de maaltijd een belangrijk onderdeel van de viering is. Bruiloften, jubilea, babyshowers, privédiners met de familie en formele bedrijfsdiners werken allemaal goed wanneer de gasten samen aan tafel zitten. Afhankelijk van het gekozen arrangement kunnen gasten genieten van een gevarieerd menu in plaats van steeds dezelfde paar gerechten te herhalen.</p>

<p>Voorgerechten kunnen bijvoorbeeld Pani Puri, Aloo Tikki, Veg Samosa Chaat of Onion Bhaji zijn. De keuze voor het hoofdgerecht kan variëren van Dal Makhani, Paneer Butter Masala en Shahi Paneer tot Butter Chicken, Chicken Karahi, Mutton Rogan Josh en Biryani. Vers brood zoals Garlic Naan, Butter Naan, Peshwari Naan en Roti kunnen bij de maaltijd worden geserveerd, gevolgd door desserts zoals Gulab Jamun, Rasmalai, Kulfi of Saffron Kheer. Indiase drankjes zoals Mango Lassi, Sweet Lassi, Masala Tea, Jal Jeera en Shikanji kunnen ook worden toegevoegd. Een zittend format werkt bijzonder goed wanneer toespraken, presentaties of geplande momenten deel uitmaken van de avond.</p>

<h2>Buffet voor variatie en flexibiliteit</h2>

<p>Een buffet kan een praktische optie zijn wanneer gasten verschillende smaken hebben. Mensen kunnen kiezen wat ze het lekkerst vinden en van meerdere gerechten genieten zonder dat iedereen dezelfde maaltijd hoeft te bestellen.</p>

<p>Een groepsmenu kan vegetarische gerechten combineren, evenals veganistische opties indien specifiek bereid, glutenvrije opties waar geschikt, en halal-gecertificeerde vleesgerechten. Chopras Indian Restaurant adviseert gasten om allergieën en dieetwensen vooraf door te geven, zodat geschikte bereidingswijzen besproken kunnen worden. Op het menu van het restaurant staan ook de dieetopties aangegeven.</p>

<p>In plaats van alleen te focussen op tandoori gerechten, kan een buffet een breder Indiaas aanbod bevatten: voorgerechten en chaat, tandoori keuzes zoals Chicken Tikka, Malai Soya Chaap, Paneer Tikka, Lamb Seekh Kebab of Seekh Kebab, vegetarische curries, kipcurries, lams- en schapenvleescurries, biryani, broden, rijst en bijgerechten, desserts en Indiase drankjes. Dit geeft gasten meer keuze uit verschillende delen van het menu.</p>

<h2>Receptie of gemengd format</h2>

<p>Niet bij elk evenement hoeft iedereen de hele avond te zitten. Een staande receptie of een gemengd format kan handig zijn voor netwerken, workshops, teambijeenkomsten, culturele evenementen en gemeenschapsbijeenkomsten. Gasten kunnen beginnen met voorgerechten en drankjes, overgaan naar een buffet of zittend diner, en daarna terugkeren naar een meer ontspannen sociale setting.</p>

<p>De evenementenruimte van Chopras Indian Restaurant kan worden ingericht naar het type bijeenkomst. Evenementenformats kunnen bestaan uit bruiloften, babyshowers, verjaardagen, bedrijfsevenementen, netwerksessies, privédiners en culturele vieringen. De ruimte is ook geschikt voor Nikah-recepties, verlovingsfeesten, teamvieringen, yoga- en meditatiesessies, dansworkshops en liefdadigheidsavonden.</p>

<p>Culturele en seizoensgebonden vieringen kunnen zowel Indiase als Nederlandse gelegenheden omvatten. Afhankelijk van de groep en het programma kan dit Diwali, Holi, Eid, Ramadan iftar bijeenkomsten, Navratri en Garba-gerelateerde evenementen omvatten, evenals kerstdiners, nieuwjaarsbijeenkomsten, Koningsdagvieringen en andere Nederlandse gemeenschapsgelegenheden.</p>

<h2>Denk aan de gastenlijst</h2>

<p>Het aantal gasten moet de indeling en het menu beïnvloeden. Een groep van 25 personen wil misschien een intiemer diner, terwijl een groep van dichter bij 80 personen baat kan hebben bij een buffet of gemengde opstelling. Gasten kunnen er ook voor kiezen om à la carte, een Veg Thali of een Non-Veg Thali te bestellen wanneer dit beter past bij het evenementenformat.</p>

<p>Het is belangrijk om rekening te houden met dieetwensen. Chopras Indian Restaurant biedt vegetarische keuzes en veganistische en glutenvrije opties wanneer hier specifiek om gevraagd wordt. Alle vleesgerechten zijn halal-gecertificeerd. Gasten dienen allergieën en dieetwensen vooraf door te geven aan het restaurant, zodat het team advies kan geven over een geschikte bereiding.</p>

<h2>Neem locatie op in de planning</h2>

<p>De locatie is belangrijk wanneer gasten naar een privé-evenement reizen. Chopras Indian Restaurant ligt aan de Leyweg in Den Haag, wat de Feestzaal relevant maakt voor lokale wijken in Zuid-Den Haag, zoals Escamp, Zuidwest, Zuiderpark, Morgenstond en Wateringse Veld, evenals voor gasten uit Rijswijk, Delft, Zoetermeer, Voorburg, Leidschenveen, Nootdorp en Leidschendam.</p>

<p>Voor gasten die een evenement combineren met sightseeing of een breder stadsbezoek, zijn handige buurten en attracties in Den Haag onder andere Den Haag Centrum, het Binnenhof, het Mauritshuis, de Hofvijver, het Plein, Den Haag Centraal en het Spuiplein. Andere bekende bezoekersgebieden zijn het Zeeheldenkwartier, de Piet Heinstraat, de Prins Hendrikstraat, Duinoord, de Thomsonlaan, het Thomsonplein, de Frederik Hendriklaan, Scheveningen, de Keizerstraat, de Boulevard, het Strand, de Pier, het Kurhaus, Duindorp en Madurodam. Deze locaties moeten contextueel worden gebruikt, in plaats van als een lijst van herhaalde trefwoorden.</p>

<h2>Waarom één locatie en één cateringteam kan helpen</h2>

<p>Een praktisch voordeel van het kiezen voor een restaurant met een privé evenementenruimte, is de eenvoudigere coördinatie. Bij Chopras Indian Restaurant worden de privélocatie en Indiase catering samen beheerd. Organisatoren kunnen het aantal gasten, het type evenement, de menuvoorkeuren en dieetwensen met één team bespreken.</p>

<h2>Welk format moet u kiezen?</h2>

<p>Er is geen enkel format dat bij elke gelegenheid past. Een bruiloft kan geschikt zijn voor een zittend diner of buffet. Een verjaardag kan met beide werken. Een netwerkevenement kan baat hebben bij een receptie of een gemengd format. Een culturele viering kan eten, gesprekken en een flexibele indeling combineren.</p>

<p>Voor privé-evenementen van ongeveer 25 tot 50 gasten biedt Chopras Indian Restaurant in Den Haag een combinatie van privéruimte en Indiase catering onder één dak. Het vooraf bespreken van het aantal gasten, het type evenement, het menu-format en de dieetwensen kan helpen om een opzet te creëren die werkt voor zowel de gastheer als de gasten.</p>
`,\n"""

fields = """
    titleNl: 'Feestzaal in Den Haag voor 25 tot 50 Gasten: Kies het Juiste Evenementenformat',
    metaTitleNl: 'Feestzaal in Den Haag voor 25 tot 50 Gasten: Kies het Juiste Format',
    metaDescriptionNl: 'Op zoek naar een feestzaal in Den Haag voor 25 tot 50 gasten? Leer hoe u het juiste evenementenformat kiest voor verjaardagen, bruiloften, bedrijfsevenementen en privéfeesten.',
    h1Nl: 'Feestzaal in Den Haag voor 25 tot 50 Gasten: Hoe Kies Je Het Juiste Evenementenformat',
    primaryKeywordNl: 'Feestzaal in Den Haag',
    excerptNl: 'Op zoek naar een feestzaal in Den Haag voor 25 tot 50 gasten? Leer hoe u het juiste evenementenformat kiest voor verjaardagen, bruiloften, bedrijfsevenementen en privéfeesten.',
"""

post_start = content.find("slug: 'feestzaal-in-den-haag-for-25-50-guests-choose-the-right-event-format'")

if post_start != -1:
    lang_index = content.find("language: 'en',", post_start)
    content = content[:lang_index] + fields + content[lang_index:]
    
    # re-find start because index changed
    post_start = content.find("slug: 'feestzaal-in-den-haag-for-25-50-guests-choose-the-right-event-format'")

    # find where to inject contentNl: after `content: \`...\`, `
    content_match = re.search(r'content:\s*`.*?`,?', content[post_start:], flags=re.DOTALL)
    if content_match:
        end_idx = post_start + content_match.end()
        # ensure there is a comma
        if not content[end_idx-1] == ',':
            content = content[:end_idx] + ',\n' + replacement + content[end_idx:]
        else:
            content = content[:end_idx] + '\n' + replacement + content[end_idx:]
            
    with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated successfully")
else:
    print("Post not found!")

