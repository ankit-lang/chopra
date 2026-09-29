import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

faqsNl_replacement = """faqsNl: [
      {
        question: 'Wat zijn de beste plekken om te bezoeken in Den Haag?',
        answer: 'Enkele van de meest populaire plekken zijn Scheveningen Strand, Madurodam, Binnenhof, Mauritshuis, Vredespaleis, Escher in Het Paleis, Lange Voorhout en Kunstmuseum Den Haag.'
      },
      {
        question: 'Wat is de beste plek om te bezoeken in Den Haag voor families?',
        answer: 'Madurodam en Scheveningen zijn bijzonder geschikt voor families en bieden een combinatie van interactieve bezienswaardigheden en activiteiten aan zee.'
      },
      {
        question: 'Waar kan ik authentiek Indiaas eten krijgen in Den Haag?',
        answer: 'Chopras Indian Restaurant aan de Leyweg biedt authentieke Indiase gerechten, waaronder tandoori gerechten, curries, biryani, Indiase broden en vegetarische opties.'
      },
      {
        question: 'Serveert Chopras Indian Restaurant halal eten?',
        answer: 'Ja. Chopras Indian Restaurant geeft aan dat het eten volledig halal gecertificeerd is, inclusief de event catering.'
      },
      {
        question: 'Biedt Chopras Indian Restaurant vegetarisch en veganistisch eten aan?',
        answer: 'Ja. Het menu bevat vegetarische en veganistische opties en het restaurant biedt ook speciale categorieën voor vegetarisch en veganistisch eten op de menukaart.'
      },
      {
        question: 'Biedt Chopras Indian Restaurant glutenvrij eten aan?',
        answer: 'Ja. Er zijn glutenvrije opties beschikbaar. Gasten dienen hun wens voor glutenvrij duidelijk te vermelden bij de bestelling, omdat gerechten niet standaard glutenvrij worden bereid.'
      },
      {
        question: 'Kan ik een privé-evenement organiseren bij Chopras Indian Restaurant?',
        answer: 'Ja. De privé evenementenzaal is geschikt voor ongeveer 25 tot 50 gasten en is ideaal voor bruiloften, verjaardagen, bedrijfsevenementen, culturele feesten en vele andere bijeenkomsten.'
      },
      {
        question: 'Is Chopras Indian Restaurant geschikt voor bedrijfsevenementen?',
        answer: 'Ja. De locatie verwelkomt bedrijfsdiners, zakelijke lunches, vergaderingen, netwerkevenementen, workshops, trainingssessies, teambuildingactiviteiten en klantpresentaties.'
      }
    ],"""

