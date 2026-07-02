import { prisma } from '$lib/server/db';

export const SESSION_COOKIE = 'session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 dni

function generateSessionId(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(24));
	return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function createSession(userId: string) {
	const id = generateSessionId();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
	await prisma.session.create({ data: { id, userId, expiresAt } });
	return { id, expiresAt };
}

export async function validateSession(sessionId: string) {
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { user: true }
	});

	if (!session) return null;

	if (session.expiresAt < new Date()) {
		await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
		return null;
	}

	return {
		user: {
			id: session.user.id,
			email: session.user.email,
			name: session.user.name,
			role: session.user.role
		}
	};
}

export async function invalidateSession(sessionId: string) {
	await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
}
