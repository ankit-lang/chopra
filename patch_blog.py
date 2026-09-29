import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to insert the Nl translations for the first blog post.
# We can find the 'content: `...`' of the first post and append the Nl fields right after it.

replacement = """
    contentNl: `
<img src="/images/blog/27sep.png" alt="Indiaas Restaurant Nabij Zeeheldenkwartier en Duinoord" class="w-full max-h-[480px] object-cover rounded-2xl mb-8" />

<p>Op zoek naar een Indiaas restaurant in de buurt van het Zeeheldenkwartier of Duinoord in Den Haag? Chopras Indian Restaurant aan de Leyweg 986 biedt Indiaas streetfood, tandoori gerechten, biryani, vegetarische en veganistische keuzes, halal eten en glutenvrije opties. Als u de Piet Heinstraat, Prins Hendrikstraat, Thomsonlaan, Thomsonplein of Frederik Hendriklaan verkent, legt deze gids uit wat u bij Chopras Indian restaurant kunt vinden en waar u op moet letten bij het kiezen van een Indiaas restaurant in de omgeving.</p>

<p><strong>Kort antwoord:</strong> Chopras Indian Restaurant aan de Leyweg 986 in Den Haag biedt Indiaas streetfood, tandoori gerechten, biryani, vegetarische en veganistische keuzes, halal eten en glutenvrije opties. Het restaurant biedt ook een evenementenruimte voor ongeveer 25 - 50 gasten en Indiase catering voor grotere gelegenheden.</p>

<h2>Waarom Kiezen Voor Chopras Indian Restaurant in Den Haag?</h2>

<p>Chopras Indian Restaurant biedt een uitgebreid menu dat is ontworpen voor verschillende smaken en eetgelegenheden. Gasten kunnen kiezen uit Indiaas streetfood, tandoori specialiteiten, curries, biryani, vegetarische gerechten en andere traditionele Indiase favorieten. De variëteit maakt Indiaas eten ook geschikt voor families, vrienden en groepen met verschillende dieetvoorkeuren.</p>

<p>Zo kan de ene gast kiezen voor tandoori kip, een ander voor paneer, terwijl weer iemand anders een vegetarisch, veganistisch of passend glutenvrij gerecht kan selecteren. Deze reeks maakt het voor groepen makkelijker om gerechten te delen of individuele maaltijden te kiezen.</p>

<p>Een goede Indiase maaltijd kan verschillende texturen en smaken bevatten—van knapperige streetfood voorgerechten tot rokerige tandoori gerechten, geurige biryani, vers bereid naan en traditionele Indiase desserts.</p>

<h2>Indiaas Eten Nabij Zeeheldenkwartier, Duinoord en Omgeving</h2>

<p>Bij het zoeken naar Indiaas eten in de buurt van het Zeeheldenkwartier of Duinoord, kunnen gasten rekening houden met menuvariatie, dieetwensen, eetstijl en of het restaurant geschikt is voor gezinnen of groepen. Chopras Indian Restaurant aan de Leyweg 986 biedt een breed Indiaas menu voor deze verschillende eetgelegenheden.</p>

<p>De omliggende gebieden omvatten verschillende bekende straten en buurten:</p>

<ul>
    <li>Piet Heinstraat</li>
    <li>Prins Hendrikstraat</li>
    <li>Duinoord</li>
    <li>Thomsonlaan</li>
    <li>Thomsonplein</li>
    <li>Frederik Hendriklaan</li>
</ul>

<p>Als u deze buurten verkent en op zoek bent naar Indiaas eten in Den Haag, biedt Chopras Indian Restaurant een menu gebouwd rond Indiaas streetfood, tandoori gerechten, curries, biryani, vegetarische specialiteiten en andere traditionele gerechten.</p>

<h2>Wat Kunt U Eten Bij Chopras Indian Restaurant?</h2>

<p>De Indiase keuken brengt verschillende kruiden, ingrediënten en kooktechnieken samen, dus gerechten kunnen heel verschillende smaken bieden. Bij Chopras Indian Restaurant omvat het menu Indiaas streetfood, tandoori gerechten, vegetarische specialiteiten, kip-, lams- en schapenvleesgerechten, biryani, rijst, Indiase broden en desserts.</p>

<p>Het menu bij Chopras Indian Restaurant omvat Indiaas streetfood, tandoori gerechten, vegetarische specialiteiten, kip-, lams- en schapenvleesgerechten, biryani, rijst, Indiase broden en desserts.</p>

<p>Tandoori gerechten worden traditioneel bereid in een kleioven, wat een kenmerkende rokerige en geroosterde smaak creëert. Biryani combineert geurige rijst met gekruide ingrediënten en biedt een andere stijl van Indiaas dineren.</p>

<h2>Indiaas Eten Nabij Piet Heinstraat en Prins Hendrikstraat</h2>

<p>Als u in de buurt van de Piet Heinstraat of Prins Hendrikstraat bent en op zoek bent naar Indiaas eten, kan Indiaas streetfood een goede manier zijn om een maaltijd bij Chopras Indian Restaurant te beginnen.</p>

<p>Populaire Indiase voorgerechten zijn:</p>

<ul>
    <li>Pani Puri</li>
    <li>Dahi Puri</li>
    <li>Samosa Chaat</li>
    <li>Papdi Chaat</li>
    <li>Aloo Tikki</li>
    <li>Chicken Tikka</li>
    <li>Paneer Tikka</li>
</ul>

<p>U kunt dan verdergaan met een hoofdgerecht zoals Butter Chicken, Dal Makhani, Paneer Butter Masala, Chicken Biryani of Mutton Rogan Josh.</p>

<p>Verschillende gerechten delen is ook een goede manier om verschillende Indiase smaken aan één tafel te ervaren.</p>

<h2>Vegetarisch, Veganistisch en Glutenvrij Indiaas Eten</h2>

<h3>Vegetarisch Indiaas Eten</h3>
<p>Vegetarische gasten kunnen genieten van gerechten zoals:</p>
<ul>
    <li>Dal Makhani</li>
    <li>Dal Tadka</li>
    <li>Chana Masala</li>
    <li>Aloo Gobi</li>
    <li>Palak Paneer</li>
    <li>Paneer Butter Masala</li>
    <li>Bhindi Masala</li>
    <li>Shahi Paneer</li>
</ul>
<p>Deze gerechten combineren groenten, linzen, paneer en Indiase kruiden om vullende en smaakvolle maaltijden te creëren.</p>

<h3>Veganistisch Indiaas Eten</h3>
<p>De Indiase keuken biedt ook van nature veganvriendelijke gerechten. Afhankelijk van de bereiding kunnen opties zijn: Chana Masala, Dal Tadka, Aloo Gobi, Bhindi Masala en gemengde groentegerechten.</p>
<p>Als u een strikt veganistisch dieet volgt, bevestig dan altijd de ingrediënten en de bereidingswijze bij het restaurant voordat u bestelt.</p>

<h3>Glutenvrij Indiaas Eten</h3>
<p>Voor mensen die op zoek zijn naar glutenvrij Indiaas eten in Den Haag, kan de Indiase keuken verschillende geschikte keuzes bieden.</p>
<p>Op rijst gebaseerde gerechten zoals biryani en veel linzen-, groente- en vleesbereidingen kunnen van nature glutenvrij zijn. Gerechten zoals Dal Tadka, Chana Masala, Aloo Gobi en sommige tandoori opties kunnen ook geschikt zijn, afhankelijk van ingrediënten en bereiding.</p>
<p>Gluten kunnen echter aanwezig zijn in broden zoals naan en in bepaalde sauzen of bereide ingrediënten. Als u coeliakie of een ernstige glutenallergie heeft, vertel dit het restaurant dan duidelijk voordat u bestelt en vraag naar kruisbesmetting en bereiding.</p>

<h2>Indiaas Eten Nabij Thomsonlaan en Thomsonplein</h2>

<p>Voor gasten rond de Thomsonlaan en het Thomsonplein kan het kiezen van een Indiaas restaurant gaan over het vinden van een menu dat voor iedereen werkt. Bij Chopras Indian Restaurant kunnen gasten vegetarische gerechten combineren met tandoori specialiteiten, rijst, broden en andere Indiase gerechten.</p>

<p>Een gedeelde Indiase maaltijd maakt verschillende voorkeuren aan dezelfde tafel mogelijk. Voor een eerste bezoek aan Chopras Indian Restaurant, kunt u Pani Puri of Samosa Chaat als voorgerecht proberen, gevolgd door Chicken Tikka of Paneer Tikka en een hoofdgerecht zoals Butter Chicken, Dal Makhani of biryani.</p>

<p>Voor een eerste bezoek, kunt u Pani Puri of Samosa Chaat als voorgerecht proberen, gevolgd door Chicken Tikka of Paneer Tikka. Voeg een hoofdgerecht zoals Butter Chicken, Dal Makhani of een biryani toe, afhankelijk van uw voorkeur.</p>

<h2>Indiaas Restaurant Nabij Frederik Hendriklaan</h2>

<p>Als u op zoek bent naar Indiaas eten in de buurt van de Frederik Hendriklaan, overweeg dan het soort eetervaring dat u wilt, zoals Indiaas streetfood, een familiediner, vegetarisch eten, halal opties, glutenvrije keuzes of een maaltijd voor een groep.</p>

<p>Bent u op zoek naar Indiaas streetfood, een familiediner, vegetarisch eten, halal opties, glutenvrije keuzes of een maaltijd voor een groep?</p>

<p>Chopras Indian Restaurant biedt een uitgebreid Indiaas menu, waardoor gasten gerechten kunnen kiezen op basis van individuele smaken en dieetvoorkeuren.</p>

<h2>Wat Moet U Proberen Bij Chopras Indian Restaurant?</h2>

<p>Als u Chopras Indian Restaurant voor de eerste keer bezoekt, kunt u een uitgebalanceerde Indiase maaltijd samenstellen door gerechten te kiezen uit verschillende delen van het menu.</p>

<ul>
    <li><strong>Voor voorgerechten:</strong> Probeer Pani Puri, Dahi Puri, Samosa Chaat of Papdi Chaat.</li>
    <li><strong>Voor tandoori:</strong> Chicken Tikka, Tandoori Chicken of Paneer Tikka, Malai Soya Chaap zijn populaire keuzes.</li>
    <li><strong>Voor vegetarische gasten (hoofdgerecht):</strong> Dal Makhani, Dal Tadka, Rajma Masala, Palak Paneer of Chana Masala zijn opties om te ontdekken.</li>
    <li><strong>Voor de niet-vegetarische gasten (hoofdgerecht):</strong> Butter Chicken, Chicken Biryani, Mutton Rogan Josh bieden verschillende Indiase smaken.</li>
    <li><strong>Voor broden:</strong> Garlic Naan, Tandoori Roti, Cheese Naan, Keema Naan, Aloo Paratha of andere Indiase broden kunnen de maaltijd aanvullen.</li>
</ul>

<p>Als u op zoek bent naar glutenvrij eten, vraag het restaurantteam dan welke gerechten en bereidingswijzen geschikt zijn voor uw dieetwensen.</p>

<h2>Is Chopras Indian Restaurant Halal?</h2>

<p>Ja. Chopras Indian Restaurant stelt dat de keuken en vleesleveranciers volledig halal gecertificeerd zijn.</p>

<p>Dit maakt het een optie voor gasten die op zoek zijn naar een halal Indiaas restaurant in Den Haag. Het restaurant biedt ook vegetarische, veganistische en glutenvrije keuzes.</p>

<p>Voor allergieën of strikte dieetwensen is het raadzaam om uw wensen met het restaurant te bespreken voordat u bestelt.</p>

<h2>Indiaas Restaurant voor Families, Groepen en Privé Evenementen</h2>

<p>Chopras Indian restaurant kan ook geschikt zijn voor groepsdiners, omdat gasten verschillende gerechten kunnen kiezen en ze aan tafel kunnen delen. Het restaurant kan geschikt zijn voor familiediners, verjaardagsvieringen, vriendenbijeenkomsten, bedrijfsmaaltijden, culturele feesten en privé evenementen.</p>

<p>De Indiase keuken kan geschikt zijn voor:</p>
<ul>
    <li>Familiediners</li>
    <li>Verjaardagsvieringen</li>
    <li>Babyshowers</li>
    <li>Vriendenbijeenkomsten</li>
    <li>Bedrijfsdiners</li>
    <li>Culturele feesten</li>
    <li>Privé evenementen</li>
</ul>

<p>Chopras Indian Restaurant biedt ook een evenementenruimte voor ongeveer 25–50 gasten, samen met Indiase catering voor grotere gelegenheden.</p>

<h2>Bezoek Chopras Indian Restaurant in Den Haag</h2>

<p>Als u op zoek bent naar Indiaas eten in de buurt van het Zeeheldenkwartier, Duinoord, Thomsonlaan, Thomsonplein of Frederik Hendriklaan, biedt Chopras Indian Restaurant een gevarieerd menu met Indiaas streetfood, tandoori gerechten, biryani, vegetarische en veganistische maaltijden, halal eten en glutenvrije keuzes.</p>

<p>Of u nu rond de Piet Heinstraat, Prins Hendrikstraat, Duinoord, Thomsonlaan, Thomsonplein of Frederik Hendriklaan bent, u kunt het menu van Chopras Indian Restaurant verkennen voor Indiase gerechten geschikt voor individuele gasten, families en groepen.</p>

<p>Met zijn selectie van Indiaas streetfood, tandoori gerechten, biryani, vegetarische en veganistische maaltijden, halal eten en glutenvrije opties, biedt Chopras Indian Restaurant in Den Haag een gevarieerd menu voor individuele gasten, families en groepen.</p>

<p>Plant u uw volgende Indiase maaltijd in Den Haag? Verken het menu van Chopras Indian Restaurant, kies gerechten om te delen en neem contact op met het restaurant als u geïnteresseerd bent in dineren, groepsmaaltijden of privé evenementen.</p>
`,
"""

