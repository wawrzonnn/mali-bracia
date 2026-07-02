import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
	const email = process.env.ADMIN_EMAIL ?? 'admin@malibracia.local';
	const password = process.env.ADMIN_PASSWORD ?? 'zmien-to-haslo';
	const name = process.env.ADMIN_NAME ?? 'Administrator';

	const passwordHash = await bcrypt.hash(password, 12);

	const user = await prisma.user.upsert({
		where: { email },
		update: { passwordHash, name },
		create: { email, passwordHash, name, role: 'ADMIN' }
	});

	console.log(`Konto administratora gotowe: ${user.email}`);
	if (!process.env.ADMIN_PASSWORD) {
		console.log(`Hasło tymczasowe (zmień po pierwszym logowaniu): ${password}`);
	}
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
