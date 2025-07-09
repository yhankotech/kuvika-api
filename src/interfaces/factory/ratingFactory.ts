import { RatingService } from "../../aplication/service/ratingService";
import { PrismaRatingRepository } from "../../infra/repositories/ratingRepository";
import { PrismaWorkerRepository } from "../../infra/repositories/workersRepository.prisma";

export function makeRatingService() {
  const repository = new PrismaRatingRepository();
  const repoWork = new PrismaWorkerRepository()
  return new RatingService(repository, repoWork);
}