fields = """
    titleNl: 'Indiaas Restaurant Nabij Zeeheldenkwartier en Duinoord',
    metaTitleNl: 'Indiaas Restaurant Nabij Zeeheldenkwartier en Duinoord | Chopras',
    metaDescriptionNl: 'Op zoek naar Indiaas eten nabij Zeeheldenkwartier of Duinoord? Bezoek Chopras Indian Restaurant voor authentieke curries, tandoori gerechten en meer.',
    h1Nl: 'Indiaas Restaurant Nabij Zeeheldenkwartier en Duinoord: Een Lokale Gids',
    primaryKeywordNl: 'Beste Indiaas restaurant Zeeheldenkwartier',
    excerptNl: 'Op zoek naar een Indiaas restaurant in de buurt van het Zeeheldenkwartier of Duinoord in Den Haag? Chopras Indian Restaurant aan de Leyweg 986 biedt Indiaas streetfood, tandoori gerechten, biryani, vegetarische en veganistische keuzes, halal eten en glutenvrije opties.',
"""

# Find the end of content `...` for the first post
# The first post has slug: 'indian-restaurant-near-zeeheldenkwartier-and-duinoord'
post1_start = content.find("slug: 'indian-restaurant-near-zeeheldenkwartier-and-duinoord'")

# we want to insert 'fields' before 'language: 'en' as const,'
lang_index = content.find("language: 'en' as const,", post1_start)
content = content[:lang_index] + fields + content[lang_index:]

