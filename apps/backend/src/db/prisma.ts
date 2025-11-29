import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
=======
=======
>>>>>>> Stashed changes
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

// Graceful shutdown
process.on('beforeExit', async () => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  await prisma.$disconnect();
=======
    await prisma.$disconnect();
>>>>>>> Stashed changes
=======
    await prisma.$disconnect();
>>>>>>> Stashed changes
});

export default prisma;
