import { json } from '@sveltejs/kit';
import { chatWithAssistant } from '$lib/server/openai';
import { articles } from '$lib/data/articles';
import { faqItems } from '$lib/data/faq';
import type { RequestHandler } from './$types';

function buildKnowledgeContext(userMessage: string): string {
	const lower = userMessage.toLowerCase();

	const relevantArticles = articles.filter((a) => {
		const searchText = `${a.title} ${a.summary} ${a.tags.join(' ')}`.toLowerCase();
		return lower.split(/\s+/).some((word) => word.length > 3 && searchText.includes(word));
	});

	const relevantFaq = faqItems.filter((f) => {
		const searchText = `${f.question} ${f.answer}`.toLowerCase();
		return lower.split(/\s+/).some((word) => word.length > 3 && searchText.includes(word));
	});

	let context = '';

	if (relevantArticles.length > 0) {
		context += 'ARTYKUŁY:\n';
		for (const a of relevantArticles.slice(0, 3)) {
			context += `--- ${a.title} ---\n${a.content.replace(/<[^>]+>/g, '')}\n\n`;
		}
	}

	if (relevantFaq.length > 0) {
		context += 'FAQ:\n';
		for (const f of relevantFaq.slice(0, 3)) {
			context += `P: ${f.question}\nO: ${f.answer}\n\n`;
		}
	}

	if (!context) {
		context = articles
			.slice(0, 2)
			.map((a) => `${a.title}: ${a.summary}`)
			.join('\n');
	}

	return context;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const messages: Array<{ role: 'user' | 'assistant'; content: string }> = body.messages ?? [];

		if (!messages.length) {
			return json({ reply: 'Proszę zadaj mi pytanie.' }, { status: 400 });
		}

		const lastUserMsg = messages.filter((m) => m.role === 'user').pop();
		const knowledgeContext = buildKnowledgeContext(lastUserMsg?.content ?? '');

		const reply = await chatWithAssistant(messages, knowledgeContext);
		return json({ reply });
	} catch (e) {
		console.error('Chat API error:', e);
		return json({ reply: 'Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.' }, { status: 500 });
	}
};
