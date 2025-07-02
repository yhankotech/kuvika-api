// src/http/factories/makeCreateWorker.ts
import { PrismaWorkerRepository } from '../../infra/repositories/workersRepository.prisma';
import { WorkerService } from '../../aplication/service/workerService';

export function makeWorker() {
  const repo = new PrismaWorkerRepository();
  const service = new WorkerService(repo);
  return service;
}