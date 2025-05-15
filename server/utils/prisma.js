import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @ts-ignore
if (process.env.NODE_ENV === 'production') global.prismadb = prisma;

export default prisma;
