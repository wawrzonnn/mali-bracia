import { json, error } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

const PATH_MAP = {
	wolontariat: 'WOLONTARIAT',
	wsparcie: 'WSPARCIE',
	pytanie: 'PYTANIE'
} as const;

const SUPPORT_MAP = {
	jednorazowe: 'JEDNORAZOWE',
	cykliczne: 'CYKLICZNE'
} as const;

type Payload = {
	path: keyof typeof PATH_MAP;
	name: string;
	email: string;
	phone?: string | null;
	city?: string | null;
	availability?: string;
	motivation?: string | null;
	supportType?: keyof typeof SUPPORT_MAP;
	message?: string;
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as Partial<Payload>;

	if (!body.path || !PATH_MAP[body.path]) throw error(400, 'Nieprawidłowa ścieżka zgłoszenia.');
	if (!body.name?.trim()) throw error(400, 'Imię i nazwisko jest wymagane.');
	if (!body.email?.trim() || !/^\S+@\S+\.\S+$/.test(body.email)) throw error(400, 'Nieprawidłowy adres e-mail.');

	const joinRequest = await prisma.joinRequest.create({
		data: {
			path: PATH_MAP[body.path],
			name: body.name.trim(),
			email: body.email.trim(),
			phone: body.phone?.trim() || null,
			city: body.city?.trim() || null,
			availability: body.availability ?? null,
			motivation: body.motivation?.trim() || null,
			supportType: body.supportType ? SUPPORT_MAP[body.supportType] : null,
			message: body.message?.trim() || null
		}
	});

	return json({ success: true, id: joinRequest.id });
};
