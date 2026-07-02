import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function chatWithAssistant(
	messages: Array<{ role: 'user' | 'assistant'; content: string }>,
	knowledgeContext: string
): Promise<string> {
	const systemPrompt = `Jesteś empatycznym asystentem Stowarzyszenia Mali Bracia Ubogich -- organizacji pomagającej samotnym seniorom w Polsce.

Odpowiadasz na pytania o:
- Procesy starzenia się (fizyczne, psychologiczne)
- Samotność seniorów i jej konsekwencje
- Jak budować relacje międzypokoleniowe
- Jak komunikować się z osobami starszymi
- Gdzie szukać wsparcia (telefony zaufania, organizacje)
- Demencja, depresja osób starszych
- Ćwiczenia pamięci i aktywności dla seniorów

Zasady:
- Odpowiadaj ZAWSZE po polsku
- Bądź ciepły, empatyczny, ale merytoryczny
- Powołuj się na materiały i wiedzę MBU gdy to możliwe
- Nie diagnozuj medycznie -- sugeruj konsultację z lekarzem
- Odpowiedzi powinny być zwięzłe (max 3-4 akapity)

BAZA WIEDZY MBU:
${knowledgeContext}`;

	const response = await openai.chat.completions.create({
		model: 'gpt-5.2',
		messages: [
			{ role: 'system', content: systemPrompt },
			...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
		],
		max_completion_tokens: 600,
		temperature: 0.7
	});

	return response.choices[0]?.message?.content?.trim() ?? 'Przepraszam, nie udało się wygenerować odpowiedzi.';
}
