import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

faqsNl_replacement = """faqsNl: [
      {
        question: 'Waar kan ik het beste halal Indiase eten in Den Haag vinden?',
        answer: 'Chopras Indian Restaurant aan de Leyweg 986 is een uitstekende optie voor mensen die op zoek zijn naar authentiek halal Indiaas eten in Den Haag, met een uitgebreide menukaart met tandoori, biryani, curries, Indiaas streetfood, vegetarische en veganistische gerechten.',
      },
      {
        question: 'Is Chopras Indian Restaurant 100% halal?',
        answer: 'Ja. Chopras geeft aan dat de volledige keuken en menukaart halal gecertificeerd zijn, met halal gecertificeerde vleesleveranciers.',
      },
      {
        question: 'Heeft Chopras vegetarisch Indiaas eten?',
        answer: 'Ja. Vegetarische opties omvatten gerechten zoals Dal Makhani, Chana Masala, Palak Paneer, Aloo Gobi, Paneer Tikka en groentebiryani.',
      },
      {
        question: 'Kan ik een feestzaal huren in Den Haag bij Chopras?',
        answer: 'Ja. Chopras biedt een privé feestzaal aan de Leyweg 986 voor ongeveer 25-80 gasten, met Indiase catering als onderdeel van de evenementenarrangementen.',
      },
      {
        question: 'Welke evenementen kunnen er in de feestzaal van Chopras worden georganiseerd?',
        answer: 'De locatie is geschikt voor evenementen zoals verjaardagen, bruiloften, pre-wedding feesten, Nikah recepties, jubilea, babyshowers, zakelijke diners, zakelijke bijeenkomsten, Diwali-vieringen, privédiners en familiefeesten.',
      },
      {
        question: 'Verzorgt Chopras Indiase catering in Den Haag?',
        answer: 'Ja. Chopras verzorgt Indiase catering voor evenementen en feesten en bedient ook omliggende gebieden, waaronder Rijswijk, Delft, Voorburg, Leidschendam en Zoetermeer.',
      }
    ],"""

