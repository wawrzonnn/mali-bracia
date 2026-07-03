import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [total, nowe] = await Promise.all([
		prisma.joinRequest.count(),
		prisma.joinRequest.count({ where: { status: 'NOWE' } })
	]);

	return { requestsTotal: total, requestsNowe: nowe };
};
