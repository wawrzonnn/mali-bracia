import { getArticleBySlug } from '$lib/data/articles';
import { getCategoryBySlug } from '$lib/data/categories';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = getArticleBySlug(params.slug);
	if (!article) throw error(404, 'Artykuł nie znaleziony');
	const category = getCategoryBySlug(article.categorySlug);
	return { article, category };
};
