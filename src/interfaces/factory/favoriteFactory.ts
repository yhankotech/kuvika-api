import { PrismaFavoriteRepository } from '../../infra/repositories/favoriteRepository';
import { PrismaWorkerRepository } from '../../infra/repositories/workersRepository.prisma';
import { PrismaClientRepository } from '../../infra/repositories/clientRepository.prisma';
import { FavoriteService } from '../../aplication/service/favoriteService';

export function makeService() {
  const repoFavorite = new PrismaFavoriteRepository();
  const repoClient = new PrismaClientRepository();
  const repoWork = new PrismaWorkerRepository();
  return new FavoriteService(repoFavorite, repoClient, repoWork);
}