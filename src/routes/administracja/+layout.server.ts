import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const isLoginPage = url.pathname === '/administracja/login';

	if (!locals.user && !isLoginPage) {
		throw redirect(303, '/administracja/login');
	}

	if (locals.user && isLoginPage) {
		throw redirect(303, '/administracja');
	}

	return { user: locals.user };
};
