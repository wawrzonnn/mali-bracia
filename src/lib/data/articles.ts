export interface Article {
	slug: string;
	title: string;
	summary: string;
	content: string;
	categorySlug: string;
	readingTimeMin: number;
	tags: string[];
}

export const articles: Article[] = [
	{
		slug: 'procesy-starzenia-sie',
		title: 'Jak przebiega starzenie się?',
		summary: 'Starzenie dotyczy wszystkich układów organizmu. Poznaj naturalne zmiany i naucz się je rozróżniać od objawów chorób.',
		categorySlug: 'zrozumiec-starosc',
		readingTimeMin: 6,
		tags: ['starzenie', 'zdrowie', 'procesy'],
		content: `<h2>Naturalny proces starzenia</h2>
<p>Starzenie się dotyczy wszystkich układów i narządów organizmu człowieka. Często trudno rozróżnić skutki naturalnego procesu starzenia się od wpływu chorób przewlekłych.</p>
<p>Na tzw. psychologiczny wymiar starości wpływają czynniki, które łączą się z historią i warunkami życia, doświadczeniami, a także przekazem społecznym i rodzinnym na temat starości. Mają one wpływ na myślenie, zachowanie, emocje i nastawienie do starości zarówno własnej jak i innych ludzi.</p>

<h2>Co się nie zmienia?</h2>
<p>W naturalnym procesie starzenia się <strong>nie następują zasadnicze zmiany</strong> w zdolności do logicznego myślenia, w zasobie wiedzy i słów, zdolności do wykonywania codziennych czynności.</p>

<h2>Co ulega osłabieniu?</h2>
<p>Natomiast osłabieniu ulega m.in.:</p>
<ul>
<li>Zdolność zapamiętywania i uczenia się</li>
<li>Koncentracja i podzielność uwagi</li>
<li>Koordynacja wzrokowo-ruchowa</li>
<li>Odporność na stres</li>
</ul>
<p>Wracanie do wspomnień, jeśli były pozytywne, może być sposobem na odzyskanie poczucia bezpieczeństwa i wartości. Charakter dominujących doświadczeń z przeszłości (pozytywne/bolesne) znacząco rzutuje na stosunek osoby starszej do bieżących wydarzeń.</p>

<h2>Osobowość w starości</h2>
<p>Osobowość osób starszych zasadniczo nie ulega zmianie, choć może dochodzić do nasilenia i wyostrzenia niektórych cech charakteru. Wyraźne zmiany w sferze osobowości są zazwyczaj wynikiem chorób neurodegeneracyjnych.</p>
<p>Typy osobowości w starości:</p>
<ul>
<li><strong>Zintegrowana</strong> — sprawność poznawcza, różne poziomy aktywności społecznej, poczucie satysfakcji z życia</li>
<li><strong>Obronna</strong> — potrzeba kontroli, ambicja, aktywność (obrona przed starzeniem się), dobre funkcjonowanie społeczne</li>
<li><strong>Pasywno-zależna</strong> — poszukiwanie opieki i wsparcia, satysfakcja życiowa średnia</li>
<li><strong>Niezintegrowana</strong> — zaburzenia funkcji poznawczych i kontroli emocji, mała aktywność społeczna</li>
</ul>

<h2>Potrzeby osób starszych</h2>
<p>Niektóre trudności w zaspokojeniu potrzeb:</p>
<ul>
<li><strong>Potrzeby fizjologiczne:</strong> zmniejszone pragnienie i apetyt, męczliwość, zaburzenia snu</li>
<li><strong>Potrzeby bezpieczeństwa:</strong> wielochorobowość, upadki, samotność</li>
<li><strong>Potrzeby przynależności:</strong> utraty bliskich, samotność</li>
<li><strong>Potrzeby szacunku:</strong> obniżone poczucie własnej wartości, ograniczona decyzyjność</li>
</ul>`
	},
	{
		slug: 'demencja-i-zaburzenia-pamieci',
		title: 'Demencja i zaburzenia pamięci',
		summary: 'Czym jest demencja, jakie są jej objawy i jak odróżnić naturalne zapominanie od niepokojących sygnałów.',
		categorySlug: 'zrozumiec-starosc',
		readingTimeMin: 7,
		tags: ['demencja', 'pamięć', 'alzheimer'],
		content: `<h2>Pamięć w starości</h2>
<p>W starości przeszłość staje się bliższa i wyraźniejsza niż teraźniejszość. Informacje zmagazynowane w pamięci długotrwałej zostały utrwalone i najdłużej pozostają dostępne. Pogorszeniu ulega pamięć krótkotrwała.</p>
<p>Trudności np. ze znalezieniem recepty, zegarka lub okularów, zapominanie nazwisk nowo poznanych osób nie powinny od razu budzić niepokoju. Tak zwane łagodne zaburzenia poznawcze mogą wpływać na codzienne funkcjonowanie w starszym wieku, lecz nie odpowiadają kryteriom chorób otępiennych.</p>

<h2>Czym jest demencja?</h2>
<p>Demencję, inaczej otępienie, najczęściej łączymy z utratą pamięci. Tymczasem <strong>demencja nie jest jedną konkretną chorobą</strong>, a raczej terminem określającym zespół symptomów wywołanych przez zaburzenia pracy mózgu, spowodowane urazem lub chorobą.</p>
<p>Najczęściej diagnozowana jest choroba Alzheimera lub otępienie naczyniopochodne. Powstaniu otępienia sprzyja zaawansowany wiek, ale <strong>nie wywołuje go sama starość</strong>.</p>

<h2>Niepokojące objawy</h2>
<ul>
<li>Utrata orientacji w czasie (mylenie godziny, daty, pory roku) i w przestrzeni</li>
<li>Gubienie wątku wypowiedzi</li>
<li>Trudności z gospodarowaniem budżetem domowym</li>
<li>Wielokrotne powtarzanie tych samych pytań lub czynności</li>
<li>Mylenie lub zapominanie nazw przedmiotów, imion bliskich</li>
<li>Odkładanie rzeczy w nietypowe miejsca</li>
<li>Wycofywanie się z codziennych aktywności</li>
<li>Zaniedbania higieniczne</li>
<li>Impulsywność, agresja lub apatia</li>
<li>Zmiana rytmu dobowego</li>
<li>Oskarżenia o kradzież, urojenia</li>
</ul>

<h2>Rodzaje otępienia</h2>
<ul>
<li><strong>Choroba Alzheimera</strong> — najczęstsza przyczyna demencji</li>
<li><strong>Otępienie naczyniopochodne</strong> — uszkodzenie mózgu zmianami naczyniowymi</li>
<li><strong>Otępienie czołowo-skroniowe</strong></li>
<li><strong>Otępienie z ciałami Lewy'ego</strong></li>
<li><strong>Choroba Parkinsona</strong> (późne etapy)</li>
</ul>
<p>Każda osoba z demencją zachowuje się w indywidualny sposób. W przypadku niepokojących objawów należy skonsultować się z lekarzem.</p>`
	},
	{
		slug: 'depresja-osob-starszych',
		title: 'Depresja osób starszych',
		summary: 'Depresja w starości jest często nierozpoznana. Poznaj objawy i dowiedz się, dlaczego smutek nie jest normalną częścią starzenia.',
		categorySlug: 'zrozumiec-starosc',
		readingTimeMin: 5,
		tags: ['depresja', 'zdrowie psychiczne', 'pomoc'],
		content: `<h2>Nierozpoznany problem</h2>
<p>Otoczenie i lekarze pierwszego kontaktu często interpretują objawy depresji u osób starszych jako skutek schorzeń somatycznych, postępującej demencji lub po prostu — starości. Chorzy sami rzadko szukają pomocy.</p>
<p><strong>Brak chęci do życia, smutek i apatia nie są stanem naturalnym, nawet w starości.</strong></p>

<h2>Objawy depresji</h2>
<ul>
<li>Niemożność odczuwania przyjemności i radości</li>
<li>Pesymizm i rezygnacja, płaczliwość</li>
<li>Brak energii, osłabienie, męczliwość</li>
<li>Trudności z podejmowaniem decyzji</li>
<li>Drażliwość i zniecierpliwienie</li>
<li>Zaburzenia pamięci i koncentracji uwagi</li>
<li>Zaburzenia snu — bezsenność</li>
<li>Utrata apetytu</li>
<li>Lęk, poczucie zagrożenia</li>
<li>Myśli rezygnacyjne i samobójcze</li>
</ul>
<p>Częstym objawem dominującym u osób starszych nie jest smutek czy przygnębienie, ale <strong>drażliwość i złość</strong>.</p>

<h2>Depresja maskowana</h2>
<p>Jest to rodzaj depresji, w którym objawy mogą sugerować inną dolegliwość — tzw. "maskę depresji". Możliwe maski:</p>
<ul>
<li>Bezsenność lub nadmierna senność</li>
<li>Przewlekły lub napadowy lęk</li>
<li>Zaburzenia przewodu pokarmowego</li>
<li>Różnorodne bóle, w tym wędrujące</li>
<li>Zespół niespokojnych nóg</li>
</ul>

<h2>Ważne</h2>
<p>Z depresją w wieku podeszłym łączy się największy odsetek samobójstw. <strong>Depresja jest chorobą, którą należy leczyć</strong> — lekarz psychiatra lub lekarz rodzinny mogą pomóc.</p>`
	},
	{
		slug: 'jak-rozmawiac-z-seniorem',
		title: 'Jak rozmawiać z osobą starszą?',
		summary: 'Praktyczne wskazówki: jak zacząć rozmowę, o czym rozmawiać, jak słuchać i budować zaufanie.',
		categorySlug: 'relacje',
		readingTimeMin: 5,
		tags: ['rozmowa', 'small talk', 'komunikacja'],
		content: `<h2>Zanim zaczniesz rozmowę</h2>
<p>Spotkanie z osobą starszą, zwłaszcza samotną, to dla niej często najważniejsze wydarzenie dnia. Pamiętaj, że Twoja obecność ma ogromną wartość — nawet jeśli rozmowa wydaje Ci się "zwykła".</p>

<h2>Jak zacząć?</h2>
<ul>
<li>Przedstaw się wyraźnie — podaj imię, uśmiechnij się</li>
<li>Zacznij od czegoś lekkiego: pogoda, co widać za oknem, co dzieje się w okolicy</li>
<li>Pytaj o wspomnienia — ludzie starsi chętnie opowiadają o przeszłości</li>
<li>Odnoś się do tego, co mówi rozmówca — pokaż, że słuchasz</li>
</ul>

<h2>Tematy do rozmowy</h2>
<ul>
<li>Wspomnienia z młodości, rodzina, podróże</li>
<li>Ulubione potrawy, przepisy, tradycje kulinarne</li>
<li>Hobby, zainteresowania (kwiaty, książki, muzyka)</li>
<li>Aktualne wydarzenia — ale unikaj tematów wywołujących stres</li>
<li>Codzienne sprawy — zakupy, sąsiedzi, pogoda</li>
</ul>

<h2>Jak słuchać?</h2>
<ul>
<li>Nie przerywaj, nie poganiaj</li>
<li>Utrzymuj kontakt wzrokowy</li>
<li>Mów wyraźnie, wolniej, ale <strong>nie infantylnie</strong></li>
<li>Powtórzenia to norma — reaguj cierpliwie</li>
<li>Jeśli osoba słabo słyszy — mów głośniej i wyraźniej, nie krzycz</li>
</ul>

<h2>Czego unikać?</h2>
<ul>
<li>Tematów dotyczących śmierci bliskich (chyba że senior sam porusza)</li>
<li>Pouczania i moralizowania</li>
<li>Bagatelizowania problemów ("to nic takiego")</li>
<li>Mówienia o seniorze w trzeciej osobie gdy jest obecny</li>
</ul>`
	},
	{
		slug: 'jak-nawiazac-przyjazn-z-seniorem',
		title: 'Jak nawiązać i utrzymać przyjacielską relację?',
		summary: 'Budowanie więzi z osobą starszą wymaga czasu i cierpliwości. Oto sprawdzone wskazówki od wolontariuszy MBU.',
		categorySlug: 'relacje',
		readingTimeMin: 6,
		tags: ['relacje', 'wolontariat', 'przyjaźń'],
		content: `<h2>Fundament relacji</h2>
<p>Relacja z osobą starszą opiera się na <strong>regularności, cierpliwości i szacunku</strong>. Nie chodzi o wielkie gesty, ale o stałą, przewidywalną obecność.</p>

<h2>Pierwsze spotkania</h2>
<ul>
<li>Bądź punktualny — to buduje zaufanie</li>
<li>Nie spiesz się, daj czas na oswojenie</li>
<li>Nie narzucaj swojego tempa</li>
<li>Akceptuj, że zbudowanie zaufania może zająć tygodnie</li>
</ul>

<h2>Budowanie więzi</h2>
<ul>
<li>Pamiętaj o drobiazgach — imiona wnuków, ulubiona herbata</li>
<li>Przynieś drobny upominek — kwiatek, ciastko, gazeta</li>
<li>Proponuj wspólne aktywności: spacer, gra w karty, czytanie</li>
<li>Dziel się swoim życiem — relacja powinna być dwustronna</li>
<li>Dotyk (jeśli akceptowany) — podanie ręki, dotknięcie ramienia</li>
</ul>

<h2>Trudne momenty</h2>
<ul>
<li>Senior może być drażliwy, smutny, zmienny — to normalne</li>
<li>Nie bierz odrzucenia personalnie</li>
<li>Jeśli widzisz niepokojące objawy — porozmawiaj z koordynatorem</li>
<li>Dbaj o siebie — wolontariat emocjonalny może być wyczerpujący</li>
</ul>

<h2>Mali Bracia Ubogich</h2>
<p>Stowarzyszenie koordynuje wolontariat towarzyszący — ponad 800 wolontariuszy z całej Polski regularnie odwiedza swoich podopiecznych. Jeśli chcesz zostać wolontariuszem, skontaktuj się z nami.</p>`
	},
	{
		slug: 'epidemia-osamotnienia',
		title: 'Epidemia osamotnienia w Polsce i na świecie',
		summary: '26% polskich 80-latków codziennie doświadcza samotności. To problem globalny o poważnych konsekwencjach.',
		categorySlug: 'samotnosc',
		readingTimeMin: 7,
		tags: ['samotność', 'statystyki', 'społeczeństwo'],
		content: `<h2>Skala problemu</h2>
<p>Na koniec 2024 roku liczba ludności wyniosła 37 489,1 tys. Jednocześnie liczba osób w wieku 60 lat i więcej wzrosła do blisko 10 milionów. Seniorzy stanowią już <strong>26,6% ogółu społeczeństwa</strong>.</p>
<p>Dziś już <strong>26% polskich osiemdziesięciolatków regularnie doświadcza samotności</strong>. Taki stan rzeczy ma poważne konsekwencje zdrowotne i społeczne.</p>

<h2>Osamotnienie to nie samotność</h2>
<p>Osamotnienie to brak więzi z ludźmi, nie brak samych osób. Można czuć się osamotniony w tłumie, wśród rodziny, w pracy. Do tej pory grupami bardziej narażonymi byli migranci, osoby z niepełnosprawnościami, bezrobotni. Dziś — przez atomizację społeczną, technologizację życia, kulturę nanosekundy — <strong>osamotnienie może dotknąć każdego</strong>.</p>

<h2>Globalna skala</h2>
<ul>
<li><strong>53% Polaków</strong> doświadcza poczucia samotności</li>
<li><strong>39% Polaków</strong> często czuje się opuszczonych</li>
<li>W Japonii 1,46 mln obywateli prowadzi tryb życia hikikomori — niemal całkowitą izolację społeczną</li>
<li>W UE od 36% do 40% osób powyżej 16 roku życia boryka się z alienacją</li>
<li>Problem dotyka coraz młodszych — 29% osób poniżej 24 lat wskazuje osamotnienie jako główny problem</li>
</ul>

<h2>Konsekwencje zdrowotne</h2>
<p>Osamotnienie wpływa na zdrowie równie silnie jak palenie 15 papierosów dziennie. Zwiększa ryzyko demencji, depresji, chorób serca i przedwczesnej śmierci.</p>

<h2>Co można zrobić?</h2>
<p>Kluczowe jest zwrócenie się ku integracji ludzi — budowanie więzi w społecznościach lokalnych, wolontariat towarzyszący, programy międzypokoleniowe. Organizacje takie jak Mali Bracia Ubogich od lat tworzą przestrzeń, w której seniorzy czują się szanowani i zauważeni.</p>`
	},
	{
		slug: 'gdzie-szukac-pomocy',
		title: 'Gdzie szukać pomocy dla seniora?',
		summary: 'Lista najważniejszych telefonów, organizacji i miejsc, gdzie senior lub jego bliski może uzyskać wsparcie.',
		categorySlug: 'wsparcie',
		readingTimeMin: 4,
		tags: ['pomoc', 'telefony', 'organizacje'],
		content: `<h2>Telefony zaufania</h2>
<ul>
<li><strong>Telefon Zaufania dla Osób Starszych (MBU):</strong> +48 608 018 110</li>
<li><strong>Telefon Zaufania dla Osób Dorosłych w Kryzysie Emocjonalnym:</strong> 116 123</li>
<li><strong>Telefon dla Seniorów (Rzecznik Praw Obywatelskich):</strong> 800 676 676</li>
<li><strong>Centrum Wsparcia:</strong> 800 70 2222</li>
</ul>

<h2>Organizacje wspierające seniorów</h2>
<ul>
<li><strong>Stowarzyszenie Mali Bracia Ubogich</strong> — wolontariat towarzyszący, spotkania, wsparcie telefoniczne. www.malibracia.org.pl</li>
<li><strong>Caritas Polska</strong> — pomoc materialna, opieka domowa</li>
<li><strong>Polski Czerwony Krzyż</strong> — pomoc w codziennych czynnościach</li>
<li><strong>Fundacja ITAKA</strong> — poszukiwanie osób zaginionych, także seniorów</li>
</ul>

<h2>Pomoc medyczna</h2>
<ul>
<li>Lekarz rodzinny — pierwszy kontakt w przypadku niepokojących objawów</li>
<li>Poradnia psychologiczna — bezpłatna w ramach NFZ</li>
<li>Pogotowie ratunkowe — 112 (w nagłych wypadkach)</li>
</ul>

<h2>Dla opiekunów</h2>
<p>Opieka nad osobą starszą jest wymagająca. Pamiętaj o sobie — wypalenie opiekuna to realny problem. Szukaj grup wsparcia, nie bój się prosić o pomoc.</p>`
	}
];

export function getArticleBySlug(slug: string): Article | undefined {
	return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
	return articles.filter((a) => a.categorySlug === categorySlug);
}
