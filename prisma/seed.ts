import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { logger } from '@/shared/logs/winston';

const prisma = new PrismaClient();

function generateAngolanPhone() {
  return `+244 ${faker.helpers.replaceSymbols('9## ### ###')}`;
}

async function main() {
  // Criação de Clients
  const clients = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.client.create({
        data: {
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phone: generateAngolanPhone(),
          location: faker.location.city(),
          avatar: faker.image.avatar(),
        },
      })
    )
  );

  // Criação de Workers
  const workers = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.worker.create({
        data: {
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: generateAngolanPhone(),
          serviceTypes: faker.helpers.arrayElements(
            ['Eletricista', 'Canalizador', 'Jardineiro', 'Pintor', 'Marceneiro'],
            2
          ),
          location: faker.location.city(),
          avatar: faker.image.avatar(),
          price: parseFloat(faker.commerce.price({ min: 20, max: 100 })),
          availability: faker.helpers.arrayElement(['Manhã', 'Tarde', 'Noite']),
        },
      })
    )
  );

  // Criação de ServiceRequests
  const serviceRequests = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.serviceRequest.create({
        data: {
          clientId: faker.helpers.arrayElement(clients).id,
          workerId: faker.helpers.arrayElement(workers).id,
          serviceDate: faker.date.future(),
          description: faker.lorem.sentence(),
          status: faker.helpers.arrayElement(['pendente', 'em andamento', 'concluído']),
        },
      })
    )
  );

  // Criação de Ratings
  await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.rating.create({
        data: {
          clientId: faker.helpers.arrayElement(clients).id,
          workerId: faker.helpers.arrayElement(workers).id,
          serviceRequestId: faker.helpers.arrayElement(serviceRequests).id,
          score: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
        },
      })
    )
  );

  // Criação de Favorites (cada client com 1 favorito aleatório)
  await Promise.all(
    clients.map((client) =>
      prisma.favorite.create({
        data: {
          clientId: client.id,
          workerId: faker.helpers.arrayElement(workers).id,
        },
      })
    )
  );

  // Criação de Mensagens
  await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const client = faker.helpers.arrayElement(clients);
      const worker = faker.helpers.arrayElement(workers);
      const isFromClient = faker.datatype.boolean();

      return prisma.message.create({
        data: {
          content: faker.lorem.sentence(),
          senderId: isFromClient ? client.id : worker.id,
          recipientId: isFromClient ? worker.id : client.id,
          isFromClient,
        },
      });
    })
  );

  logger.info('✅ Seed realizado com sucesso!');
}

main()
  .catch((e) => {
    logger.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
