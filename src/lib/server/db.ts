import { PrismaClient } from '../../../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';

declare global {
	// eslint-disable-next-line no-var
	var __prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({ connectionString: DATABASE_URL });

export const prisma = globalThis.__prisma ?? new PrismaClient({ adapter });

if (import.meta.env?.DEV) {
	globalThis.__prisma = prisma;
}
