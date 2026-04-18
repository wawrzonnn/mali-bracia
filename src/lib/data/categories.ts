export type IconName =
	| 'home' | 'search' | 'book' | 'heart' | 'phone' | 'message'
	| 'users' | 'brain' | 'shield' | 'arrow-right' | 'chevron-right'
	| 'chevron-down' | 'sparkle' | 'clock' | 'send' | 'x'
	| 'help-circle' | 'map-pin' | 'external' | 'puzzle' | 'menu';

export interface Category {
	slug: string;
	name: string;
	description: string;
	icon: IconName;
	color: string;
}

export const categories: Category[] = [
	{
		slug: 'zrozumiec-starosc',
		name: 'Zrozumieć starość',
		description: 'Procesy starzenia się, zmiany psychologiczne, potrzeby seniorów, demencja i depresja.',
		icon: 'brain',
		color: '#169FDB'
	},
	{
		slug: 'relacje',
		name: 'Relacje z seniorem',
		description: 'Jak budować więź, prowadzić rozmowę, nawiązać i utrzymać przyjacielską relację.',
		icon: 'heart',
		color: '#1FA138'
	},
	{
		slug: 'samotnosc',
		name: 'Samotność',
		description: 'Epidemia osamotnienia, jej przyczyny, skutki zdrowotne i społeczne, jak przeciwdziałać.',
		icon: 'users',
		color: '#F5A623'
	},
	{
		slug: 'wsparcie',
		name: 'Wsparcie i pomoc',
		description: 'Gdzie szukać pomocy, telefony zaufania, organizacje wspierające seniorów i opiekunów.',
		icon: 'shield',
		color: '#E74C3C'
	}
];

export function getCategoryBySlug(slug: string): Category | undefined {
	return categories.find((c) => c.slug === slug);
}