# For faqsNl, it is currently `faqsNl: [],`. Let's replace it.
faqsNl_replacement = """faqsNl: [
      {
        question: 'Wat is het beste Indiase restaurant in de buurt van het Zeeheldenkwartier?',
        answer: 'Als u op zoek bent naar Indiaas eten in de buurt van het Zeeheldenkwartier, biedt Chopras Indian Restaurant aan de Leyweg 986 in Den Haag Indiaas streetfood, tandoori gerechten, biryani, vegetarische en veganistische keuzes, halal eten en glutenvrije opties. Chopras Indian Restaurant is een Indiase eetgelegenheid in Den Haag die tandoori gerechten, Indiaas streetfood, biryani en vegetarische keuzes aanbiedt.'
      },
      {
        question: 'Waar kan ik Indiaas eten vinden in de buurt van Duinoord?',
        answer: 'Chopras Indian Restaurant aan de Leyweg 986 biedt een uitgebreid Indiaas menu met traditionele gerechten, tandoori specialiteiten, biryani en vegetarische opties voor gasten die op zoek zijn naar Indiaas eten in Den Haag. Er zijn overal in Den Haag Indiase eetgelegenheden. Chopras Indian Restaurant aan de Leyweg 986 biedt een uitgebreid Indiaas menu met traditionele gerechten, tandoori specialiteiten, biryani en vegetarische opties.'
      },
      {
        question: 'Is er glutenvrij Indiaas eten in Den Haag?',
        answer: 'Ja. De Indiase keuken omvat verschillende gerechten die van nature glutenvrij kunnen zijn, met name rijst, linzen, groenten en sommige tandoori-bereidingen. Bij Chopras Indian Restaurant dienen gasten met coeliakie of ernstige glutenallergieën ingrediënten, bereidingswijzen en mogelijke kruisbesmetting voor het bestellen te bevestigen.'
      },
      {
        question: 'Biedt Chopras Indian Restaurant vegetarisch eten?',
        answer: 'Ja. Het menu bevat een verscheidenheid aan vegetarische gerechten zoals Dal Makhani, Dal Tadka, Chana Masala, Aloo Gobi, Palak Paneer en Paneer Butter Masala.'
      },
      {
        question: 'Kan ik een evenement organiseren bij Chopras Indian Restaurant?',
        answer: 'Ja. Chopras Indian Restaurant biedt een evenementenruimte voor ongeveer 25 – 50 gasten met Indiase catering, waardoor het geschikt is voor verjaardagen, familiebijeenkomsten, bedrijfsevenementen en andere feesten.'
      }
    ],"""
content = content.replace("faqsNl: [],", faqsNl_replacement, 1) # Only the first occurrence

# We want to insert 'contentNl' after 'content: `...`,' for the first post.
# To do this safely, we can find the end of the content for the first post.
import re
match = re.search(r'content:\s*`.*?`', content[post1_start:], flags=re.DOTALL)
if match:
    content_end = post1_start + match.end()
    content = content[:content_end] + ',\n' + replacement + content[content_end:]

with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
