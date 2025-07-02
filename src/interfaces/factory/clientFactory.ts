import { PrismaClientRepository } from '../../infra/repositories/clientRepository.prisma';
import { ClientService } from '../../aplication/service/clientService';

export function makeClientService() {
  const repo = new PrismaClientRepository();
  return new ClientService(repo);
}