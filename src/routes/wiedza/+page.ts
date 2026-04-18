import { articles } from '$lib/data/articles';
import { categories, getCategoryBySlug } from '$lib/data/categories';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const categorySlug = url.searchParams.get('kategoria');
	const filtered = categorySlug
		? articles.filter((a) => a.categorySlug === categorySlug)
		: articles;
	const activeCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;
	return { articles: filtered, categories, activeCategory };
};