contentNl_replacement = """contentNl: `
<img src="/images/blog/13sep.png" alt="Waar Vind Je Het Beste Halal Indiase Eten In Den Haag?" class="w-full max-h-[480px] object-cover rounded-2xl mb-8" />

<p>Het vinden van het beste halal Indiase eten in Den Haag gaat om meer dan simpelweg een restaurant vinden dat halal vlees serveert. Voor gezinnen en fijnproevers moet het ideale halal Indiase restaurant in Den Haag authentieke Indiase smaken, een gevarieerd menu, vegetarische en veganistische keuzes, glutenvrije opties, comfortabel dineren en een sfeer bieden waar iedereen samen kan genieten van een maaltijd.</p>

<p>Voor degenen die op zoek zijn naar Indiaas eten in Den Haag, halal eten Den Haag of een Indiaas restaurant Den Haag, is <a href="https://chopras.nl">Chopras Indian Restaurant</a> een bestemming die het ontdekken waard is. Gelegen aan de Leyweg 986, 2545 GW Den Haag, brengt Chopras Indian Restaurant de authentieke Indiase keuken, verse kruiden, tandoori-specialiteiten, biryani, vegetarische gerechten, veganistische opties en halal-gecertificeerd eten samen onder één dak.</p>

<p>Of u nu komt vanuit Den Haag Centrum, Zeeheldenkwartier, Duinoord, Scheveningen, Rijswijk, Voorburg, Delft of een ander deel van de regio, deze gids legt uit waar u op moet letten bij het kiezen van halal Indiaas eten in Den Haag — en waarom Chopras Indian Restaurant een populaire keuze is voor gezinnen, groepen en fijnproevers.</p>

<h2>Wat Maakt Het Beste Halal Indiase Eten In Den Haag?</h2>

<p>Wanneer mensen online zoeken naar "beste halal Indiase restaurant bij mij in de buurt", "halal Indiaas restaurant Den Haag", of "waar kan ik halal Indiaas eten in Den Haag?", zijn ze meestal op zoek naar verschillende dingen tegelijk.</p>

<p>Een goed halal Indiaas restaurant moet het volgende bieden:</p>

<ul>
  <li>Gecertificeerd halal vlees en ingrediënten</li>
  <li>Authentieke Indiase kookstijl</li>
  <li>Vegetarische en veganistische keuzes</li>
  <li>Glutenvrije opties</li>
  <li>Tandoori- en kleioven-specialiteiten</li>
  <li>Biryani en traditionele Indiase curries</li>
  <li>Indiaas streetfood</li>
  <li>Gezinsvriendelijk dineren</li>
  <li>Opties voor verschillende kruidenniveaus</li>
  <li>Catering voor feesten en evenementen</li>
</ul>

<p>Chopras Indian Restaurant is ontworpen rond deze variatie. Het huidige <a href="https://chopras.nl/menu">menu</a> bevat een grote selectie Indiase gerechten in verschillende categorieën, waarbij halal, vegetarische, veganistische en glutenvrije keuzes duidelijk zijn aangegeven. Gasten kunnen voor het bestellen ook eventuele allergieën en dieetwensen bespreken met het restaurant.</p>

<h2>Is Chopras Indian Restaurant Halal?</h2>

<p>Ja. Chopras Indian Restaurant is een volledig <a href="https://chopras.nl/halal-menu">halal-gecertificeerd Indiaas restaurant in Den Haag</a>. Het restaurant stelt dat zijn vleesleveranciers halal zijn gecertificeerd en dat de volledige keuken halal-normen volgt. Het halal menu omvat kip-, lams- en schapenvleesgerechten, evenals tandoori-specialiteiten, biryani, curries en Indiaas streetfood.</p>

<p>Dit maakt Chopras bijzonder geschikt voor islamitische families die op zoek zijn naar halal eten in Den Haag of een betrouwbaar halal restaurant in Den Haag waar de hele groep kan genieten van authentiek Indiaas eten.</p>

<p>Het menu bevat populaire gerechten zoals Butter Chicken, Chicken Tikka Masala, Chicken Biryani, Lamb Biryani, Mutton Rogan Josh, Seekh Kebab en andere Indiase specialiteiten.</p>

<p>Voor gezinnen die liever vegetarisch of plantaardig eten, hoeft halal dineren niet te betekenen dat er beperkte keuzes zijn. Chopras biedt ook gerechten zoals Dal Makhani, Chana Masala, Palak Paneer, Aloo Gobi, Paneer Tikka en groentebiryani.</p>

<h2>Tandoori Indiaas Eten in Den Haag: Vers Uit De Kleioven</h2>

<p>Een van de beste manieren om de authentieke Indiase keuken te ervaren is via tandoori gerechten.</p>

<p>De traditionele tandoor is een kleioven die wordt gebruikt om Indiase broden, kip, kebabs en andere gerechten op hoge temperaturen te bereiden. Bij Chopras Indian Restaurant bereikt de tandoor ongeveer 400°C, wat bijdraagt aan de rokerige smaak en karakteristieke geroosterde randen die kenmerkend zijn voor authentiek tandoori-koken.</p>

<p>Als u op zoek bent naar <a href="https://chopras.nl/tandoori-den-haag">tandoori Den Haag</a>, halal tandoori Den Haag, of Indiaas eten Den Haag, zijn hier voorbeelden van het Chopras menu:</p>

<ul>
  <li>Chicken Tikka</li>
  <li>Tandoori Chicken Wings</li>
  <li>Seekh Kebab</li>
  <li>Mutton Seekh Kebab</li>
  <li>Fish Tikka</li>
  <li>Tandoori Fish</li>
  <li>Paneer Tikka</li>
  <li>Vers naanbrood uit de tandoor</li>
</ul>

<p>Deze gerechten zijn bijzonder geschikt voor liefhebbers die op zoek zijn naar rokerige, gegrilde Indiase smaken in plaats van alleen de traditionele curries.</p>

<h3>Wat Moet U Bestellen Uit De Tandoor?</h3>

<p>Voor een eerste bezoek is Chicken Tikka een gemakkelijke keuze voor gasten die houden van malse, gemarineerde kip met traditionele Indiase kruiden. Seekh Kebab is een andere optie voor degenen die liever gekruid gehakt hebben, gegaard in de tandoor.</p>

<p>Voor liefhebbers van vis bieden Fish Tikka en Tandoori Fish een andere kijk op het Indiase koken in een kleioven. Vegetarische gasten kunnen kiezen voor Paneer Tikka voor een smaakvolle tandoori-optie zonder vlees.</p>

<p>Deze variatie maakt tandoori eten een praktische keuze voor families en groepen met verschillende voorkeuren.</p>

<h2>Vegetarisch Indiaas Eten In Den Haag</h2>

<p>Het vinden van een goed vegetarisch Indiaas restaurant in Den Haag mag niet betekenen dat u concessies moet doen aan de smaak.</p>

<p>De Indiase keuken biedt van nature een grote verscheidenheid aan vegetarische gerechten, van romige paneergerechten tot curries op basis van linzen, groentebereidingen en rijstgerechten.</p>

<p>Bij Chopras Indian Restaurant omvatten de <a href="https://chopras.nl/vegetarian-menu">vegetarische opties</a> onder andere:</p>

<ul>
  <li>Dal Makhani</li>
  <li>Chana Masala</li>
  <li>Palak Paneer</li>
  <li>Aloo Gobi</li>
  <li>Paneer Tikka</li>
  <li>Vegetable Biryani</li>
  <li>Aloo Tikki</li>
  <li>Indiaas streetfood</li>
</ul>

<p>Dal Makhani is bijzonder geschikt voor gasten die van rijke, langzaam gegaarde linzen houden, terwijl Palak Paneer spinazie met paneer combineert voor een klassieke Noord-Indiase smaak.</p>

<p>Voor mensen die zoeken naar "vegetarisch Indiaas eten Den Haag", "vegetarian Indian restaurant Den Haag", of "Indiaas eten voor families in Den Haag", betekent een uitgebreid vegetarisch menu dat iedereen aan tafel iets kan vinden wat hij of zij lekker vindt.</p>

<h2>Veganistisch Indiaas Eten in Den Haag</h2>

<p>De Indiase keuken werkt ook uitzonderlijk goed voor mensen die plantaardig eten.</p>

<p>Als u op zoek bent naar een vegan Indiaas restaurant Den Haag of vegan Indiaas eten in Den Haag, biedt Chopras <a href="https://chopras.nl/vegan-menu">veganistische keuzes</a> naast het halal en vegetarische menu. Gasten kunnen het restaurant voor het bestellen vragen naar geschikte gerechten en dieetwensen.</p>

<p>Populaire plantaardige keuzes kunnen gerechten zijn zoals Chana Masala, Dal Makhani, Aloo Gobi en geselecteerde groentebereidingen.</p>

<p>Voor families en groepen is dit bijzonder handig omdat één restaurant zowel halal-eters, vegetariërs als veganisten kan bedienen, zonder dat u voor verschillende dieetvoorkeuren naar verschillende restaurants hoeft.</p>

<h2>Glutenvrij Indiaas Eten in Den Haag</h2>

<p>Een andere belangrijke zoekopdracht voor moderne gezinnen is glutenvrij Indiaas eten Den Haag.</p>

<p>Chopras Indian Restaurant geeft <a href="https://chopras.nl/gluten-free-menu">glutenvrije keuzes</a> aan op de menukaart en moedigt gasten met allergieën of dieetwensen aan om dit vooraf met het team te bespreken.</p>

<p>Omdat gluten aanwezig kunnen zijn in brood, sauzen en andere ingrediënten, dienen gasten met strikte dieetwensen dit altijd met het restaurant te bespreken voordat ze bestellen.</p>

<p>Dit maakt de eetervaring comfortabeler voor families die zoeken naar glutenvrij Indiaas eten in Den Haag en tegelijkertijd authentieke Indiase smaken willen.</p>

<h2>Indiase Biryani In Den Haag</h2>

<p>Voor veel liefhebbers van Indiaas eten is geen maaltijd compleet zonder biryani.</p>

<p>Chopras serveert verschillende <a href="https://chopras.nl/biryani-den-haag">biryani opties</a>, waaronder:</p>

<ul>
  <li>Chicken Biryani</li>
  <li>Lamb Biryani</li>
  <li>Vegetable Biryani</li>
  <li>Speciale biryani gerechten met geurige basmatirijst</li>
</ul>

<p>Biryani combineert aromatische rijst, kruiden en zorgvuldig bereide ingrediënten tot een van de meest herkenbare gerechten van India.</p>

<p>Als u zoekt naar "beste biryani Den Haag", "halal biryani Den Haag", of "Indiaas restaurant voor biryani Den Haag", dan biedt Chopras Indian Restaurant halal vleesopties naast de vegetarische keuzes.</p>

<h2>Mis Het Indiase Streetfood Niet</h2>

<p>Indiaas eten draait niet alleen om curry en naan.</p>

<p>Voor mensen die van snacks houden of graag gerechten delen, biedt Indiaas streetfood een andere manier om de keuken te ontdekken.</p>

<p>Bij Chopras zijn de <a href="https://chopras.nl/chaat-den-haag">streetfood opties</a> onder meer:</p>

<ul>
  <li>Pani Puri</li>
  <li>Papdi Chaat</li>
  <li>Aloo Tikki</li>
  <li>Samosa</li>
  <li>Dahi Puri</li>
</ul>

<p>Deze gerechten passen bijzonder goed bij een etentje met vrienden of familie, omdat u eenvoudig meerdere items kunt delen aan tafel.</p>

<p>Als u zoekt naar Indiaas streetfood Den Haag, bieden deze gerechten u de kans om tijdens één maaltijd verschillende texturen, kruiden en smaken te ervaren.</p>

<h2>Gezinsvriendelijk Halal Indiaas Dineren in Den Haag</h2>

<p>Binnen een gezin kunnen de voorkeuren verschillen. De een wil graag kip, de ander eet liever vegetarisch en kinderen geven wellicht de voorkeur aan mildere smaken.</p>

<p>Hier maakt een gevarieerd Indiaas menu het familiediner eenvoudiger.</p>

<p>Bij Chopras Indian Restaurant kunnen gasten kiezen uit halal vleesgerechten, vegetarische gerechten, veganistische opties, glutenvrije keuzes, tandoori specialiteiten, biryani, broden, curries en Indiaas streetfood. Het menu geeft gasten ook de mogelijkheid om hun gewenste pittigheidsgraad aan te geven, inclusief mild, medium of pittig.</p>

<p>Voor ouders die zoeken naar "familievriendelijk Indiaas restaurant Den Haag", zorgt deze variatie ervoor dat verschillende familieleden geen compromissen hoeven te sluiten over wat ze willen eten.</p>

<h2>Indiaas Eten Voor Speciale Gelegenheden: Feestzaal Huren Den Haag</h2>

<p>Indiaas eten wordt nog specialer wanneer het deel uitmaakt van een viering.</p>

<p>Als u op zoek bent naar <a href="https://chopras.nl/feestzaal-den-haag">feestzaal huren Den Haag</a>, zaal huren Den Haag, feestzaal Den Haag, of evenementenruimte Den Haag, biedt Chopras Indian Restaurant ook een privé evenementenzaal aan op de Leyweg 986.</p>

<p>De privé feestzaal is geschikt voor groepen van ongeveer 25 tot 50 personen en kan worden gebruikt voor diverse soorten feesten en bijeenkomsten. De catering wordt verzorgd door de keuken van Chopras, waardoor de locatie en het eten samen georganiseerd kunnen worden.</p>

<h3>Welke Evenementen Kunt U Bij Chopras Organiseren?</h3>

<p>De evenementenruimte van Chopras is geschikt voor onder andere:</p>

<ul>
  <li>Verjaardagsfeesten</li>
  <li>Bruiloften</li>
  <li>Pre-wedding evenementen</li>
  <li>Nikah recepties</li>
  <li>Jubilea</li>
  <li>Babyshowers</li>
  <li>Bedrijfsdiners</li>
  <li>Zakelijke bijeenkomsten</li>
  <li>Teamdiners</li>
  <li>Klantbijeenkomsten</li>
  <li>Diwali vieringen</li>
  <li>Familiefeesten</li>
  <li>Privédiners</li>
  <li>Culturele vieringen</li>
  <li>Gemeenschapsevenementen</li>
</ul>

<p>De locatie is bovendien zeer geschikt voor het vieren van Diwali, Holi, Navratri, Garba, Eid, Kerstmis, Oud en Nieuw en Onafhankelijkheidsdag, waardoor het ideaal is voor zowel Indiase culturele evenementen als feestelijke bijeenkomsten in het algemeen.</p>

<p>Nederlandse feestdagen bieden ook natuurlijke gelegenheden voor groepsdiners en privébijeenkomsten, zoals Goede Vrijdag, Eerste Paasdag, Tweede Paasdag, Koningsdag, Bevrijdingsdag, Hemelvaartsdag, Eerste Pinksterdag, Tweede Pinksterdag, Eerste Kerstdag en Tweede Kerstdag.</p>

<p>Het restaurant biedt ook menu's op maat, gebaseerd op het type evenement, het aantal gasten en eventuele dieetwensen.</p>

<p>Voor iedereen die zoekt naar "Indiase catering Den Haag", "halal catering Den Haag", of "Indian wedding catering Den Haag", kan Chopras <a href="https://chopras.nl/catering">catering</a> aanbieden vanuit dezelfde halal-gecertificeerde keuken en menukaart.</p>

<h2>Een Halal Feestzaal in Den Haag Voor Families en Groepen</h2>

<p>Het plannen van een feest kan ingewikkeld worden als locatie en catering los van elkaar geregeld moeten worden.</p>

<p>Met Chopras kunnen de privé evenementenruimte en de Indiase catering samen worden verzorgd. De locatie biedt plaats aan groepen van 25 tot 50 personen, wat het ideaal maakt voor zowel intiemere familiefeesten als grotere privébijeenkomsten.</p>

<p>Een menu op maat kan de volgende gerechten bevatten:</p>

<p><strong>Voorgerechten:</strong> Samosa, Pani Puri, Papdi Chaat en Aloo Tikki.</p>

<p><strong>Tandoori:</strong> Chicken Tikka, Seekh Kebab, Tandoori Chicken Wings, Fish Tikka en Paneer Tikka.</p>

<p><strong>Hoofdgerecht:</strong> Butter Chicken, Chicken Tikka Masala, Mutton Rogan Josh, Chicken Biryani, Lamb Biryani, Dal Makhani en Paneer Butter Masala.</p>

<p><strong>Broden &amp; Bijgerechten:</strong> Garlic Naan, naan en rijstgerechten.</p>

<p><strong>Desserts:</strong> Gulab Jamun, Rasmalai, Saffron Kheer, Moong Dal Halwa en verschillende soorten Kulfi.</p>

<p>Deze combinatie maakt de locatie uitstekend geschikt voor gasten met uiteenlopende smaken en dieetvoorkeuren.</p>

<h2>We Serveren Gasten Uit Heel Den Haag</h2>

<p>Wanneer mensen zoeken op "Indiaas restaurant Den Haag", kan hun zoekopdracht vanuit veel verschillende wijken en omliggende gebieden komen.</p>

<p>Chopras Indian Restaurant op de Leyweg 986 bedient gasten uit heel Den Haag en de wijde omtrek.</p>

<h3>Den Haag Centrum En Centrale Gebieden</h3>

<p>Bezoekers die zoeken vanuit Den Haag Centrum, de binnenstad en de omliggende buurten zoeken wellicht naar een authentiek Indiaas diner na het winkelen, sightseeën of een dagje stad.</p>

<h3>Zeeheldenkwartier</h3>

<p>Voor bewoners en bezoekers uit het Zeeheldenkwartier kunnen zoekopdrachten zoals "Indiaas restaurant Zeeheldenkwartier" en "halal eten Den Haag" hen wijzen op Indiase eetopties elders in de stad.</p>

<h3>Duinoord, Thomsonlaan En Thomsonplein</h3>

<p>Voor mensen die zoeken vanuit Duinoord, de Thomsonlaan of het Thomsonplein, biedt Chopras een breed Indiaas menu aan, passend voor zowel individueel dineren als familiemaaltijden.</p>

<h3>Scheveningen</h3>

<p>Vanuit Scheveningen, inclusief de gebieden rond het strand en bredere kustwijken, kunnen gasten op zoek naar authentieke Indiase gerechten Chopras ontdekken voor halal curries, tandoori, biryani en vegetarische opties.</p>

<h3>Loosduinen, Houtwijk En Leyenburg</h3>

<p>Chopras is gevestigd aan de Leyweg, waardoor de bredere zoekcluster rond Leyenburg, Loosduinen en Houtwijk bijzonder relevant is voor mensen op zoek naar een Indiaas restaurant, halal eten en gezinsdiners in Den Haag.</p>

<h3>Vruchtenbuurt</h3>

<p>Voor inwoners van de Vruchtenbuurt die zoeken op "Indiaas eten Den Haag", biedt Chopras een gevarieerde kaart variërend van Indiaas streetfood en tandoorigerechten tot biryani en vegetarische curries.</p>

<h3>Transvaalkwartier</h3>

<p>Mensen in het Transvaalkwartier die zoeken naar "halal restaurant Den Haag", "Indiaas restaurant Den Haag" of "Indiase catering" kunnen Chopras eveneens overwegen voor zowel de authentieke keuken als eventcatering.</p>

<h2>Indiaas Eten Nabij Rijswijk, Delft, Voorburg, Leidschendam En Zoetermeer</h2>

<p>Chopras bedient bovendien ook klanten uit gebieden rondom Den Haag.</p>

<p>De evenementen- en cateringservices van het restaurant zijn relevant voor mensen die zoeken naar:</p>

<ul>
  <li><a href="https://chopras.nl/indian-restaurant-rijswijk">Indiase catering Rijswijk</a></li>
  <li>Halal Indiaas eten Rijswijk</li>
  <li><a href="https://chopras.nl/indian-restaurant-delft">Indiaas restaurant nabij Delft</a></li>
  <li>Indiase catering Delft</li>
  <li><a href="https://chopras.nl/indian-restaurant-voorburg">Indiaas restaurant Voorburg</a></li>
  <li>Halal catering Voorburg</li>
  <li><a href="https://chopras.nl/indian-restaurant-leidschendam">Indiase catering Leidschendam</a></li>
  <li><a href="https://chopras.nl/indian-restaurant-zoetermeer">Indiaas restaurant nabij Zoetermeer</a></li>
  <li>Halal Indiase catering Zoetermeer</li>
  <li>Indiaas eten in de buurt van Wateringen</li>
</ul>

<p>Voor grotere feesten kan ook externe catering overwogen worden, waardoor gastheren kunnen genieten van authentiek Indiaas eten buiten het restaurant zelf. Chopras richt zich nadrukkelijk op Den Haag en omliggende steden zoals Delft, Rijswijk, Voorburg, Leidschendam en Zoetermeer als onderdeel van hun servicegebied voor catering.</p>

<h2>Waarom Kiezen Voor Chopras Indian Restaurant Voor Halal Indiaas Eten In Den Haag?</h2>

<p>Voor families en liefhebbers van eten, ligt de aantrekkingskracht van Chopras in de combinatie van variatie, authenticiteit en flexibiliteit.</p>

<p><strong>1. 100% Halal Indiaas Menu</strong><br />Chopras geeft aan dat de gehele menukaart halal gecertificeerd is, inclusief vlees, tandoori, biryani, curries en streetfood-opties.</p>

<p><strong>2. Authentieke Indiase Smaken</strong><br />Verse kruiden en traditionele kooktechnieken staan centraal in het menu van het restaurant, waaronder tandoori bereidingen in de kleioven.</p>

<p><strong>3. Vegetarische En Veganistische Keuzes</strong><br />Vegetarische en veganistische gasten hebben volop keuze en hoeven het niet te doen met slechts één of twee bijgerechtjes.</p>

<p><strong>4. Glutenvrije Opties</strong><br />Er zijn glutenvrije opties beschikbaar, en gasten worden aangemoedigd om hun dieetwensen vooraf te bespreken.</p>

<p><strong>5. Grote En Gevarieerde Menukaart</strong><br />Het <a href="https://chopras.nl/menu">online menu</a> van het restaurant dekt een breed scala aan Indiase categorieën, zoals voorgerechten, tandoori, kip, lams- en schapenvlees, biryani, broden, rijst, bijgerechten en streetfood.</p>

<p><strong>6. Privé Feestzaal</strong><br />De privé evenementenruimte biedt plaats aan ongeveer 25-80 gasten en kan zaalhuur perfect combineren met authentieke Indiase catering.</p>

<p><strong>7. Catering Voor Diverse Gelegenheden</strong><br />Van verjaardagen en bruiloften tot bedrijfsdiners, Nikah recepties, babyshowers en culturele feesten: Chopras kan evenementenmenu's afstemmen op de gelegenheid en de dieetwensen.</p>

<h2>Laatste Gedachte</h2>

<p>Chopras Indian Restaurant is meer dan alleen een plek om te genieten van halal Indiaas eten in Den Haag. Met authentieke Indiase smaken, tandoori-specialiteiten, biryani, vegetarische en veganistische gerechten, glutenvrije opties en een speciale feestzaal in Den Haag voor privéfeesten, biedt het iets voor zowel families, fijnproevers als evenementengasten. Of u nu op zoek bent naar halal eten Den Haag, Indiaas restaurant Den Haag, vegetarisch Indiaas eten, vegan Indiaas eten of feestzaal huren Den Haag, <a href="https://chopras.nl">Chopras Indian Restaurant</a> biedt een complete Indiase dinerervaring met opties voor verschillende smaken, gelegenheden en dieetvoorkeuren.</p>
`,\n"""

