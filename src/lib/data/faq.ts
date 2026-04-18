export interface FaqItem {
	question: string;
	answer: string;
	categorySlug: string;
}

export const faqItems: FaqItem[] = [
	{
		question: 'Czym jest demencja i jak ją rozpoznać?',
		answer: 'Demencja to zespół objawów wywołanych zaburzeniami pracy mózgu — nie jest jedną chorobą. Najczęstsza przyczyna to choroba Alzheimera. Niepokojące objawy to: utrata orientacji w czasie i przestrzeni, wielokrotne powtarzanie pytań, trudności z codziennymi czynnościami, zaniedbania higieniczne. Ważne: naturalne zapominanie (np. gdzie położyłem klucze) to jeszcze nie demencja.',
		categorySlug: 'zrozumiec-starosc'
	},
	{
		question: 'Czy smutek i apatia to normalna część starzenia się?',
		answer: 'Nie. Brak chęci do życia, smutek i apatia nie są stanem naturalnym, nawet w starości. Mogą być objawami depresji, która u seniorów często jest nierozpoznana. Jeśli zauważasz takie objawy u bliskiej osoby, warto skonsultować się z lekarzem rodzinnym lub psychiatrą.',
		categorySlug: 'zrozumiec-starosc'
	},
	{
		question: 'Jak zacząć rozmowę z osobą starszą, której nie znam?',
		answer: 'Przedstaw się wyraźnie, uśmiechnij się. Zacznij od lekkiego tematu: pogoda, co widać za oknem, okolica. Pytaj o wspomnienia — seniorzy chętnie opowiadają o przeszłości. Słuchaj cierpliwie, nie przerywaj, nie poganiaj. Mów wyraźnie i wolniej, ale nie infantylnie.',
		categorySlug: 'relacje'
	},
	{
		question: 'Osoba starsza ciągle powtarza te same historie. Co robić?',
		answer: 'To naturalne zjawisko związane z osłabieniem pamięci krótkotrwałej. Reaguj cierpliwie, nie zwracaj uwagi na powtórzenia. Dla seniora każde opowiadanie może być ważnym sposobem na utrzymanie kontaktu i poczucia własnej wartości.',
		categorySlug: 'relacje'
	},
	{
		question: 'Jak mogę pomóc samotnemu seniorowi w mojej okolicy?',
		answer: 'Możesz zostać wolontariuszem towarzyszącym w Stowarzyszeniu Mali Bracia Ubogich — regularne wizyty, rozmowy telefoniczne, wspólne spacery. Nawet proste gesty — powiedzenie "dzień dobry" sąsiadowi seniorowi, zaproponowanie pomocy z zakupami — mogą mieć ogromne znaczenie.',
		categorySlug: 'samotnosc'
	},
	{
		question: 'Czy samotność naprawdę wpływa na zdrowie?',
		answer: 'Tak. Badania pokazują, że chroniczne osamotnienie wpływa na zdrowie równie silnie jak palenie 15 papierosów dziennie. Zwiększa ryzyko demencji o 50%, depresji, chorób serca i przedwczesnej śmierci.',
		categorySlug: 'samotnosc'
	},
	{
		question: 'Gdzie mogę zadzwonić jeśli martwię się o stan seniora?',
		answer: 'Telefon Zaufania dla Osób Starszych (MBU): +48 608 018 110. Telefon dla Seniorów (RPO): 800 676 676. W nagłych wypadkach: 112. Możesz też skontaktować się ze Stowarzyszeniem Mali Bracia Ubogich: www.malibracia.org.pl',
		categorySlug: 'wsparcie'
	},
	{
		question: 'Jestem opiekunem osoby starszej i czuję się wyczerpany/a. Gdzie szukać pomocy?',
		answer: 'Wypalenie opiekuna to realny problem. Szukaj grup wsparcia dla opiekunów, nie bój się prosić o pomoc. Telefon Zaufania dla Osób w Kryzysie: 116 123. Rozważ też kontakt z lokalnymi ośrodkami pomocy społecznej, które mogą zapewnić wsparcie domowe.',
		categorySlug: 'wsparcie'
	},
	{
		question: 'Jakie ćwiczenia pomagają utrzymać sprawność umysłową seniora?',
		answer: 'Krzyżówki, łamigłówki, gry karciane, czytanie, wspólne wspominanie. Na naszej stronie w zakładce "Ćwiczenia" znajdziesz materiały do pobrania i interaktywne gry pamięciowe. Ważna jest regularność — nawet 15 minut dziennie robi różnicę.',
		categorySlug: 'zrozumiec-starosc'
	},
	{
		question: 'Czym zajmuje się Stowarzyszenie Mali Bracia Ubogich?',
		answer: 'Mali Bracia Ubogich to stowarzyszenie działające na rzecz samotnych seniorów. Koordynuje wolontariat towarzyszący — ponad 800 wolontariuszy regularnie odwiedza podopiecznych. Organizuje spotkania, wycieczki, wydarzenia świąteczne. Prowadzi Telefon Zaufania dla Osób Starszych.',
		categorySlug: 'wsparcie'
	}
];
