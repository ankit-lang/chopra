import re

with open('src/lib/blog-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """
    contentNl: `
<img src="/images/blog/19sep.png" alt="Chopras Indian Restaurant Uitgelicht in The Times of India: Waar Gastvrijheid Verder Gaat Dan Het Eten" class="w-full max-h-[480px] object-cover rounded-2xl mb-8" />

<p>Bij Chopras Indian Restaurant in Den Haag, Nederland, hebben we altijd geloofd dat een geweldige eetervaring om meer draait dan wat er op het bord wordt geserveerd. Het gaat om de mensen, de gesprekken, de bekende gezichten en het gevoel echt welkom te zijn.</p>

<p>We zijn verheugd te kunnen delen dat Chopras Indian Restaurant in Den Haag is genoemd in een recente blog gepubliceerd door The Times of India, getiteld "Robots kunnen mijn eten serveren. Maar wie luistert er?"</p>

<p>Het artikel onderzoekt een steeds relevantere vraag voor de horeca: als restaurants meer technologie, automatisering en kunstmatige intelligentie toepassen, wat gebeurt er dan met de menselijke connectie die altijd centraal heeft gestaan in gastvrijheid?</p>

<p>Voor Chopras Indian Restaurant, Den Haag, is dit een gesprek dat diep resoneert met wat we elke dag proberen te creëren.</p>

<h2>Gastvrijheid Gaat Om Mensen</h2>

<p>Technologie kan veel onderdelen van een restaurantervaring sneller en handiger maken. Digitaal bestellen, online reserveren en geautomatiseerde systemen kunnen het zeker gemakkelijker maken voor zowel restaurants als gasten.</p>

<p>Maar gastvrijheid gaat ook over iets dat niet altijd door technologie kan worden gemeten.</p>

<p>Het is de glimlach wanneer een vaste gast de deur binnenstapt.</p>

<p>Het is het onthouden van het favoriete gerecht van een gast.</p>

<p>Het is iemand helpen bij het kiezen van het menu.</p>

<p>Het is opmerken wanneer een familie iets speciaals viert.</p>

<p>Het is de tijd nemen voor een gesprek.</p>

<p>Deze kleine interacties zijn vaak wat een restaurantbezoek tot een onvergetelijke ervaring maakt.</p>

<p>De blog in The Times of India reflecteert op deze menselijke kant van dineren en bevat ervaringen van restaurants, waaronder Chopra's Indian Restaurant in Nederland, als onderdeel van het bredere gesprek over hoe technologie de gastvrijheid verandert.</p>

<h2>Meer Dan Alleen Een Indiaas Restaurant in Den Haag, Nederland.</h2>

<p>Bij Chopras Indian Restaurant is ons doel altijd geweest om een ervaring te creëren waar gasten zich op hun gemak, welkom en verbonden voelen.</p>

<p>Of iemand ons nu bezoekt voor een alledaags diner, zijn of haar familie meebrengt, een verjaardag viert, vrienden ontmoet of een speciaal evenement organiseert, we willen dat de ervaring persoonlijk aanvoelt.</p>

<p>Ons eten is een belangrijk onderdeel van die ervaring. Van traditionele Indiase curries en dal makhani tot tandoori gerechten, biryanis, vegetarische opties en Indiaas streetfood, we willen de smaken en warmte van de Indiase keuken naar Den Haag brengen.</p>

<p>Maar eten is slechts één onderdeel van gastvrijheid.</p>

<p>Het andere deel is hoe je mensen laat voelen.</p>

<h2>Kan Technologie Menselijke Gastvrijheid Vervangen?</h2>

<p>We geloven niet dat technologie en gastvrijheid tegenpolen hoeven te zijn.</p>

<p>Technologie kan restaurants helpen bij het verbeteren van gemak, communicatie en efficiëntie. Maar het menselijke element blijft essentieel.</p>

<p>Een digitaal systeem kan een bestelling onthouden.</p>

<p>Een persoon kan een gast onthouden.</p>

<p>Een machine kan eten bezorgen.</p>

<p>Een lid van het horecateam kan opmerken dat een gast iets nodig heeft voordat deze erom vraagt.</p>

<p>Dat verschil vormt de kern van het gesprek dat wordt verkend door The Times of India.</p>

<h2>Een Gesprek Waar We Graag Deel Van Uit Maken</h2>

<p>We zijn dankbaar dat we in The Times of India worden genoemd als onderdeel van dit bredere gesprek over de toekomst van restaurants en gastvrijheid.</p>

<p>Voor ons gaat de toekomst niet over het kiezen tussen technologie en mensen.</p>

<p>Het gaat erom technologie te gebruiken waar het helpt, terwijl we gastvrijheid menselijk blijven houden.</p>

<p>Want uiteindelijk onthouden mensen misschien wat ze gegeten hebben, maar ze onthouden ook hoe een plek ze liet voelen.</p>

<p>Een oprechte dank aan Dr. Pallavi Bansal en The Times of India voor het vermelden van Chopras Indian Restaurant, Den Haag, Nederland, in zo'n doordachte blog over technologie, gastvrijheid en het belang van menselijke connectie.</p>

<p>We waarderen de kans om deel uit te maken van deze discussie ten zeerste.</p>

<div class="mt-8 text-center">
  <a href="https://timesofindia.indiatimes.com/toi-blogs/digital-life/robots-can-serve-my-food-but-who-will-listen/articleshow/134316958.cms" target="_blank" rel="noopener noreferrer" class="inline-block bg-[#06068a] !text-white font-semibold py-3 px-8 rounded-full hover:bg-[#0000B3] transition-colors">
    Lees Meer op The Times of India
  </a>
</div>
`,
"""

fields = """
    titleNl: 'Chopras Indian Restaurant Uitgelicht in The Times of India: Waar Gastvrijheid Verder Gaat Dan Het Eten',
    metaTitleNl: 'Chopras Indian Restaurant Uitgelicht in The Times of India',
    metaDescriptionNl: 'Chopras Indian Restaurant in Den Haag werd onlangs genoemd in een blog gepubliceerd door The Times of India. Lees meer over onze benadering van gastvrijheid en technologie.',
    h1Nl: 'Chopras Indian Restaurant Uitgelicht in The Times of India: Waar Gastvrijheid Verder Gaat Dan Het Eten',
    primaryKeywordNl: 'Chopras Indian Restaurant The Times of India',
    excerptNl: 'Chopras Indian Restaurant in Den Haag is onlangs genoemd in een blog gepubliceerd door The Times of India over gastvrijheid en technologie.',
"""

post_start = content.find("slug: 'chopras-indian-restaurant-featured-in-times-of-india'")

lang_index = content.find("language: 'en',", post_start)
content = content[:lang_index] + fields + content[lang_index:]

# For this post, faqsNl is empty `faqsNl: [],`, which is fine, we don't need to change it.

match = re.search(r'content:\s*`.*?`', content[post_start:], flags=re.DOTALL)
if match:
    content_end = post_start + match.end()
    content = content[:content_end] + ',\n' + replacement + content[content_end:]

with open('src/lib/blog-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
