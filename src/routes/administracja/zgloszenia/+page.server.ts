import { prisma } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const requests = await prisma.joinRequest.findMany({
		orderBy: { createdAt: 'desc' }
	});

	return {
		requests: requests.map((r) => ({ ...r, createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString() }))
	};
};

export const actions: Actions = {
	updateStatus: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');
		const status = form.get('status');

		if (typeof id !== 'string' || typeof status !== 'string') return { success: false };
		if (!['NOWE', 'W_TOKU', 'ZAMKNIETE'].includes(status)) return { success: false };

		await prisma.joinRequest.update({
			where: { id },
			data: { status: status as 'NOWE' | 'W_TOKU' | 'ZAMKNIETE' }
		});

		return { success: true };
	}
};
