import { categories } from '$lib/data/categories';
import { articles } from '$lib/data/articles';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const recentArticles = articles.slice(0, 4);
	return { categories, recentArticles };
};
