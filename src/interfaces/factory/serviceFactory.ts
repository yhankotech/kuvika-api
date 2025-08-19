import { PrismaServiceRequestRepository } from '@/infra/repositories/serviceRepository';
import { PrismaWorkerRepository } from '@/infra/repositories/workersRepository.prisma';
import { PrismaClientRepository } from '@/infra/repositories/clientRepository.prisma';
import { ServiceRequestUseCase } from '@/service/serviceRequestService';

export function makeService() {
  const repoService = new PrismaServiceRequestRepository();
  const repoClient = new PrismaClientRepository();
  const repoWork = new PrismaWorkerRepository();
  return new ServiceRequestUseCase(repoService, repoClient, repoWork);
}