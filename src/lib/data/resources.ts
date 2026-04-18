export interface Resource {
	title: string;
	description: string;
	phone?: string;
	url?: string;
	type: 'helpline' | 'organization' | 'guide';
	isNational: boolean;
}

export const resources: Resource[] = [
	{
		title: 'Telefon Zaufania dla Osób Starszych',
		description: 'Prowadzony przez Stowarzyszenie Mali Bracia Ubogich. Rozmowa z psychologiem dla seniorów doświadczających samotności.',
		phone: '+48 608 018 110',
		url: 'https://www.malibracia.org.pl',
		type: 'helpline',
		isNational: true
	},
	{
		title: 'Telefon Zaufania dla Dorosłych w Kryzysie',
		description: 'Całodobowy telefon wsparcia emocjonalnego prowadzony przez Instytut Psychologii Zdrowia.',
		phone: '116 123',
		type: 'helpline',
		isNational: true
	},
	{
		title: 'Telefon dla Seniorów i Opiekunów',
		description: 'Linia Rzecznika Praw Obywatelskich. Porady prawne i informacja o dostępnym wsparciu.',
		phone: '800 676 676',
		type: 'helpline',
		isNational: true
	},
	{
		title: 'Centrum Wsparcia',
		description: 'Telefon wsparcia psychologicznego. Bezpłatny, czynny całodobowo.',
		phone: '800 70 2222',
		type: 'helpline',
		isNational: true
	},
	{
		title: 'Stowarzyszenie Mali Bracia Ubogich',
		description: 'Wolontariat towarzyszący, spotkania, wycieczki, wsparcie telefoniczne dla samotnych seniorów. Ponad 800 wolontariuszy w całej Polsce.',
		phone: '+48 22 635 10 26',
		url: 'https://www.malibracia.org.pl',
		type: 'organization',
		isNational: true
	},
	{
		title: 'Caritas Polska',
		description: 'Pomoc materialna, opieka domowa, ośrodki dziennego pobytu dla seniorów.',
		url: 'https://caritas.pl',
		type: 'organization',
		isNational: true
	},
	{
		title: 'Polski Czerwony Krzyż',
		description: 'Pomoc w codziennych czynnościach, transport medyczny, wolontariat na rzecz osób starszych.',
		url: 'https://pck.pl',
		type: 'organization',
		isNational: true
	},
	{
		title: 'Przewodnik pracy z seniorem',
		description: 'Kompleksowy poradnik dla wolontariuszy i opiekunów pracujących z osobami starszymi.',
		url: '/materialy/przewodnik-pracy-z-seniorem.pdf',
		type: 'guide',
		isNational: true
	},
	{
		title: 'Spotkania ze starszymi',
		description: 'Materiały MBU na temat organizacji spotkań z osobami starszymi.',
		url: '/materialy/mbU-Spotkania-ze-starszymi-2021.pdf',
		type: 'guide',
		isNational: true
	},
	{
		title: 'Wstępy do small-talków',
		description: 'Zbiór pomysłów na rozpoczęcie rozmowy z seniorem. Gotowe tematy i pytania.',
		url: '/materialy/Wstepy-do-small-talkow.pdf',
		type: 'guide',
		isNational: true
	}
];
