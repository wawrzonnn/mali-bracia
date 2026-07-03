/* Dane mockowe do prezentacji panelu administracyjnego. Nie są pobierane
   z bazy danych — to wizualny placeholder pod przyszłe, prawdziwe CMS. */

export interface AdminArticleMeta {
	slug: string;
	status: 'Opublikowany' | 'Szkic';
	updatedAt: string;
}

// Statusy nałożone na realne artykuły z articles.ts, żeby lista wyglądała
// prawdziwie (część "szkiców" jest wymyślona na potrzeby demo).
export const articleMeta: Record<string, AdminArticleMeta> = {
	'procesy-starzenia-sie': { slug: 'procesy-starzenia-sie', status: 'Opublikowany', updatedAt: '2026-05-12' },
	'demencja-i-zaburzenia-pamieci': { slug: 'demencja-i-zaburzenia-pamieci', status: 'Opublikowany', updatedAt: '2026-05-12' },
	'depresja-osob-starszych': { slug: 'depresja-osob-starszych', status: 'Opublikowany', updatedAt: '2026-04-28' },
	'jak-rozmawiac-z-seniorem': { slug: 'jak-rozmawiac-z-seniorem', status: 'Opublikowany', updatedAt: '2026-04-28' },
	'jak-nawiazac-przyjazn-z-seniorem': { slug: 'jak-nawiazac-przyjazn-z-seniorem', status: 'Szkic', updatedAt: '2026-06-30' },
	'epidemia-osamotnienia': { slug: 'epidemia-osamotnienia', status: 'Opublikowany', updatedAt: '2026-03-15' },
	'gdzie-szukac-pomocy': { slug: 'gdzie-szukac-pomocy', status: 'Opublikowany', updatedAt: '2026-03-15' }
};

export interface AdminMaterial {
	id: string;
	title: string;
	description: string;
	url: string;
	sizeKb: number;
	uploadedAt: string;
	category: 'Ćwiczenia' | 'Wsparcie' | 'Wolontariat';
}

export const adminMaterials: AdminMaterial[] = [
	{
		id: 'mat-1',
		title: 'Ćwiczenia usprawniające pamięć',
		description: 'Zestaw ćwiczeń do samodzielnego wykonania w domu.',
		url: '/materialy/CWICZENIA_USPRAWNIAJACE_PAMIEC.pdf',
		sizeKb: 842,
		uploadedAt: '2026-02-10',
		category: 'Ćwiczenia'
	},
	{
		id: 'mat-2',
		title: 'Ćwiczenia pamięci',
		description: 'Dodatkowy zestaw ćwiczeń pamięciowych.',
		url: '/materialy/C_WICZENIA_PAMIE_CI.pdf',
		sizeKb: 611,
		uploadedAt: '2026-02-10',
		category: 'Ćwiczenia'
	},
	{
		id: 'mat-3',
		title: 'Łamigłówki i zagadki',
		description: 'Zagadki do wspólnego rozwiązywania przez telefon.',
		url: '/materialy/_amig_o_wki_i_zagadki_dla_senioro_w_przez_telefon_na_str_www.pdf',
		sizeKb: 398,
		uploadedAt: '2026-01-22',
		category: 'Ćwiczenia'
	},
	{
		id: 'mat-4',
		title: 'Spotkania ze starszymi',
		description: 'Materiały do prowadzenia spotkań z osobami starszymi.',
		url: '/materialy/mbU-Spotkania-ze-starszymi-2021.pdf',
		sizeKb: 1240,
		uploadedAt: '2025-11-05',
		category: 'Wolontariat'
	},
	{
		id: 'mat-5',
		title: 'Wstępy do small-talków',
		description: 'Gotowe pomysły na rozpoczęcie rozmowy z seniorem.',
		url: '/materialy/Wstepy-do-small-talkow.pdf',
		sizeKb: 275,
		uploadedAt: '2025-11-05',
		category: 'Wolontariat'
	},
	{
		id: 'mat-6',
		title: 'Przewodnik pracy z seniorem',
		description: 'Kompleksowy poradnik dla wolontariuszy i opiekunów.',
		url: '/materialy/przewodnik-pracy-z-seniorem.pdf',
		sizeKb: 980,
		uploadedAt: '2025-10-18',
		category: 'Wsparcie'
	}
];

export interface AdminUser {
	id: string;
	name: string;
	email: string;
	role: 'Administrator' | 'Redaktor' | 'Moderator';
	lastLogin: string;
	isYou?: boolean;
}

export const adminUsersMock: AdminUser[] = [
	{
		id: 'u-2',
		name: 'Kasia Wolska',
		email: 'k.wolska@malibracia.org.pl',
		role: 'Redaktor',
		lastLogin: '2026-07-02T14:12:00'
	},
	{
		id: 'u-3',
		name: 'Tomasz Nowicki',
		email: 't.nowicki@malibracia.org.pl',
		role: 'Moderator',
		lastLogin: '2026-06-29T09:40:00'
	},
	{
		id: 'u-4',
		name: 'Ola Zielińska',
		email: 'o.zielinska@malibracia.org.pl',
		role: 'Redaktor',
		lastLogin: '2026-06-21T18:05:00'
	}
];

export const activityFeed = [
	{ id: 1, text: 'Kasia Wolska opublikowała artykuł „Depresja osób starszych"', time: '2026-07-02T14:12:00' },
	{ id: 2, text: 'Nowe zgłoszenie z formularza „Dołącz do nas"', time: '2026-07-02T11:03:00' },
	{ id: 3, text: 'Tomasz Nowicki dodał materiał „Przewodnik pracy z seniorem"', time: '2026-06-29T09:40:00' },
	{ id: 4, text: 'Ola Zielińska zapisała szkic „Jak nawiązać i utrzymać przyjacielską relację?"', time: '2026-06-30T16:22:00' },
	{ id: 5, text: 'Zmieniono status zgłoszenia na „W toku"', time: '2026-06-28T10:15:00' }
];

export function initials(name: string): string {
	return name
		.split(' ')
		.map((p) => p.charAt(0))
		.slice(0, 2)
		.join('')
		.toUpperCase();
}
