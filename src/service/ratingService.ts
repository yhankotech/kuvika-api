import { RatingRepository} from "@/domain/repositories/ratingRepository";
import { Rating } from "@/domain/entities/rating";
import { AppError } from "@/shared/errors/error";
import { RatingDTO } from "@/http/dtos/ratingDto";
import { WorkerRepository } from "@/domain/repositories/workRepository";
import {  sendRatingEmail } from "@/adapter/email/sendServiceEmail";

export class RatingService {
  constructor(
      private readonly ratingRepository: RatingRepository,
      private workerRepository: WorkerRepository,
    ) {}

  async create(data: RatingDTO): Promise<Rating> {
    const worker = await this.workerRepository.getById(data.workerId);

    if (!worker) {
      throw new AppError("Trabalhador não encontrado !", 404);
    }

    sendRatingEmail(worker.email, worker.fullName, 'Cliente');

    return this.ratingRepository.create({
      ...data,
    });
  }

  async getWorkerRatings(workerId: string): Promise<Rating[]> {
    const ratings = await this.ratingRepository.findByWorkerId(workerId);

    if (ratings.length === 0) {
      throw new AppError("Não tem avaliações !");
    }

    return ratings;
  }

  async getAverageRatingByWorker(workerId: string) {
    const worker = await this.workerRepository.getById(workerId);

    if (!worker) {
      throw new AppError("Trabalhador não encontrado !", 404);
    }

    const averageRating = await this.ratingRepository.getAverageRatingByWorker(workerId);

    return {
      ...worker,
      averageRating,
    };
  }

}