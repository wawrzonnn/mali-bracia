import { json, error } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/db';
import { createSession, SESSION_COOKIE } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = (await request.json()) as { email?: string; password?: string };

	if (!email?.trim() || !password) {
		throw error(400, 'Podaj e-mail i hasło.');
	}

	const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
	const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

	if (!user || !validPassword) {
		throw error(401, 'Nieprawidłowy e-mail lub hasło.');
	}

	const session = await createSession(user.id);

	cookies.set(SESSION_COOKIE, session.id, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		expires: session.expiresAt
	});

	return json({ success: true });
};
