import { PrismaWorkerRepository } from '@/infra/repositories/workersRepository.prisma';
import { WorkerService } from '@/service/workerService';
import { PrismaRatingRepository } from "@/infra/repositories/ratingRepository";

export function makeWorker() {
  const repo = new PrismaWorkerRepository();
  const repoRating = new PrismaRatingRepository();

  const service = new WorkerService(repo, repoRating);
  return service;
}