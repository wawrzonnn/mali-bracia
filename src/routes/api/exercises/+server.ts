import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const typePrompts: Record<string, string> = {
	memory: 'ćwiczenia pamięci krótkotrwałej i długotrwałej (zapamiętywanie sekwencji, listy zakupów, dat, imion, obrazków)',
	words: 'ćwiczenia słowne (anagramy, uzupełnianie przysłów, synonimy, antonimy, łańcuchy słów, rymowanki)',
	logic: 'zagadki logiczne i matematyczne (proste równania, sudoku słowne, sekwencje liczbowe, łamigłówki)',
	associations: 'ćwiczenia skojarzeniowe (łączenie kategorii, co nie pasuje, skojarzenia, dopasowywanie par)',
	attention: 'ćwiczenia koncentracji uwagi (szukanie różnic w opisach, wykreślanie powtarzających się słów, szukanie wzorców)',
	everyday: 'ćwiczenia z codziennego życia (planowanie dnia, lista zakupów z pamięci, odtwarzanie przepisu, opis drogi)'
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { type } = await request.json();
		const exerciseDesc = typePrompts[type] ?? typePrompts.memory;

		const response = await openai.chat.completions.create({
			model: 'gpt-5.2',
			messages: [
				{
					role: 'system',
					content: `Jesteś ekspertem od ćwiczeń kognitywnych dla seniorów. Generujesz ćwiczenia do wydruku w formacie HTML.
Zasady:
- ZAWSZE po polsku
- 5-6 ćwiczeń w zestawie
- Każde ćwiczenie ma tytuł (h2), instrukcję i zadanie
- Ćwiczenia powinny być proste, czytelne, z dużym fontem
- Na końcu dodaj sekcję "Odpowiedzi" z rozwiązaniami
- Używaj tagów HTML: h1, h2, p, ol, ul, li, strong
- Nie używaj tagów style ani script`
				},
				{
					role: 'user',
					content: `Wygeneruj zestaw ćwiczeń do wydruku: ${exerciseDesc}. Tytuł zestawu: "Ćwiczenia dla umysłu". Dodaj na górze krótką zachętę.`
				}
			],
			max_completion_tokens: 1500,
			temperature: 0.8
		});

		const exercises = response.choices[0]?.message?.content?.trim() ?? '';
		return json({ exercises });
	} catch (e) {
		console.error('Exercises API error:', e);
		return json({ exercises: '<p>Przepraszam, nie udało się wygenerować ćwiczeń. Spróbuj ponownie.</p>' }, { status: 500 });
	}
};
