import { getArticleBySlug } from '$lib/data/articles';
import { articleMeta } from '$lib/data/adminMock';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = getArticleBySlug(params.slug);
	if (!article) throw error(404, 'Artykuł nie znaleziony');
	const meta = articleMeta[article.slug];
	return { article, status: meta?.status ?? 'Opublikowany' };
};