fields = """
    titleNl: 'Waar Vind Je Het Beste Halal Indiase Eten In Den Haag?',
    metaTitleNl: 'Waar Vind Je Het Beste Halal Indiase Eten In Den Haag?',
    metaDescriptionNl: 'Op zoek naar halal Indiaas eten in Den Haag? Ontdek Chopras Indian Restaurant voor authentieke Indiase gerechten, veganistische, vegetarische en glutenvrije opties en privé-evenementen.',
    h1Nl: 'Waar Vind Je Het Beste Halal Indiase Eten In Den Haag? Een Complete Gids Voor Families En Fijnproevers',
    primaryKeywordNl: 'halal Indiaas eten in Den Haag',
    excerptNl: 'Op zoek naar halal Indiaas eten in Den Haag? Ontdek Chopras Indian Restaurant voor authentieke Indiase gerechten, veganistische, vegetarische en glutenvrije opties en privé-evenementen.',
"""

post_start = content.find("slug: 'where-to-find-the-best-halal-indian-food-in-den-haag'")

if post_start != -1:
    lang_index = content.find("language: 'en'", post_start)
    content = content[:lang_index] + fields + content[lang_index:]
    
    post_start = content.find("slug: 'where-to-find-the-best-halal-indian-food-in-den-haag'")
    
    # 1. Replace faqsNl: [],
    faqsNl_match = re.search(r'faqsNl:\s*\[\],', content[post_start:])
    if faqsNl_match:
        idx = post_start + faqsNl_match.start()
        end_idx = post_start + faqsNl_match.end()
        content = content[:idx] + faqsNl_replacement + content[end_idx:]
    
    post_start = content.find("slug: 'where-to-find-the-best-halal-indian-food-in-den-haag'")

    # find where to inject contentNl: after `content: \`...\`, `
    content_match = re.search(r'content:\s*`.*?`,?', content[post_start:], flags=re.DOTALL)
    if content_match:
        end_idx = post_start + content_match.end()
        if not content[end_idx-1] == ',':
            content = content[:end_idx] + ',\n' + contentNl_replacement + content[end_idx:]
        else:
            content = content[:end_idx] + '\n' + contentNl_replacement + content[end_idx:]
            
    with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated successfully")
else:
    print("Post not found!")

