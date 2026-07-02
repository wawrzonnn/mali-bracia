import { json } from '@sveltejs/kit';
import { invalidateSession, SESSION_COOKIE } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get(SESSION_COOKIE);
	if (sessionId) {
		await invalidateSession(sessionId);
		cookies.delete(SESSION_COOKIE, { path: '/' });
	}
	return json({ success: true });
};