contentNl_replacement = """contentNl: `
<img src="/images/blog/blog8sep.jpeg" alt="Beste Indiase Restaurant in Den Haag | Authentiek Indiaas Eten – Chopras" class="w-full max-h-[480px] object-cover rounded-2xl mb-8" />

<p>Proef Authentiek Indiaas Eten Bij Het Beste Indiase Restaurant in Den Haag - Chopras Indian Restaurant</p>

<p>Den Haag, is een van de meest interessante steden van Nederland voor een dagje uit. Je kunt van historische regeringsgebouwen naar kunst van wereldklasse wandelen, langs de Hofvijver lopen, winkelen in het stadscentrum en toch tijd overhouden voor een goede maaltijd.</p>

<p>Voor bezoekers die Centraal Den Haag en Den Haag Centrum verkennen, brengt het historische hart van de stad verschillende grote attracties samen in een relatief compact gebied. Het Binnenhof, Mauritshuis, de Hofvijver, het Plein, Centraal Station en het Spuiplein zijn allemaal handige punten voor een stadsroute, terwijl Scheveningen en Delft gemakkelijke opties bieden om de reis te verlengen.</p>

<p>En na enkele uren sightseeing is er niets mis mee om eten deel te laten uitmaken van het plan. Chopras Indian Restaurant aan de Leyweg 986, Den Haag, biedt een uitgebreid Indiaas menu met halal, vegetarische, veganistische en glutenvrije opties, waardoor het een handige tussenstop is voor gasten met verschillende smaken en dieetvoorkeuren.</p>

<h3>Waarom Den Haag Bezoeken?</h3>

<p>Den Haag is een van de meest gevarieerde bestemmingen van Nederland, met een combinatie van historische attracties, musea, de Noordzeekust, internationale bezienswaardigheden en uitstekend eten. Het is mogelijk om 's ochtends het stadscentrum te verkennen, 's middags een museum te bezoeken, 's avonds van Scheveningen te genieten en de dag af te sluiten met vers, authentiek Indiaas eten in een van de beste Indiase restaurants van Nederland, Chopras Indian Restaurant in Den Haag.</p>

<p>In tegenstelling tot bestemmingen waar attracties in één klein gebied zijn geconcentreerd, biedt Den Haag bezoekers verschillende unieke ervaringen.</p>

<p>Je kunt het historische centrum verkennen, langs de kust wandelen, grote kunstcollecties bezoeken, internationale instellingen zien en genieten van verschillende keukens — allemaal binnen dezelfde stad en omgeving, terwijl je ook kunt genieten van de authentieke Indiase keuken in Den Haag, inclusief traditionele curries, biryani, tandoori gerechten, vegetarische en veganistische specialiteiten bij Chopras Indian Restaurant.</p>

<h2>Beste Plekken Om Te Bezoeken in Den Haag</h2>

<h3>Den Haag Centrum</h3>

<p>Den Haag Centrum is het hart van de stad en biedt een mix van winkelstraten, musea, historische gebouwen, cafés en restaurants. Het is een uitstekend startpunt voor bezoekers die Den Haag voor het eerst verkennen.</p>

<h3>Binnenhof</h3>

<p>Het Binnenhof is een van de meest bekende historische bezienswaardigheden van Den Haag en heeft een belangrijke rol gespeeld in de Nederlandse politieke geschiedenis. Het complex staat bekend om zijn historische gebouwen en de Ridderzaal.</p>

<h3>Mauritshuis</h3>

<p>Het Mauritshuis is een gerenommeerd kunstmuseum dat bekend staat om zijn collectie Nederlandse en Vlaamse meesterwerken. Een van de beroemdste schilderijen is Vermeers Meisje met de Parel.</p>

<h3>Hofvijver</h3>

<p>De Hofvijver is een historisch meer gelegen naast het Binnenhof. Het is een prachtige plek voor een ontspannende wandeling, fotografie en uitzicht op enkele van de meest herkenbare bezienswaardigheden van Den Haag.</p>

<h3>Plein</h3>

<p>Het Plein is een levendig plein in het centrum van Den Haag, omgeven door cafés, restaurants en terrassen. Het is een handige plek om te ontspannen en te genieten van een kopje koffie of een maaltijd terwijl je de stad verkent.</p>

<h3>Centraal Station</h3>

<p>Den Haag Centraal Station is een van de belangrijkste vervoersknooppunten van de stad en een handig startpunt om Den Haag te verkennen. Vanaf hier kunnen bezoekers eenvoudig het stadscentrum, winkelgebieden, musea en andere buurten bereiken.</p>

<h3>Spuiplein</h3>

<p>Het Spuiplein is een modern cultureel gebied in Den Haag, omgeven door theaters, culturele locaties, restaurants en openbare ruimtes. Het biedt bezoekers een blik op de hedendaagse kant van de stad.</p>

<h3>Scheveningen</h3>

<p>Scheveningen is de beroemde badplaats van Den Haag, bekend om het strand, de boulevard, de restaurants en de levendige kustsfeer. Het is een uitstekende plek om te ontspannen na het verkennen van het stadscentrum.</p>

<h3>Keizerstraat</h3>

<p>De Keizerstraat is een van de historische straten van Scheveningen, met lokale winkels, cafés, restaurants en een kenmerkende buurtsfeer. Het is een gezellig gebied om te verkennen buiten het hoofdstrand.</p>

<h3>Boulevard</h3>

<p>De Boulevard van Scheveningen strekt zich uit langs de kust en is ideaal om te wandelen, fietsen, winkelen en te genieten van het uitzicht op de Noordzee. De restaurants en cafés aan zee maken het ook een populaire stop.</p>

<h3>Strand</h3>

<p>Het strand van Scheveningen is een van de meest populaire stranden in Den Haag. Bezoekers kunnen genieten van een rustige strandwandeling, ontspannen aan zee of deelnemen aan seizoensgebonden wateractiviteiten.</p>

<h3>Pier</h3>

<p>De Pier van Scheveningen strekt zich uit over de Noordzee en is een van de meest herkenbare attracties van het gebied. Het biedt restaurants, entertainment, uitzichtpunten en een indrukwekkend uitzicht op zee.</p>

<h3>Kurhaus</h3>

<p>Het Kurhaus is een historisch herkenningspunt aan de boulevard van Scheveningen. De elegante architectuur, geschiedenis en prominente locatie vlakbij zee maken het een van de meest gefotografeerde gebouwen van het gebied.</p>

<h3>Duindorp</h3>

<p>Duindorp is een traditionele kustwijk nabij Scheveningen. Het biedt een rustigere, meer residentiële kant van Den Haag en geeft bezoekers een glimp van het lokale leven, ver weg van de belangrijkste toeristische gebieden.</p>

<h3>Madurodam</h3>

<p>Madurodam is een populair miniatuurpark dat gedetailleerde modellen toont van beroemde Nederlandse gebouwen, bezienswaardigheden en landschappen. Het is vooral leuk voor families en bezoekers die Nederland in miniatuur willen zien.</p>

<p>Voor reizigers die een weekend in Den Haag doorbrengen, kunnen attracties zoals het Kunstmuseum Den Haag, het Museumkwartier en Scheveningen worden gecombineerd, afhankelijk van uw interesses. Bezoekers die van kunst houden, kunnen meer tijd besteden aan het verkennen van de musea, terwijl gezinnen er wellicht de voorkeur aan geven Madurodam en Scheveningen te combineren.</p>

<p>Na een dag sightseeing biedt Chopras Indian Restaurant een uitnodigende plek om te genieten van vers, authentiek Indiaas eten in Den Haag, met opties variërend van aromatische curries en tandoori specialiteiten tot Butter Chicken, Chicken Tikka Masala, Mutton Rogan Josh, Chicken Biryani, Lamb Biryani, Dal Makhani, Paneer Butter Masala, Palak Paneer, Chana Masala, Tandoori Chicken, Chicken Tikka, Seekh Kebab, Paneer Tikka, Pani Puri, Samosa, Papdi Chaat, Roti, Garlic Naan, Pudina Paratha, Aloo Paratha, Indiase desserts, vegetarische gerechten, veganistische keuzes en glutenvrije opties.</p>

<h2>Delft: Een Perfecte Nabijgelegen Dagtocht</h2>

<p>Delft is een uitstekende nabijgelegen bestemming voor reizigers die in Den Haag verblijven en een andere historische Nederlandse stad willen verkennen.</p>

<p>Bekend om zijn historische centrum, grachten, traditionele architectuur en de band met Delfts Blauw aardewerk, kan Delft eenvoudig worden opgenomen in een bredere Zuid-Hollandse route.</p>

<p>Bezoekers die tussen Den Haag en Delft reizen, kunnen ook een Indiase maaltijd inlassen bij Chopras Indian Restaurant.</p>

<p>Dit is bijzonder relevant voor mensen die zoeken naar een Indiaas restaurant in de buurt van Delft of Indiaas eten tussen Delft en Den Haag.</p>

<h2>Waar Kun Je Indiaas Eten in Den Haag?</h2>

<p>Na het verkennen van de attracties van Den Haag, wordt eten een onderdeel van de reiservaring.</p>

<p>Chopras Indian Restaurant bevindt zich aan de Leyweg 986, 2545 GW Den Haag, en biedt authentieke Indiase gerechten met een menu dat bestaat uit voorgerechten, streetfood, tandoori gerechten, vegetarische curries, kip, lams- en schapenvlees, biryani, broden, desserts en drankjes. Het huidige menu bevat 144 gerechten in 13 categorieën.</p>

<p>Voor reizigers die zoeken naar het beste Indiase restaurant in Den Haag, biedt het restaurant een praktische keuze voor zowel casual diners als grotere vieringen.</p>

<p>Het menu identificeert ook halal, vegetarische, veganistische en glutenvrije opties, wat groepen meer flexibiliteit geeft wanneer verschillende gasten verschillende dieetvoorkeuren hebben.</p>

<h2>Wat Te Bestellen Bij Chopras Indian Restaurant?</h2>

<p>Als u Chopras Indian Restaurant voor de eerste keer bezoekt, kan het kiezen van een paar representatieve gerechten een goede manier zijn om de verschillende kanten van de Indiase keuken te ontdekken.</p>

<h3>Tandoori Gerechten</h3>

<p>De tandoori sectie is ideaal voor iedereen die geniet van gegrild Indiaas eten bereid in een kleioven.</p>

<h3>Populaire keuzes zijn:</h3>

<ul>
  <li>Paneer Tikka</li>
  <li>Malai Soya Chaap</li>
  <li>Achari Soya Chaap</li>
  <li>Tandoori Chicken</li>
  <li>Chicken Tikka</li>
  <li>Chicken Malai Tikka</li>
  <li>Chicken Hariyali Tikka</li>
  <li>Chicken Lasooni Tikka</li>
  <li>Lamb Seekh Kebab</li>
  <li>Tandoori Prawn/Fish</li>
  <li>Chicken Seekh Kebab</li>
  <li>Chopras Non Veg Platter</li>
</ul>

<p>Het menu identificeert de tandoori sectie als kleioven grillspecialiteiten, wat het bijzonder relevant maakt voor bezoekers die geïnteresseerd zijn in traditionele Indiase kookkunsten.</p>

<h3>Indiase Curries en Biryani</h3>

<p>Voor een meer traditionele Indiase maaltijd kunnen gasten een curry combineren met rijst of naan.</p>

<p>Populaire gerechten zijn onder andere Dal Makhani, Dal Tadka, Chana Masala, Aloo Gobi, Aloo Jeera en andere vegetarische curries. Het menu bevat ook kip-, lams- en schapenvleesgerechten naast biryani-selecties.</p>

<p>Een gedeelde tafel met tandoori voorgerechten, curry, biryani en vers Indiaas brood is een eenvoudige manier om verschillende smaken in één maaltijd te ervaren.</p>

<h3>Vegetarisch, Veganistisch en Glutenvrij Indiaas Eten in Den Haag</h3>

<p>Chopras Indian Restaurant biedt vegetarische, veganistische en glutenvrije opties, waardoor het geschikt is voor groepen met verschillende dieetvoorkeuren.</p>

<p>Op het menu van het restaurant worden gerechten duidelijk gemarkeerd met dieetindicatoren voor vegetarische, veganistische, glutenvrije en halal opties. Gasten worden ook verzocht om veganistische of glutenvrije vereisten te vermelden bij de bestelling, omdat gerechten niet standaard op die manier worden bereid.</p>

<h3>Enkele voorbeelden van het menu zijn:</h3>

<ul>
  <li>Aloo Tikki</li>
  <li>Plain Papad</li>
  <li>Masala Papad</li>
  <li>Onion Bhaji</li>
  <li>Lentil Soup</li>
  <li>Dal Tadka</li>
  <li>Chana Masala</li>
  <li>Aloo Gobi</li>
  <li>Aloo Jeera</li>
  <li>Dal Makhani</li>
</ul>

<p>Voor iedereen die zoekt naar een vegetarisch Indiaas restaurant in Den Haag, veganistisch Indiaas eten in Den Haag, of glutenvrij Indiaas eten in Den Haag, is het raadzaam het menu te controleren en dieetwensen door te geven bij de bestelling.</p>

<p>Maak Jouw Feest in Den Haag Speciaal bij Chopras Indian Restaurant</p>

<p>Sightseeing is niet de enige reden waarom bezoekers een restaurant in Den Haag zoeken. Chopras Indian Restaurant heeft ook een besloten feestzaal voor circa 25 tot 50 gasten, waarbij de locatie en catering onder één dak worden beheerd.</p>

<p>Dit maakt Chopras Indian Restaurant geschikt voor uiteenlopende vieringen en bijeenkomsten.</p>

<h3>Bruiloften en Verlovingen</h3>

<p>De besloten locatie verwelkomt verlovingen, bruiloften, pre-wedding feesten en familiebijeenkomsten met Indiaas eten en gastvrijheid.</p>

<h3>Festivals en Culturele Feesten</h3>

<p>Diwali, Holi, Navratri, Garba, Eid, Kerstmis, Oud en Nieuw en Onafhankelijkheidsdag, samen met belangrijke Nederlandse feestdagen zoals Goede Vrijdag, Eerste Paasdag, Tweede Paasdag, Koningsdag, Bevrijdingsdag, Hemelvaartsdag, Eerste Pinksterdag, Tweede Pinksterdag, Eerste Kerstdag en Tweede Kerstdag behoren tot de feestelijke en culturele gelegenheden die bij Chopras Indian Restaurant gevierd kunnen worden.</p>

<h3>Verjaardagen en Familiefeesten</h3>

<p>De evenementenlocatie kan ook gebruikt worden voor verjaardagen, jubilea, pensioenfeesten, afstudeerfeesten, naamceremonies en familiereünies.</p>

<h3>Romantische Vieringen</h3>

<p>Voor intiemere gelegenheden verwelkomt de locatie huwelijksaanzoeken, date nights, Valentijnsvieringen, jubileumdiners en privé dinerervaringen.</p>

<h3>Babyshowers en Familiefeestjes</h3>

<p>Families kunnen babyshowers, gender reveal party's, naamceremonies, familielunches en speciale bijeenkomsten organiseren bij Chopras Indian Restaurant.</p>

<h3>High Tea en Sociale Bijeenkomsten</h3>

<p>De locatie is ook geschikt voor high tea, kitty party's, dameslunches, brunches, reünies van vrienden en clubvergaderingen.</p>

<h3>Bedrijfsevenementen en Netwerken</h3>

<p>Voor bedrijven verwelkomt Chopras Indian Restaurant bedrijfsdiners, zakelijke lunches, vergaderingen, netwerkevenementen, workshops, trainingssessies, teambuildingactiviteiten, brainstormsessies en klantpresentaties.</p>

<h3>Gemeenschaps- en Expat Evenementen</h3>

<p>De locatie biedt ruimte voor studentenevenementen, expat bijeenkomsten, culturele uitwisselingen, alumnigroepen, maatschappelijke organisaties en lokale clubs.</p>

<h3>Wellness en Creatieve Activiteiten</h3>

<p>De evenementenruimte kan ook worden gebruikt voor yogasessies, meditatielessen, dansworkshops, kunstworkshops, kooklessen en wellnessevenementen.</p>

<h3>Lanceringen, Shoots en Merkevenementen</h3>

<p>Voor creatieve en commerciële doeleinden is de locatie beschikbaar voor productlanceringen, boekpresentaties, persevenementen, mediabijeenkomsten, foodfotografie, commerciële shoots, samenwerkingen met influencers, merkpromoties, interviews en creatie van sociale media content.</p>

<h3>Liefdadigheids- en Fondsenwervingsevenementen</h3>

<p>Chopras Indian Restaurant verwelkomt ook liefdadigheidsdiners, fondsenwervingsevenementen, bewustwordingscampagnes, gemeenschapsinitiatieven en bijeenkomsten zonder winstoogmerk.</p>

<p>De besloten zaal biedt een belangrijk voordeel voor evenementenorganisatoren: de locatie en catering worden via één boeking en één team geregeld. De zaal biedt ruimte aan ongeveer 25 tot 50 gasten en het restaurant geeft aan dat hun evenementencatering volledig halal is gecertificeerd.</p>

<h2>Gebieden Om Te Verkennen Rond Den Haag</h2>

<p>Den Haag is omringd door wijken en steden die handig zijn om op te nemen bij het plannen van een reisroute voor eten, sightseeing of evenementen.</p>

<h3>Belangrijke lokale gebieden zijn onder meer:</h3>

<h3>Scheveningen Strand, Boulevard & Pier</h3>

<h3>Madurodam</h3>

<h3>Den Haag Centrum / Binnenhof</h3>

<h3>Hotels in Centraal Den Haag & Scheveningen</h3>

<h3>Mauritshuis / Museumkwartier</h3>

<h3>Vredespaleis</h3>

<h3>Escher in Het Paleis / Lange Voorhout</h3>

<h3>Kunstmuseum Den Haag</h3>

<h3>Delft</h3>

<p>Deze locaties creëren nuttige zoekclusters rond termen zoals Indiaas restaurant Den Haag, Indiaas restaurant in de buurt, Indiaas eten Den Haag, Indiaas restaurant Rijswijk, Indiaas restaurant Delft, Indiaas restaurant Voorburg en Indiase catering Den Haag.</p>

<p>Voor bezoekers die in Zuid-Holland rondreizen, kan Chopras Indian Restaurant daarom werken als onderdeel van een bredere eetroute in plaats van alleen een bestemming voor mensen die in de buurt van Leyweg verblijven.</p>

<h2>Een Eenvoudige Eendaagse Reisroute in Den Haag</h2>

<p>Als u slechts één dag in de stad heeft, hoeft u niet alles te zien.</p>

<h3>Ochtend</h3>

<p>Begin in het Centrum van Den Haag en verken het historische gebied rond het Binnenhof.</p>

<h3>Laat in de Ochtend</h3>

<p>Wandel richting het Mauritshuis en verken het Museumkwartier.</p>

<h3>Middag</h3>

<p>Bezoek het Vredespaleis of Escher in Het Paleis en Lange Voorhout, afhankelijk van uw interesses.</p>

<h3>Eind van de Middag</h3>

<p>Ga richting Scheveningen Strand en Boulevard voor uitzicht op zee en een ontspannen wandeling.</p>

<h3>Avond</h3>

<p>Sluit de dag af met authentiek Indiaas eten bij Chopras Indian Restaurant.</p>

<p>Kies uit tandoori gerechten, Indiase curries, biryani, naan, vegetarische specialiteiten en desserts, naar uw eigen smaak.</p>

<p>Voor bezoekers die een groepsfeest plannen, kan de besloten feestzaal bij Chopras Indian Restaurant het diner ook veranderen in een complete privébijeenkomst.</p>

<h2>Veelgestelde Vragen</h2>

<div class="space-y-4 my-6">
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Wat zijn de beste plekken om te bezoeken in Den Haag?</h3>
    <p class="text-neutral-300 mb-0">Enkele van de meest populaire plekken zijn Scheveningen Strand, Madurodam, Binnenhof, Mauritshuis, Vredespaleis, Escher in Het Paleis, Lange Voorhout en Kunstmuseum Den Haag.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Wat is de beste plek om te bezoeken in Den Haag voor families?</h3>
    <p class="text-neutral-300 mb-0">Madurodam en Scheveningen zijn bijzonder geschikt voor families en bieden een combinatie van interactieve bezienswaardigheden en activiteiten aan zee.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Waar kan ik authentiek Indiaas eten krijgen in Den Haag?</h3>
    <p class="text-neutral-300 mb-0">Chopras Indian Restaurant aan de Leyweg biedt authentieke Indiase gerechten, waaronder tandoori gerechten, curries, biryani, Indiase broden en vegetarische opties.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Serveert Chopras Indian Restaurant halal eten?</h3>
    <p class="text-neutral-300 mb-0">Ja. Chopras Indian Restaurant geeft aan dat het eten volledig halal gecertificeerd is, inclusief de event catering.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Biedt Chopras Indian Restaurant vegetarisch en veganistisch eten aan?</h3>
    <p class="text-neutral-300 mb-0">Ja. Het menu bevat vegetarische en veganistische opties en het restaurant biedt ook speciale categorieën voor vegetarisch en veganistisch eten op de menukaart.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Biedt Chopras Indian Restaurant glutenvrij eten aan?</h3>
    <p class="text-neutral-300 mb-0">Ja. Er zijn glutenvrije opties beschikbaar. Gasten dienen hun wens voor glutenvrij duidelijk te vermelden bij de bestelling, omdat gerechten niet standaard glutenvrij worden bereid.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Kan ik een privé-evenement organiseren bij Chopras Indian Restaurant?</h3>
    <p class="text-neutral-300 mb-0">Ja. De privé evenementenzaal is geschikt voor ongeveer 25 tot 50 gasten en is ideaal voor bruiloften, verjaardagen, bedrijfsevenementen, culturele feesten en vele andere bijeenkomsten.</p>
  </div>
  <div class="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50">
    <h3 class="font-semibold text-amber-400 text-lg mb-2">Is Chopras Indian Restaurant geschikt voor bedrijfsevenementen?</h3>
    <p class="text-neutral-300 mb-0">Ja. De locatie verwelkomt bedrijfsdiners, zakelijke lunches, vergaderingen, netwerkevenementen, workshops, trainingssessies, teambuildingactiviteiten en klantpresentaties.</p>
  </div>
</div>

<h2>Laatste Gedachten</h2>

<p>Den Haag beloont bezoekers die zichzelf de tijd gunnen om verder te kijken dan één attractie. Van de sfeer aan zee in Scheveningen en de miniatuurwereld van Madurodam tot de geschiedenis van het Binnenhof, de kunst van het Mauritshuis en het Kunstmuseum Den Haag, de internationale betekenis van het Vredespaleis en de kenmerkende sfeer van het Lange Voorhout; er is iets voor vrijwel elk type reiziger.</p>

<p>Eten kan een net zo belangrijk onderdeel van de ervaring zijn.</p>

<p>Voor bezoekers die op zoek zijn naar authentiek Indiaas eten in Den Haag, biedt Chopras Indian Restaurant een uitgebreid menu met tandoori specialiteiten, biryani, curries, Indiase broden, vegetarische gerechten, veganistische opties en glutenvrije keuzes.</p>

<p>En als uw bezoek verbonden is aan een viering in plaats van sightseeing, biedt Chopras Indian Restaurant een privé evenementenzaal voor circa 25 tot 50 gasten, geschikt voor bruiloften, verjaardagen, jubilea, babyshowers, bedrijfsevenementen, culturele feesten, netwerken, workshops, lanceringen, liefdadigheidsevenementen en vele andere gelegenheden.</p>

<p>Dus of je nu een dag Den Haag gaat verkennen, Scheveningen bezoekt, een uitstapje naar Delft maakt, in de buurt van het centrum verblijft of een speciaal evenement plant, maak authentiek Indiaas eten een onderdeel van je route.</p>

<p>Bezoek Chopras Indian Restaurant aan de Leyweg 986, Den Haag, reserveer uw tafel, verken het menu en geniet van de smaak van India na het ontdekken van het beste van Den Haag.</p>
`"""

post_start = content.find("slug: 'best-indian-restaurant-in-den-haag'")

if post_start != -1:
    # 1. Replace faqsNl: [],
    faqsNl_match = re.search(r'faqsNl:\s*\[\],', content[post_start:])
    if faqsNl_match:
        idx = post_start + faqsNl_match.start()
        end_idx = post_start + faqsNl_match.end()
        content = content[:idx] + faqsNl_replacement + "," + content[end_idx:]
    
    # Update post_start after modification because indices changed
    post_start = content.find("slug: 'best-indian-restaurant-in-den-haag'")

    # 2. Replace contentNl
    contentNl_match = re.search(r'contentNl:\s*`.*?`', content[post_start:], flags=re.DOTALL)
    if contentNl_match:
        idx = post_start + contentNl_match.start()
        end_idx = post_start + contentNl_match.end()
        content = content[:idx] + contentNl_replacement + content[end_idx:]

    with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated successfully")
else:
    print("Post not found!")

