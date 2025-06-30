// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'warn', 'error'],
});

// Conecta ao iniciar
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('🟢 Conectado ao banco de dados com sucesso.');
  } catch (error) {
    console.error('🔴 Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

// Desconecta ao encerrar o processo
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🛑 Conexão com o banco encerrada.');
  process.exit(0);
});

export { prisma, connectToDatabase };